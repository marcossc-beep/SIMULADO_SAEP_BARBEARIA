// =====================================================================
// SAEP 2026 - SIMULADO BARBEARIA - API (Node + Fastify + PostgreSQL 17)
// Rodar: npm install  ->  npm start
// =====================================================================

import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'

const servidor = Fastify()

// ### CORS: libera o front (HTML) para chamar a API
servidor.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ### JWT: o token é a "sessão" do usuário e EXPIRA em 30 minutos
servidor.register(jwt, {
    secret: 'saep_barbearia_2026',
    sign: { expiresIn: '30m' }
})

// ### Conexão com o banco (ajuste usuário/senha/porta da sua máquina)
const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'saep_db'
})

// ### Middleware: só deixa passar quem tem token válido e não expirado
async function autenticar(request, reply) {
    try {
        await request.jwtVerify()
    } catch (erro) {
        return reply.status(401).send({ message: 'Sessão expirada ou inválida. Faça login novamente.' })
    }
}

// =====================================================================
// LOGIN
// =====================================================================

servidor.post('/login', async (request, reply) => {
    const body = request.body

    if (!body || !body.email || !body.senha) {
        return reply.status(400).send({ message: 'E-mail e senha são obrigatórios!' })
    }

    const resultado = await sql.query('SELECT * FROM usuario WHERE email = $1', [body.email])

    if (resultado.rows.length === 0) {
        return reply.status(401).send({ message: 'Usuário ou senha inválidos!' })
    }

    const usuario = resultado.rows[0]
    const senhaValida = await bcrypt.compare(body.senha, usuario.senha)

    if (!senhaValida) {
        return reply.status(401).send({ message: 'Usuário ou senha inválidos!' })
    }

    const token = servidor.jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email })

    // exp vem em segundos dentro do token, o front usa em milissegundos
    const expira = servidor.jwt.decode(token).exp * 1000

    return reply.status(200).send({
        message: 'Login realizado com sucesso!',
        token: token,
        expira: expira,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    })
})

// =====================================================================
// BARBEIRO (listar, buscar, cadastrar, editar, excluir)
// =====================================================================

// GET /barbeiros            -> lista todos
// GET /barbeiros?busca=raf  -> lista só os que combinam com o termo
servidor.get('/barbeiros', { preHandler: autenticar }, async (request, reply) => {
    const busca = request.query.busca

    if (busca) {
        const resultado = await sql.query(
            'SELECT id, nome, email, telefone FROM barbeiro WHERE nome ILIKE $1 OR email ILIKE $1 ORDER BY id',
            [`%${busca}%`]
        )
        return resultado.rows
    }

    const resultado = await sql.query('SELECT id, nome, email, telefone FROM barbeiro ORDER BY id')
    return resultado.rows
})

servidor.post('/barbeiros', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body

    if (!body || !body.nome || !body.email || !body.cpf || !body.senha) {
        return reply.status(400).send({ message: 'Nome, e-mail, CPF e senha são obrigatórios!' })
    }

    // LGPD: CPF e senha são salvos criptografados (hash bcrypt)
    const cpfHash = await bcrypt.hash(body.cpf, 10)
    const senhaHash = await bcrypt.hash(body.senha, 10)

    await sql.query(
        'INSERT INTO barbeiro (nome, email, cpf, senha, telefone) VALUES ($1, $2, $3, $4, $5)',
        [body.nome, body.email, cpfHash, senhaHash, body.telefone]
    )

    return reply.status(201).send({ message: 'Barbeiro cadastrado!' })
})

servidor.put('/barbeiros/:id', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.nome || !body.email) {
        return reply.status(400).send({ message: 'Nome e e-mail são obrigatórios!' })
    }

    const barbeiro = await sql.query('SELECT * FROM barbeiro WHERE id = $1', [id])
    if (barbeiro.rows.length === 0) {
        return reply.status(404).send({ message: 'Barbeiro não existe!' })
    }

    await sql.query(
        'UPDATE barbeiro SET nome = $1, email = $2, telefone = $3 WHERE id = $4',
        [body.nome, body.email, body.telefone, id]
    )

    // CPF e senha só mudam se forem enviados (e continuam criptografados)
    if (body.cpf) {
        const cpfHash = await bcrypt.hash(body.cpf, 10)
        await sql.query('UPDATE barbeiro SET cpf = $1 WHERE id = $2', [cpfHash, id])
    }
    if (body.senha) {
        const senhaHash = await bcrypt.hash(body.senha, 10)
        await sql.query('UPDATE barbeiro SET senha = $1 WHERE id = $2', [senhaHash, id])
    }

    return reply.status(200).send({ message: `Barbeiro ${body.nome} alterado!` })
})

