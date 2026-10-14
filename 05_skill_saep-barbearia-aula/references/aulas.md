# Aulas do simulado SAEP 2026 Barbearia

Início 19/10/2026 · sem aula 02/11 (Finados) · simulado 13/11/2026.
As duas turmas seguem a MESMA sequência. A aula seguinte continua de onde a anterior parou,
independente do professor. Dias de 2 aulas: Paulo na quarta com a 3C, Marcos na quinta com a 3B.

Horário fixo:
- Segunda: Paulo 3B · Marcos 3C
- Terça: Paulo 3C
- Quarta: Paulo 3B e 3C (3C só 2 aulas)
- Quinta: Marcos 3B (2 aulas)
- Sexta: Marcos 3B e 3C

| Aula | Título | 3B | 3C | Duração |
|---|---|---|---|---|
| 01 | Leitura do caderno e documentação de software | 19/10 seg Paulo | 19/10 seg Marcos | 3 aulas |
| 02 | Modelagem do banco e criação das tabelas | 21/10 qua Paulo | 20/10 ter Paulo | 3 aulas |
| 03 | População do banco com senha e CPF criptografados | 22/10 qui Marcos | 21/10 qua Paulo | 2 aulas |
| 04 | API com Fastify e rota de login (bcrypt + JWT) | 23/10 sex Marcos | 23/10 sex Marcos | 3 aulas |
| 05 | Tela de login e sessão no navegador | 26/10 seg Paulo | 26/10 seg Marcos | 3 aulas |
| 06 | Funcionalidade principal: usuário logado, menu e sair | 28/10 qua Paulo | 27/10 ter Paulo | 3 aulas |
| 07 | API de barbeiros: listar, buscar, cadastrar e excluir | 29/10 qui Marcos | 28/10 qua Paulo | 2 aulas |
| 08 | Tela de barbeiros: listagem, busca, cadastro e exclusão | 30/10 sex Marcos | 30/10 sex Marcos | 3 aulas |
| 09 | Editar barbeiro de ponta a ponta | 04/11 qua Paulo | 03/11 ter Paulo | 3 aulas |
| 10 | Clientes associados a um barbeiro | 05/11 qui Marcos | 04/11 qua Paulo | 2 aulas |
| 11 | API de agendamentos: JOIN triplo, ordenação e nova data | 06/11 sex Marcos | 06/11 sex Marcos | 3 aulas |
| 12 | Tela de agendamentos e fechamento do sistema | 09/11 seg Paulo | 09/11 seg Marcos | 3 aulas |
| 13 | Ensaio cronometrado 1: entregas 1 a 5 do zero | 11/11 qua Paulo | 10/11 ter Paulo | 3 aulas |
| 14 | Ensaio cronometrado 2 e orientações do simulado | 12/11 qui Marcos | 11/11 qua Paulo | 2 aulas |
| SIM | Simulado / avaliação diagnóstica | 13/11 sex Marcos | 13/11 sex Marcos | 3 aulas* |

*A prova real tem 30 min de ambientação + 3 h. Com 3 aulas (~2h15) o simulado roda reduzido
(10 min de ambientação + 2 h) se a coordenação não liberar mais tempo.

---

## Aula 01 - Leitura do caderno e documentação de software
- Critérios: 1.1 (peso 2), 1.2 (peso 1)
- Descrição: apresentar o SAEP, o caderno da barbearia e a lista de verificação. Preparar o
  posto: clonar o repositório, npm install, PostgreSQL 17 + pgAdmin, extensão REST Client.
  Transformar cada regra de negócio em requisito funcional e preencher o Anexo 1 com SGBD
  (PostgreSQL 17) e linguagem (JavaScript / Node.js + versão do `node -v`). Exportar documentacao.pdf.
- Antes: nada. Depois: repositório clonado e rodando `npm install`; documentacao.pdf.
- Referência: documentações/Documentação Completa/documentacoes.txt (RF01 a RF09).

## Aula 02 - Modelagem do banco e criação das tabelas
- Critérios: 1.3 (peso 1), 2.1 (peso 2)
- Descrição: entidades e relacionamentos (usuario isolado; barbeiro 1:N cliente; agendamento
  com FK para barbeiro e cliente). CREATE DATABASE saep_db; CREATE EXTENSION pgcrypto;
  CREATE TABLE na ordem usuario, barbeiro, cliente, agendamento com PK, FK e ON DELETE CASCADE.
  DER no pgAdmin (botão direito no banco > ERD For Database > Download image) -> der.png.
- Antes: documentacao.pdf. Depois: tabelas criadas, der.png, saep_db.sql só com os CREATE.

## Aula 03 - População do banco com senha e CPF criptografados (2 aulas)
- Critérios: 2.1 (revisão), 2.2 (peso 1)
- Descrição: crypt('123', gen_salt('bf')) gera hash bcrypt compatível com o Node. 3 INSERTs
  por tabela na ordem das FKs. SELECTs de conferência e JOIN cliente+barbeiro. DROP das
  tabelas e rodar o script do zero.
- Antes: CREATE TABLEs. Depois: saep_db.sql completo igual ao gabarito (login de teste
  marcos@barbearia.com / 123).

## Aula 04 - API com Fastify e rota de login (bcrypt + JWT)
- Critérios: 3.1, 3.2, 3.3 (lado do backend)
- Descrição: server.js com imports, CORS, JWT (secret fixo, expiresIn '30m'), Pool. POST /login:
  400 sem dados, 401 e-mail inexistente ou senha errada (mesma mensagem), bcrypt.compare,
  token + expira (decode(token).exp * 1000) + usuario. Função autenticar com jwtVerify.
  referencias.http: login certo, senha errada, vazio.
