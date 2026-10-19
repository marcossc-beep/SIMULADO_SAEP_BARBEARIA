
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE barbeiro (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL 
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    barbeiro_id INT NOT NULL REFERENCES barbeiro(id) ON DELETE CASCADE
);

CREATE TABLE agendamento (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    barbeiro_id INT NOT NULL REFERENCES barbeiro(id) ON DELETE CASCADE,
    cliente_id INT NOT NULL REFERENCES cliente(id) ON DELETE CASCADE
);


INSERT INTO usuario (nome, cpf, senha) VALUES
('Carlos Silva', '111.222.333-44', 'senha123'),
('Ana Souza', '222.333.444-55', 'senha456'),
('Marcos Oliveira', '333.444.555-66', 'senha789');

select * from usuario;

INSERT INTO barbeiro (nome, cpf, senha) VALUES
('Carlos Silva', '111.222.333-44', 'senha123'),
('Ana Souza', '222.333.444-55', 'senha456'),
('Marcos Oliveira', '333.444.555-66', 'senha789');

select * from barbeiro;

INSERT INTO cliente (nome, cpf, barbeiro_id) VALUES
('Carlos Silva', '111.222.333-44', 3),
('Ana Souza', '222.333.444-55', 2),
('Marcos Oliveira', '333.444.555-66', 1);

select * from cliente;

INSERT INTO agendamento (data_hora, barbeiro_id, cliente_id) VALUES
('2026-11-20 14:00:00', 1, 1),
('2026-11-18 10:30:00', 2, 2),
('2026-11-19 16:00:00', 3, 3);



-- Criptografia (etapa do login): troca a senha do usuário e o CPF e a senha do barbeiro por hash bcrypt.
-- Rodar UMA vez só (com o script do zero, roda junto), senão faz hash do hash.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE usuario SET senha = crypt(senha, gen_salt('bf'));
UPDATE barbeiro SET cpf = crypt(cpf, gen_salt('bf')), senha = crypt(senha, gen_salt('bf'));