servidor.delete('/barbeiros/:id', { preHandler: autenticar }, async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM barbeiro WHERE id = $1', [id])
    return reply.status(200).send({ message: 'Barbeiro excluído!' })
})

// =====================================================================
// CLIENTE (cadastrar associando a um barbeiro)
// =====================================================================

servidor.get('/clientes', { preHandler: autenticar }, async (request, reply) => {
    const resultado = await sql.query(`
        SELECT cliente.*, barbeiro.nome AS barbeiro_nome
        FROM cliente
        INNER JOIN barbeiro ON cliente.barbeiro_id = barbeiro.id
        ORDER BY cliente.id
    `)
    return resultado.rows
})

servidor.post('/clientes', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body

    if (!body || !body.nome || !body.barbeiro_id) {
        return reply.status(400).send({ message: 'Nome e barbeiro são obrigatórios!' })
    }

    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: 'Barbeiro informado não existe!' })
    }

    await sql.query(
        'INSERT INTO cliente (nome, telefone, estilo_corte, barbeiro_id) VALUES ($1, $2, $3, $4)',
        [body.nome, body.telefone, body.estilo_corte, body.barbeiro_id]
    )

    return reply.status(201).send({ message: 'Cliente cadastrado!' })
})

// =====================================================================
// AGENDAMENTO (listar ordenado por data com dados do barbeiro e do cliente,
//              cadastrar e atualizar a data)
// =====================================================================

servidor.get('/agendamentos', { preHandler: autenticar }, async (request, reply) => {
    const resultado = await sql.query(`
        SELECT
            agendamento.id,
            agendamento.data_agendamento,
            agendamento.servico,
            barbeiro.id AS barbeiro_id,
            barbeiro.nome AS barbeiro_nome,
            barbeiro.email AS barbeiro_email,
            barbeiro.telefone AS barbeiro_telefone,
            cliente.id AS cliente_id,
            cliente.nome AS cliente_nome,
            cliente.telefone AS cliente_telefone,
            cliente.estilo_corte AS cliente_estilo_corte
        FROM agendamento
        INNER JOIN barbeiro ON agendamento.barbeiro_id = barbeiro.id
        INNER JOIN cliente ON agendamento.cliente_id = cliente.id
        ORDER BY agendamento.data_agendamento ASC
    `)
    return resultado.rows
})

servidor.post('/agendamentos', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body

    if (!body || !body.data_agendamento || !body.servico || !body.barbeiro_id || !body.cliente_id) {
        return reply.status(400).send({ message: 'Data, serviço, barbeiro e cliente são obrigatórios!' })
    }

    await sql.query(
        'INSERT INTO agendamento (data_agendamento, servico, barbeiro_id, cliente_id) VALUES ($1, $2, $3, $4)',
        [body.data_agendamento, body.servico, body.barbeiro_id, body.cliente_id]
    )

    return reply.status(201).send({ message: 'Agendamento cadastrado!' })
})

// Atualiza SÓ a data do agendamento
servidor.put('/agendamentos/:id', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.data_agendamento) {
        return reply.status(400).send({ message: 'A nova data é obrigatória!' })
    }

    const resultado = await sql.query(
        'UPDATE agendamento SET data_agendamento = $1 WHERE id = $2',
        [body.data_agendamento, id]
    )

    if (resultado.rowCount === 0) {
        return reply.status(404).send({ message: 'Agendamento não existe!' })
    }

    return reply.status(200).send({ message: 'Data do agendamento atualizada!' })
})

// =====================================================================
servidor.listen({ port: 3000 }).then(() => {
    console.log('API da barbearia rodando em http://localhost:3000')
})
