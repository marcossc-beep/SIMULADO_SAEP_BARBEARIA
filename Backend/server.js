// SAEP 2026 - Simulado Barbearia - ETAPA 1: API com os CRUDs (barbeiro, cliente e agendamento)
// Tudo aqui segue a Documentação Simplificada (API.txt), trocando o exemplo de escola pelo da barbearia:
//   usuario  -> barbeiro        sala -> cliente        reuniao -> agendamento

import Fastify from 'fastify'
import { Pool } from 'pg'

const servidor = Fastify()

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "saep_db"
})


// ### BARBEIRO (listar com busca, cadastrar, editar e excluir)

// GET /barbeiros              -> lista todos
// GET /barbeiros?busca=ana    -> lista só os que combinam com o termo (nome)
servidor.get('/barbeiros', async (request, reply) => {
    const busca = request.query.busca

    if (busca) {
        const barbeiros = await sql.query(
            'SELECT id, nome, cpf FROM barbeiro WHERE nome ILIKE $1 ORDER BY id',
            [`%${busca}%`]
        )
        return reply.send(barbeiros.rows)
    }

    const barbeiros = await sql.query('SELECT id, nome, cpf FROM barbeiro ORDER BY id')
    reply.send(barbeiros.rows)
})

servidor.post('/barbeiros', async (request, reply) => {
    const body = request.body

    await sql.query(
        'INSERT INTO barbeiro (nome, cpf, senha) VALUES ($1, $2, $3)',
        [body.nome, body.cpf, body.senha]
    )

    reply.status(201).send({ message: "barbeiro cadastrado!" })
})

servidor.put('/barbeiros/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    const barbeiro = await sql.query('select * from barbeiro where id = $1', [id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({
            message: "Barbeiro não existe!"
        })
    }

    await sql.query(
        'UPDATE barbeiro SET nome = $2, cpf = $3, senha = $4 WHERE id = $1',
        [id, body.nome, body.cpf, body.senha]
    )
    reply.status(201).send({ message: `barbeiro ${body.nome} alterado!` })
})

servidor.delete('/barbeiros/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM barbeiro where id = $1', [id])
    reply.status(200).send({ message: 'Barbeiro Deletado!' })
})


// ### CLIENTE (todo cliente é associado a um barbeiro: chave estrangeira)

servidor.get('/clientes', async (request, reply) => {
    const clientes = await sql.query('SELECT * FROM cliente ORDER BY id')
    reply.send(clientes.rows)
})

servidor.post('/clientes', async (request, reply) => {
    const body = request.body

    // antes de gravar, confere se o barbeiro existe
    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: "Barbeiro informado não existe!" })
    }

    await sql.query(
        'INSERT INTO cliente (nome, cpf, barbeiro_id) VALUES ($1, $2, $3)',
        [body.nome, body.cpf, body.barbeiro_id]
    )

    reply.status(201).send({ message: "cliente cadastrado!" })
})

servidor.put('/clientes/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    const cliente = await sql.query('select * from cliente where id = $1', [id])
    if (cliente.rows.length === 0) {
        return reply.status(400).send({
            message: "Cliente não existe!"
        })
    }

    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: "Barbeiro informado não existe!" })
    }

    await sql.query(
        'UPDATE cliente SET nome = $2, cpf = $3, barbeiro_id = $4 WHERE id = $1',
        [id, body.nome, body.cpf, body.barbeiro_id]
    )
    reply.status(201).send({ message: `cliente ${body.nome} alterado!` })
})

servidor.delete('/clientes/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM cliente where id = $1', [id])
    reply.status(200).send({ message: 'Cliente Deletado!' })
})


// ### AGENDAMENTO (liga um barbeiro e um cliente em uma data)

// GET com JOIN triplo, ordenado pela data (é o GET /reunioes da documentação).
// Traz os dados do barbeiro e do cliente de cada agendamento. A senha do barbeiro fica de fora de propósito.
    servidor.get('/agendamentos', async (request, reply) => {
        const agendamentos = await sql.query(`
            SELECT
                agendamento.id,
                agendamento.data_hora,
                barbeiro.id AS barbeiro_id,
                barbeiro.nome AS barbeiro_nome,
                barbeiro.cpf AS barbeiro_cpf,
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

servidor.post('/agendamentos', async (request, reply) => {
    const body = request.body

    // duas chaves estrangeiras: confere as duas antes de gravar
    const barbeiro = await sql.query('SELECT id FROM barbeiro WHERE id = $1', [body.barbeiro_id])
    if (barbeiro.rows.length === 0) {
        return reply.status(400).send({ message: "Barbeiro informado não existe!" })
    }

    const cliente = await sql.query('SELECT id FROM cliente WHERE id = $1', [body.cliente_id])
    if (cliente.rows.length === 0) {
        return reply.status(400).send({ message: "Cliente informado não existe!" })
    }

    await sql.query(
        'INSERT INTO agendamento (data_hora, barbeiro_id, cliente_id) VALUES ($1, $2, $3)',
        [body.data_hora, body.barbeiro_id, body.cliente_id]
    )

    reply.status(201).send({ message: "agendamento cadastrado!" })
})

// PUT que altera só UM campo: a data
servidor.put('/agendamentos/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    const resultado = await sql.query(
        'UPDATE agendamento SET data_hora = $2 WHERE id = $1',
        [id, body.data_hora]
    )

    if (resultado.rowCount === 0) {
        return reply.status(404).send({ message: "Agendamento não existe!" })
    }

    reply.status(200).send({ message: "Data do agendamento atualizada!" })
})

servidor.delete('/agendamentos/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM agendamento where id = $1', [id])
    reply.status(200).send({ message: 'Agendamento Deletado!' })
})


// ### Listen

servidor.listen({
    port: 6767
})