- Antes: banco populado. Depois: `npm start` sobe a API na porta 3000 e o login responde.

## Aula 05 - Tela de login e sessão no navegador
- Critérios: 3.1 (peso 1), 3.2 (peso 3), 3.3 (peso 2)
- Descrição: front/sessao.js (API, pegarUsuario, sessaoValida, sair, protegerPagina, api(),
  formatarData). front/index.html com form, `<p id="mensagem">` para erro, localStorage
  (token, expira, usuario), redireciona para principal.html. Demonstrar expiração com '1m'.
- Antes: API com /login. Depois: login pelo navegador funcionando.

## Aula 06 - Funcionalidade principal: usuário logado, menu e sair
- Critérios: 4.1 (peso 2), 4.2 (peso 1), 4.3 (peso 1)
- Descrição: principal.html com protegerPagina, nome do usuário, nav para barbeiros.html,
  clientes.html, agendamentos.html, botão Sair. Criar as 3 páginas com header de navegação e
  protegerPagina. estilo.css. Fechar refazendo login + principal em 40 min.
- Antes: index.html + sessao.js. Depois: navegação completa entre páginas (ainda vazias).

## Aula 07 - API de barbeiros: listar, buscar, cadastrar e excluir (2 aulas)
- Critérios: 5.1, 5.2, 5.3, 5.4 (lado do backend)
- Descrição: GET /barbeiros (SELECT id, nome, email, telefone; ?busca= com ILIKE em nome
  ou email), POST /barbeiros (bcrypt.hash no cpf e na senha), DELETE /barbeiros/:id, todos com
  { preHandler: autenticar }. Testar no .http com @token e ver os hashes no pgAdmin.
- Antes: login + principal. Depois: rotas de barbeiro testadas.

## Aula 08 - Tela de barbeiros: listagem, busca, cadastro e exclusão
- Critérios: 5.1 (peso 2), 5.2 (peso 3), 5.3 (peso 2), 5.4 (peso 3)
- Descrição: barbeiros.html: tabela (forEach + innerHTML), form de busca com Buscar/Limpar,
  form de cadastro (formBarbeiro), botão Excluir com confirm. Funções carregar(busca),
  buscar, limparBusca, salvar (só POST por enquanto), excluir.
- Antes: rotas de barbeiro. Depois: tela de barbeiros sem a edição.

## Aula 09 - Editar barbeiro de ponta a ponta
- Critérios: 5.5 (peso 3), 5.4 (revisão)
- Descrição: PUT /barbeiros/:id (404 se não existe; UPDATE nome/email/telefone; recriptografa
  cpf e senha só se vierem). Front: input hidden id, editar(id) com barbeiros.find,
  salvar() decide POST ou PUT, limparFormulario(). Revisar os itens 5.1 a 5.5.
- Antes: tela de barbeiros sem edição. Depois: gerenciamento de barbeiro completo (13 pontos).

## Aula 10 - Clientes associados a um barbeiro (2 aulas)
- Critérios: 6.1 (peso 3)
- Descrição: GET /clientes com INNER JOIN barbeiro (barbeiro_nome), POST /clientes validando
  barbeiro_id existente. clientes.html: select barbeiro_id preenchido com GET /barbeiros
  (value = id, texto = nome), listagem com o barbeiro.
- Antes: barbeiro completo. Depois: clientes funcionando.

## Aula 11 - API de agendamentos: JOIN triplo, ordenação e nova data
- Critérios: 7.1, 7.2 (lado do backend)
- Descrição: GET /agendamentos com 2 INNER JOIN e aliases (barbeiro_nome, barbeiro_email,
  barbeiro_telefone, cliente_nome, cliente_telefone, cliente_estilo_corte) ORDER BY
  data_agendamento ASC. POST /agendamentos. PUT /agendamentos/:id só com data_agendamento e
  rowCount para 404. Formato ISO 2026-11-18T14:30.
- Antes: clientes. Depois: rotas de agendamento testadas no .http.

## Aula 12 - Tela de agendamentos e fechamento do sistema
- Critérios: 7.1 (peso 3), 7.2 (peso 2)
- Descrição: agendamentos.html: tabela com dados do barbeiro e do cliente, formatarData,
  input datetime-local `data-<id>` + botão Atualizar data por linha, form de novo agendamento
  com selects. Teste ponta a ponta. Montar o .zip nome_sobrenome (documentacao.pdf, der.png,
  saep_db.sql, pasta sistema).
- Antes: rotas de agendamento. Depois: sistema completo = gabarito.

## Aula 13 - Ensaio cronometrado 1: entregas 1 a 5 do zero
- Critérios: 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3
- Descrição: sem gabarito e sem internet (pode usar a pasta documentações). Documentação +
  DER + banco em 40 min, correção em duplas pela lista de verificação. Login + principal em
  40 min. Fechar com os erros mais comuns.

## Aula 14 - Ensaio cronometrado 2 e orientações do simulado (2 aulas)
- Critérios: 5.1, 5.2, 5.3, 5.4, 5.5
- Descrição: gerenciamento de barbeiro do zero em 45 min. Autoavaliação. Checklist de
  ambiente para 13/11 (senha/porta do Postgres, node -v, REST Client, documentações na pasta).
  Regras: celular guardado, sem internet, 30 min ambientação, 3 h, .zip com nome completo.

## Simulado - 13/11 (Marcos, 3B e 3C)
- Todos os 19 critérios (38 pontos). Caderno: SIMULADO_SAEP_BARBEARIA/01_prova.
- O aluno faz sozinho. Correção pela lista_verificacao_barbearia com justificativa de cada "Não".
