-- =====================================================================
-- SAEP 2026 - SIMULADO BARBEARIA
-- Script de criação e população do banco de dados (saep_db.sql)
-- SGBD: PostgreSQL 17
--
-- Antes de rodar este script, crie o banco no pgAdmin:
--   CREATE DATABASE saep_db;
-- Depois abra o Query Tool DENTRO do banco saep_db e execute tudo.
-- =====================================================================

-- Extensão do próprio Postgres que tem a função crypt() com bcrypt.
-- Usamos ela para já inserir senha e CPF criptografados (bcrypt) no script.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Tabela USUARIO (quem faz login no sistema - recepção/gestor)
-- ---------------------------------------------------------------------
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL              -- hash bcrypt
);

-- ---------------------------------------------------------------------
-- 2. Tabela BARBEIRO (equivalente ao TUTOR da prova original)
-- ---------------------------------------------------------------------
CREATE TABLE barbeiro (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(255) NOT NULL,               -- hash bcrypt (LGPD)
    senha VARCHAR(255) NOT NULL,             -- hash bcrypt
    telefone VARCHAR(20)
);

-- ---------------------------------------------------------------------
-- 3. Tabela CLIENTE (equivalente ao PET da prova original)
--    Todo cliente é associado a um barbeiro (barbeiro de preferência)
-- ---------------------------------------------------------------------
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    estilo_corte VARCHAR(100),
    barbeiro_id INT NOT NULL REFERENCES barbeiro(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 4. Tabela AGENDAMENTO (liga barbeiro e cliente em uma data)
-- ---------------------------------------------------------------------
CREATE TABLE agendamento (
    id SERIAL PRIMARY KEY,
    data_agendamento TIMESTAMP NOT NULL,
    servico VARCHAR(100) NOT NULL,
    barbeiro_id INT NOT NULL REFERENCES barbeiro(id) ON DELETE CASCADE,
    cliente_id INT NOT NULL REFERENCES cliente(id) ON DELETE CASCADE
);

-- =====================================================================
-- POPULAÇÃO (mínimo 3 registros em TODAS as tabelas)
-- Ordem: primeiro as tabelas sem chave estrangeira, depois as que dependem.
-- crypt('texto', gen_salt('bf')) gera um hash bcrypt igual ao do Node.
-- =====================================================================

-- Senha de todos os usuários: 123
INSERT INTO usuario (nome, email, senha) VALUES
('Marcos Coelho', 'marcos@barbearia.com', crypt('123', gen_salt('bf'))),
('Paulo Souza',   'paulo@barbearia.com',  crypt('123', gen_salt('bf'))),
('Ana Lima',      'ana@barbearia.com',    crypt('123', gen_salt('bf')));

INSERT INTO barbeiro (nome, email, cpf, senha, telefone) VALUES
('Rafael Navalha', 'rafael@barbearia.com', crypt('111.222.333-44', gen_salt('bf')), crypt('123', gen_salt('bf')), '48999991111'),
('Bruno Tesoura',  'bruno@barbearia.com',  crypt('222.333.444-55', gen_salt('bf')), crypt('123', gen_salt('bf')), '48999992222'),
('Diego Fade',     'diego@barbearia.com',  crypt('333.444.555-66', gen_salt('bf')), crypt('123', gen_salt('bf')), '48999993333');

INSERT INTO cliente (nome, telefone, estilo_corte, barbeiro_id) VALUES
('João Pedro',    '48988881111', 'Degradê navalhado', 1),
('Lucas Martins', '48988882222', 'Social com barba',  2),
('Gabriel Rocha', '48988883333', 'Moicano',           3);

INSERT INTO agendamento (data_agendamento, servico, barbeiro_id, cliente_id) VALUES
('2026-11-20 10:00:00', 'Corte + Barba', 2, 2),
('2026-11-18 14:30:00', 'Corte degradê', 1, 1),
('2026-11-19 09:00:00', 'Corte moicano', 3, 3);

-- Conferência rápida
SELECT * FROM usuario;
SELECT * FROM barbeiro;
SELECT * FROM cliente;
SELECT * FROM agendamento;
