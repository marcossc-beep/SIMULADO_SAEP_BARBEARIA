# Simulado SAEP 2026 - Barbearia (material do professor)

Turmas 3B e 3C · Professores Marcos e Paulo · 19/10 a 13/11/2026
Stack: Node.js + Fastify + PostgreSQL 17, bcrypt (senha e CPF) e JWT (sessão de 30 min).

| Pasta | Conteúdo |
|---|---|
| `01_prova` | Caderno de prova da barbearia e lista de verificação (HTML e PDF, 19 itens, 38 pontos) |
| `02_cronograma` | Cronograma das 14 aulas + simulado, com título, descrição e critérios de cada aula |
| `03_repositorio_alunos/projeto_inicial` | Projeto inicial dos alunos com a documentação da barbearia (sem node_modules) |
| `04_gabarito` | Solução completa testada: `saep_db.sql` e pasta `sistema` (API + telas) |
| `05_skill_saep-barbearia-aula` | Skill do Claude Code que monta o roteiro de live coding de cada aula |

Mapeamento com a prova original: Tutor -> Barbeiro · Pet -> Cliente · Agendamento -> Agendamento.

## Rodar o gabarito

1. pgAdmin: `CREATE DATABASE saep_db;` e rodar `04_gabarito/saep_db.sql` dentro dele.
2. Ajustar usuário/senha/porta do `Pool` em `04_gabarito/sistema/server.js`.
3. `cd 04_gabarito/sistema && npm install && npm start`
4. Abrir `front/index.html` (Live Server) e entrar com `marcos@barbearia.com` / `123`.

## Instalar a skill

Copie `05_skill_saep-barbearia-aula` para `~/.claude/skills/saep-barbearia-aula` e peça ao
Claude Code, por exemplo: "monta a aula de quinta 22/10 da 3B".
