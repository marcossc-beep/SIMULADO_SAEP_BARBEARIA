// SAEP 2026 - Simulado Barbearia - API FINAL (Fastify + PostgreSQL 17)
// Etapa 1 (CRUDs, Documentação Simplificada) + etapa 2 (Documentação Completa / backend):
// login com bcrypt + JWT, CPF e senha do barbeiro criptografados, JOINs e rotas protegidas.

import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'

const servidor = Fastify()

// CORS: libera o front-end (documentação do front-end). Sem PUT e DELETE aqui, editar e excluir falham no navegador.
servidor.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// JWT: o token é a sessão do usuário e expira em 30 minutos
servidor.register(jwt, {
    secret: 'saep_barbearia_2026',
    sign: { expiresIn: '30m' }
})

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "saep_db"
})

// Porteiro das rotas: só deixa passar quem tem token válido e não expirado
async function autenticar(request, reply) {
    try {
        await request.jwtVerify()
    } catch (erro) {
        return reply.status(401).send({ message: 'Sessão expirada ou inválida. Faça login novamente.' })
    }
}


// ### LOGIN (cpf e senha do usuário)

servidor.post('/login', async (request, reply) => {
    const body = request.body

    if (!body || !body.cpf || !body.senha) {
        return reply.status(400).send({ message: 'CPF e senha são obrigatórios!' })
    }

    const resultado = await sql.query('SELECT * FROM usuario WHERE cpf = $1', [body.cpf])

    if (resultado.rows.length === 0) {
        return reply.status(401).send({ message: 'Usuário ou senha inválidos!' })
    }

    const usuario = resultado.rows[0]
    const senhaValida = await bcrypt.compare(body.senha, usuario.senha)

    if (!senhaValida) {
        return reply.status(401).send({ message: 'Usuário ou senha inválidos!' })
    }

    const token = servidor.jwt.sign({ id: usuario.id, nome: usuario.nome })

    // exp vem em segundos dentro do token, o front usa em milissegundos
    const expira = servidor.jwt.decode(token).exp * 1000

    return reply.status(200).send({
        message: 'Login realizado com sucesso!',
        token: token,
        expira: expira,
        usuario: { id: usuario.id, nome: usuario.nome }
    })
})


// ### BARBEIRO (listar com busca, cadastrar, editar e excluir). CPF e senha ficam criptografados.

// GET /barbeiros              -> lista todos
// GET /barbeiros?busca=ana    -> lista só os que combinam com o termo (nome)
servidor.get('/barbeiros', { preHandler: autenticar }, async (request, reply) => {
    const busca = request.query.busca

    if (busca) {
        const barbeiros = await sql.query(
            'SELECT id, nome FROM barbeiro WHERE nome ILIKE $1 ORDER BY id',
            [`%${busca}%`]
        )
        return reply.send(barbeiros.rows)
    }

    const barbeiros = await sql.query('SELECT id, nome FROM barbeiro ORDER BY id')
    reply.send(barbeiros.rows)
})

servidor.post('/barbeiros', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body

    // LGPD: CPF e senha são salvos criptografados (hash bcrypt)
    const cpfHash = await bcrypt.hash(body.cpf, 10)
    const senhaHash = await bcrypt.hash(body.senha, 10)

    await sql.query(
        'INSERT INTO barbeiro (nome, cpf, senha) VALUES ($1, $2, $3)',
        [body.nome, cpfHash, senhaHash]
    )

    reply.status(201).send({ message: 'barbeiro cadastrado!' })
})

servidor.put('/barbeiros/:id', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body
    const id = request.params.id

    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [id])
    if (barbeiro.rows.length === 0) {
        return reply.status(404).send({ message: 'Barbeiro não existe!' })
    }

    await sql.query('UPDATE barbeiro SET nome = $2 WHERE id = $1', [id, body.nome])

    // CPF e senha só mudam se forem enviados (e continuam criptografados)
    if (body.cpf) {
        const cpfHash = await bcrypt.hash(body.cpf, 10)
        await sql.query('UPDATE barbeiro SET cpf = $2 WHERE id = $1', [id, cpfHash])
    }
    if (body.senha) {
        const senhaHash = await bcrypt.hash(body.senha, 10)
        await sql.query('UPDATE barbeiro SET senha = $2 WHERE id = $1', [id, senhaHash])
    }

    reply.status(200).send({ message: `barbeiro ${body.nome} alterado!` })
})

servidor.delete('/barbeiros/:id', { preHandler: autenticar }, async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM barbeiro WHERE id = $1', [id])
    reply.status(200).send({ message: 'Barbeiro Deletado!' })
})


// ### CLIENTE (todo cliente é associado a um barbeiro: chave estrangeira)

// GET com JOIN: traz o nome do barbeiro de cada cliente
servidor.get('/clientes', { preHandler: autenticar }, async (request, reply) => {
    const clientes = await sql.query(`
        SELECT cliente.*, barbeiro.nome AS barbeiro_nome
        FROM cliente
        INNER JOIN barbeiro ON cliente.barbeiro_id = barbeiro.id
        ORDER BY cliente.id
    `)
    reply.send(clientes.rows)
})

servidor.post('/clientes', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body

    // antes de gravar, confere se o barbeiro existe
    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: 'Barbeiro informado não existe!' })
    }

    await sql.query(
        'INSERT INTO cliente (nome, cpf, barbeiro_id) VALUES ($1, $2, $3)',
        [body.nome, body.cpf, body.barbeiro_id]
    )

    reply.status(201).send({ message: 'cliente cadastrado!' })
})

servidor.put('/clientes/:id', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body
    const id = request.params.id

    const cliente = await sql.query('SELECT id FROM cliente WHERE id = $1', [id])
    if (cliente.rows.length === 0) {
        return reply.status(404).send({ message: 'Cliente não existe!' })
    }

    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: 'Barbeiro informado não existe!' })
    }

    await sql.query(
        'UPDATE cliente SET nome = $2, cpf = $3, barbeiro_id = $4 WHERE id = $1',
        [id, body.nome, body.cpf, body.barbeiro_id]
    )

    reply.status(200).send({ message: `cliente ${body.nome} alterado!` })
})

servidor.delete('/clientes/:id', { preHandler: autenticar }, async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM cliente WHERE id = $1', [id])
    reply.status(200).send({ message: 'Cliente Deletado!' })
})


// ### AGENDAMENTO (liga um barbeiro e um cliente em uma data)

// GET com JOIN triplo, ordenado pela data. Traz os dados do barbeiro e do cliente.
// O CPF e a senha do barbeiro ficam de fora: estão criptografados.
servidor.get('/agendamentos', { preHandler: autenticar }, async (request, reply) => {
    const agendamentos = await sql.query(`
        SELECT
            agendamento.id,
            agendamento.data_hora,
            barbeiro.id AS barbeiro_id,
            barbeiro.nome AS barbeiro_nome,
            cliente.id AS cliente_id,
            cliente.nome AS cliente_nome,
            cliente.cpf AS cliente_cpf
        FROM agendamento
        INNER JOIN barbeiro ON agendamento.barbeiro_id = barbeiro.id
        INNER JOIN cliente ON agendamento.cliente_id = cliente.id
        ORDER BY agendamento.data_hora ASC
    `)
    reply.send(agendamentos.rows)
})

servidor.post('/agendamentos', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body

    // duas chaves estrangeiras: confere as duas antes de gravar
    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: 'Barbeiro informado não existe!' })
    }

    const cliente = await sql.query('SELECT id FROM cliente WHERE id = $1', [body.cliente_id])
    if (cliente.rows.length === 0) {
        return reply.status(400).send({ message: 'Cliente informado não existe!' })
    }

    await sql.query(
        'INSERT INTO agendamento (data_hora, barbeiro_id, cliente_id) VALUES ($1, $2, $3)',
        [body.data_hora, body.barbeiro_id, body.cliente_id]
    )

    reply.status(201).send({ message: 'agendamento cadastrado!' })
})

// Atualiza SÓ a data do agendamento
servidor.put('/agendamentos/:id', { preHandler: autenticar }, async (request, reply) => {
    const body = request.body
    const id = request.params.id

    const resultado = await sql.query(
        'UPDATE agendamento SET data_hora = $2 WHERE id = $1',
        [id, body.data_hora]
    )

    if (resultado.rowCount === 0) {
        return reply.status(404).send({ message: 'Agendamento não existe!' })
    }

    reply.status(200).send({ message: 'Data do agendamento atualizada!' })
})

servidor.delete('/agendamentos/:id', { preHandler: autenticar }, async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM agendamento WHERE id = $1', [id])
    reply.status(200).send({ message: 'Agendamento Deletado!' })
})


// ### Listen

servidor.listen({
    port: 6767
})
