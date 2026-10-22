Critérios avaliativos:
{
  '1.1': ['Identificou no mínimo 4 requisitos do sistema conforme Anexo 1', 2],
  '1.2': ['Identificou os requisitos de infraestrutura (SGBD e linguagem) conforme Anexo 1', 1],
  '1.3': ['Gerou o diagrama entidade relacionamento', 1],
  '2.1': ['Criou as tabelas respeitando a chave estrangeira de cada relacionamento', 2],
  '2.2': ['Inseriu pelo menos três registros em cada tabela', 1],
  '3.1': ['Autenticação redireciona para o módulo principal com login e senha do banco', 1],
  '3.2': ['Sessão do usuário autenticado com tempo de expiração', 3],
  '3.3': ['Validação (front ou back) em caso de falha de autenticação', 2],
  '4.1': ['Nome do usuário autenticado exibido na funcionalidade principal', 2],
  '4.2': ['Meio para sair do sistema', 1],
  '4.3': ['Acesso a Barbeiro, Cliente e Agendamento a partir da Principal', 1],
  '5.1': ['Listar e excluir barbeiros cadastrados', 2],
  '5.2': ['Busca com no mínimo um termo', 3],
  '5.3': ['Inserção de um novo barbeiro com persistência no banco', 2],
  '5.4': ['Criptografar pelo menos a senha e o CPF do barbeiro no banco', 3],
  '5.5': ['Editar um barbeiro já existente no banco', 3],
  '6.1': ['Inserção de um novo cliente associando-o a um barbeiro', 3],
  '7.1': ['Listar os agendamentos ordenados por data', 3],
  '7.2': ['Atualizar a data de um agendamento', 2]
};

Total: 38 pontos (pesos conferidos com a lista de verificação).

Como ler este cronograma:
- A sequência de aulas é a mesma para a 3B e para a 3C. O que muda são as datas e o professor do dia.
- Sem aula em 02/11 (Finados). Simulado em 13/11 para as duas turmas.
- Aulas 3, 7, 10 e 14 caem em dias de 2 aulas (~75 min úteis). As demais são de 3 aulas (~120 min úteis).
- [API] = parte do back-end (testada no REST Client). [TELA] = parte do front-end.
- Na prova o avaliador só marca "Sim" quando a funcionalidade funciona no sistema rodando. Por isso vários critérios aparecem em duas aulas: primeiro a API, depois a tela.
- Primeiro CRUD = Barbeiro (concentra 13 dos 38 pontos). Cliente e Agendamento são derivados dele.



### AULA1: Leitura do caderno e documentação de software

Datas: 3B 19/10 (seg, Paulo) | 3C 19/10 (seg, Marcos) | 3 aulas

Critério avaliativo:
Identificou no mínimo 4 requisitos do sistema conforme Anexo 1
Identificou os requisitos de infraestrutura (SGBD e linguagem) conforme Anexo 1

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam interpretar a prova retirando 4 requisitos de acordo com a prova,
Além disso, deverá ser explicado aos estudantes da necessidade de preencher o Anexo 1 com os requisitos de infraestrutura que são: 

SGBD: Postgres, versão 17
Linguagem de programação: Javascript, versão ES6

Na prova conferir também as versões reais da máquina: `SELECT version();` no pgAdmin e `node -v` no terminal.
Também nesta aula: clonar o repositório, rodar `npm install` e conferir pgAdmin e a extensão REST Client do VS Code.
Entrega treinada: documentacao.pdf (Anexo 1 preenchido e salvo em PDF).

Material de apoio: documentação Completa / documentacoes.txt (modelo de requisitos).



### AULA2: Modelagem do banco e criação das tabelas, inserts nas tabelas e DER

Datas: 3B 21/10 (qua, Paulo) | 3C 20/10 (ter, Paulo) | 3 aulas

Critério avaliativo:
Gerou o diagrama entidade relacionamento
Criou as tabelas respeitando a chave estrangeira de cada relacionamento
Inseriu pelo menos três registros em cada tabela

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam criar as tabelas usando create table de acordo com os requisitos da avaliação e inserir três registros em cada tabela usando insert into no pgadmin, além disso, no próprio pgadmin gerar o diagrama de entidade relacionamento e colocar na raiz do projeto em png utilizando a ferramenta generate erd do postgres.

Detalhes para não perder ponto:
- Tabelas: usuario, barbeiro, cliente e agendamento. Criar na ordem das chaves estrangeiras: usuario e barbeiro primeiro, depois cliente (barbeiro_id) e por último agendamento (barbeiro_id e cliente_id).
- O que vale na prova é o arquivo saep_db.sql: escrever os CREATE TABLE e os INSERT no Query Tool e salvar tudo nesse arquivo. Testar rodando o arquivo do zero.
- Nesta aula o usuario e o barbeiro entram com senha e CPF em texto puro, de propósito. Na aula 5 trocamos por hash (bcrypt).
- DER: botão direito no banco > ERD For Database (o nome do menu muda conforme a versão do pgAdmin) e exportar como der.png.

Material de apoio: documentação Simplificada / SQL.txt (criação e população) e Completa / SQL.txt.



### AULA3: Integração do banco com a API e criação do primeiro CRUD (Barbeiro)

Datas: 3B 22/10 (qui, Marcos) | 3C 21/10 (qua, Paulo) | 2 aulas

Critério avaliativo:
[API] Listar e excluir barbeiros cadastrados (5.1)
[API] Inserção de um novo barbeiro com persistência no banco (5.3)
[API] Editar um barbeiro já existente no banco (5.5)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam conectar a API (Fastify) ao Postgres usando a biblioteca pg e ter o CRUD completo de barbeiro funcionando: GET (listar), POST (cadastrar), PUT (editar) e DELETE (excluir), tudo testado no arquivo referencias.http com o REST Client e conferido no pgAdmin.
A ideia é seguir a documentação: copiar do arquivo, entender e adaptar o nome da tabela e das colunas para barbeiro.

OBS 1: aula curta (2 aulas), por isso não tem tela e não tem busca ainda. Só o CRUD.
OBS 2: o CPF e a senha entram em texto puro por enquanto. A criptografia (5.4, peso 3) volta nessas mesmas rotas na aula 5.
OBS 3: nas rotas da documentação Completa aparece `{ preHandler: autenticar }`. Ignorar até a aula 5, quando a função autenticar passa a existir.

Material de apoio: documentação Simplificada / API.txt (conexão, GET, POST, PUT, DELETE, REST Client).



### AULA4: Criação dos outros CRUDs (Cliente e Agendamento) e busca do Barbeiro

Datas: 3B 23/10 (sex, Marcos) | 3C 23/10 (sex, Marcos) | 3 aulas

Critério avaliativo:
[API] Busca com no mínimo um termo (5.2)
[API] Inserção de um novo cliente associando-o a um barbeiro (6.1)
[API] Listar os agendamentos ordenados por data (7.1)
[API] Atualizar a data de um agendamento (7.2)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam copiar o CRUD do barbeiro e adaptar para cliente e agendamento trocando os nomes de tabela e colunas, além de adicionar a busca por termo no barbeiro.
Ordem sugerida:
1. Busca do barbeiro: GET /barbeiros?busca=termo usando request.query e ILIKE (nome ou e-mail).
2. Cliente: copiar o CRUD. No POST exigir o barbeiro_id e conferir se o barbeiro existe. No GET trazer o nome do barbeiro com INNER JOIN.
3. Agendamento: copiar o CRUD, mas aqui não é só trocar nomes. O GET precisa de dois INNER JOIN (barbeiro e cliente) com apelidos (AS) para os campos não se sobrescreverem, e ORDER BY data. O PUT atualiza somente a data_agendamento.

OBS: reservar tempo para o JOIN, é a parte que o copiar e colar não resolve.

Material de apoio: documentação Simplificada / SQL.txt (INNER JOIN), Completa / agendamentos.txt (datas e query params) e Completa / API.txt (busca opcional).



### AULA5: Autenticação e Login com bcrypt e JWT (encerra o back-end)

Datas: 3B 26/10 (seg, Paulo) | 3C 26/10 (seg, Marcos) | 3 aulas

Critério avaliativo:
[API] Autenticação com login e senha do banco (3.1)
[API] Sessão do usuário autenticado com tempo de expiração (3.2)
[API] Validação em caso de falha de autenticação (3.3)
[API] Nome do usuário autenticado disponível para a funcionalidade principal (4.1)
Criptografar pelo menos a senha e o CPF do barbeiro no banco (5.4)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam:
- Criar a rota POST /login: 400 se faltar e-mail ou senha, 401 se o e-mail não existe ou a senha está errada (mesma mensagem nos dois casos), bcrypt.compare e, se estiver certo, gerar o token JWT com expiração (expiresIn) devolvendo token, horário de expiração e os dados do usuário, incluindo o nome.
- Criar a função autenticar (jwtVerify) e colocar nas rotas de barbeiro, cliente e agendamento.
- Voltar nas rotas de barbeiro da aula 3 e usar bcrypt.hash no CPF e na senha, no POST e no PUT.
- Trocar os dados de teste do saep_db.sql por hash. O jeito mais simples é no SQL: `crypt('123', gen_salt('bf'))` (extensão pgcrypto, está na documentação). Sem isso o login falha, porque os inserts da aula 2 estão em texto puro.
- Testar tudo no referencias.http: login certo, senha errada, campos vazios, rota sem token e token expirado (testar com expiresIn de 1 minuto e voltar para 30 minutos).

OBS: ao final desta aula o back-end está pronto, mas os itens só ficam completos quando a tela existir.

Material de apoio: documentação Completa / criptografia.txt (bcrypt, JWT, hash no SQL) e Completa / API.txt.



### AULA6: Início do front-end: CORS e integração com o back-end

Datas: 3B 28/10 (qua, Paulo) | 3C 27/10 (ter, Paulo) | 3 aulas

Critério avaliativo:
[TELA] Autenticação redireciona para o módulo principal com login e senha do banco (3.1)
[TELA] Validação em caso de falha de autenticação (3.3)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam liberar o acesso do navegador à API com @fastify/cors e fazer a primeira integração: a tela de login (index.html) chamando POST /login com fetch.
- Estrutura da pasta do front e arquivo sessao.js com as funções de apoio (endereço da API, pegar usuário, sair, fetch com o token).
- Tela de login com validação de campos vazios e mensagem de erro na tela para usuário ou senha inválidos (3.3).
- Se o login der certo: guardar token, horário de expiração e usuário no localStorage e redirecionar para principal.html (3.1).

Material de apoio: documentação Completa / usuario_logado.txt e Completa / API.txt (CORS).



### AULA7: Sessão com expiração e funcionalidade principal

Datas: 3B 29/10 (qui, Marcos) | 3C 28/10 (qua, Paulo) | 2 aulas

Critério avaliativo:
[TELA] Sessão do usuário autenticado com tempo de expiração (3.2)
[TELA] Nome do usuário autenticado exibido na funcionalidade principal (4.1)
Meio para sair do sistema (4.2)
Acesso a Barbeiro, Cliente e Agendamento a partir da Principal (4.3)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam fazer a principal.html:
- Função que protege a página: se não houver token ou o horário de expiração já passou, limpa o localStorage e volta para o login.
- Exibir o nome do usuário logado vindo do localStorage.
- Botão Sair que apaga os dados da sessão e volta para o login.
- Menu com links para barbeiros.html, clientes.html e agendamentos.html (as páginas podem estar vazias, só o cabeçalho de navegação).
- Mostrar a expiração funcionando: se a API responder 401, a tela volta para o login.

Material de apoio: documentação Completa / usuario_logado.txt.



### AULA8: Tela de Barbeiro: listar, excluir e cadastrar

Datas: 3B 30/10 (sex, Marcos) | 3C 30/10 (sex, Marcos) | 3 aulas

Critério avaliativo:
[TELA] Listar e excluir barbeiros cadastrados (5.1)
[TELA] Inserção de um novo barbeiro com persistência no banco (5.3)
[TELA] Criptografar pelo menos a senha e o CPF do barbeiro no banco (5.4)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam montar barbeiros.html com tabela (forEach e innerHTML), botão Excluir com confirmação e formulário de cadastro. Conferir no pgAdmin que o CPF e a senha cadastrados pela tela ficaram em hash. A listagem não mostra CPF nem senha.

Material de apoio: documentação Completa / html_js_puro.txt.



### AULA9: Tela de Barbeiro: busca e edição

Datas: 3B 04/11 (qua, Paulo) | 3C 03/11 (ter, Paulo) | 3 aulas

Critério avaliativo:
[TELA] Busca com no mínimo um termo (5.2)
[TELA] Editar um barbeiro já existente no banco (5.5)
Revisão de 5.1, 5.3 e 5.4

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam:
- Formulário de busca: digitar o termo, confirmar e a listagem atualiza com os registros que combinam. Botão Limpar volta à lista completa.
- Edição: o botão Editar joga os dados no formulário, o mesmo botão decide entre cadastrar (POST) e salvar alteração (PUT), e o dado alterado aparece na listagem depois de salvar.
- Na edição, CPF e senha só mudam se forem digitados de novo e continuam criptografados.
- Fechar com a revisão de todos os itens do barbeiro (5.1 a 5.5, 13 pontos) pela lista de verificação.

Material de apoio: documentação Completa / html_js_puro.txt.



### AULA10: Tela de Cliente associado a um barbeiro

Datas: 3B 05/11 (qui, Marcos) | 3C 04/11 (qua, Paulo) | 2 aulas

Critério avaliativo:
[TELA] Inserção de um novo cliente associando-o a um barbeiro (6.1)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam fazer clientes.html com formulário de cadastro, em que o barbeiro é escolhido num select preenchido com os barbeiros do banco (texto = nome, value = id), e a listagem de clientes mostrando o nome do barbeiro de cada um. Sem escolher o barbeiro o cadastro não é enviado.

Material de apoio: documentação Completa / dropdown.txt.



### AULA11: Tela de Agendamento: listar por data e atualizar a data

Datas: 3B 06/11 (sex, Marcos) | 3C 06/11 (sex, Marcos) | 3 aulas

Critério avaliativo:
[TELA] Listar os agendamentos ordenados por data (7.1)
[TELA] Atualizar a data de um agendamento (7.2)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam fazer agendamentos.html com a listagem ordenada por data trazendo todos os dados do barbeiro e do cliente, data formatada em português e, em cada linha, um campo de data com botão para atualizar a data do agendamento. Depois de atualizar, a lista recarrega já na nova ordem. Incluir também um formulário simples para cadastrar agendamento (com selects de barbeiro e cliente), útil para testar.

Material de apoio: documentação Completa / agendamentos.txt e dropdown.txt.



### AULA12: Fechamento do sistema, revisão com a lista de verificação e .zip

Datas: 3B 09/11 (seg, Paulo) | 3C 09/11 (seg, Marcos) | 3 aulas

Critério avaliativo:
Revisão dos 19 critérios (38 pontos)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes tenham o sistema completo funcionando de ponta a ponta e saibam entregar:
- Teste ponta a ponta: login, principal, barbeiro, cliente, agendamento e sair.
- Autoavaliação item a item pela lista de verificação, corrigindo o que ficou "Não".
- Montar a entrega: pasta compactada com o nome completo contendo documentacao.pdf, der.png, saep_db.sql e a pasta sistema.
- Desafio cronometrado: refazer a entrega 8 (agendamentos) do zero em 40 min, o tempo do caderno.



### AULA13: Ensaio cronometrado 1: entregas 1 a 5

Datas: 3B 11/11 (qua, Paulo) | 3C 10/11 (ter, Paulo) | 3 aulas

Critério avaliativo:
1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3 (17 pontos)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam, sem gabarito e sem internet (pode consultar a pasta de documentação), refazer nos tempos do caderno: documentação (15 min), DER (5 min), banco (20 min), login (20 min) e principal (20 min). Correção em duplas pela lista de verificação e levantamento dos erros mais comuns da turma.



### AULA14: Ensaio cronometrado 2: Barbeiro e Cliente, e orientações do simulado

Datas: 3B 12/11 (qui, Marcos) | 3C 11/11 (qua, Paulo) | 2 aulas

Critério avaliativo:
5.1, 5.2, 5.3, 5.4, 5.5 e 6.1 (16 pontos)

Resultado esperado da aula:
Ao final da aula se espera que os estudantes consigam refazer o gerenciamento de barbeiro (30 min) e de cliente (30 min) nos tempos do caderno e se autoavaliar pela lista.
Depois, orientações do dia 13/11: senha e porta do Postgres da máquina, node -v, REST Client, regras da prova (celular guardado, sem internet, ambientação, 3 horas, entrega compactada com o nome completo).



### SIMULADO: Avaliação diagnóstica da Barbearia

Datas: 3B 13/11 (sex, Marcos) | 3C 13/11 (sex, Marcos) | 3 aulas

Critério avaliativo:
Todos os 19 critérios (38 pontos)

Resultado esperado da aula:
Os estudantes fazem sozinhos a prova da barbearia, com as 8 entregas, e a correção é feita pela lista de verificação com justificativa de cada "Não". O resultado mostra, item por item, o que ainda precisa de reforço antes do SAEP.
OBS: a prova real tem 30 min de ambientação mais 3 horas. Com 3 aulas (~2h15) o simulado só cabe reduzido (por exemplo 10 min de ambientação mais 2 horas), a menos que a coordenação libere mais tempo.



### Mapa de cobertura dos critérios

| Critério | Peso | API | Tela | Revisão / ensaio |
|---|---|---|---|---|
| 1.1 Requisitos do sistema | 2 | | | Aulas 1, 13 |
| 1.2 Requisitos de infraestrutura | 1 | | | Aulas 1, 13 |
| 1.3 DER | 1 | | | Aulas 2, 13 |
| 2.1 Tabelas com chave estrangeira | 2 | | | Aulas 2, 13 |
| 2.2 Três registros por tabela | 1 | | | Aulas 2 (5 refaz com hash), 13 |
| 3.1 Login redireciona para a principal | 1 | Aula 5 | Aula 6 | Aula 13 |
| 3.2 Sessão com expiração | 3 | Aula 5 | Aula 7 | Aula 13 |
| 3.3 Validação de falha no login | 2 | Aula 5 | Aula 6 | Aula 13 |
| 4.1 Nome do usuário na principal | 2 | Aula 5 | Aula 7 | Aula 13 |
| 4.2 Sair do sistema | 1 | | Aula 7 | Aula 13 |
| 4.3 Acesso a Barbeiro, Cliente e Agendamento | 1 | | Aula 7 | Aula 13 |
| 5.1 Listar e excluir barbeiros | 2 | Aula 3 | Aula 8 | Aulas 9, 14 |
| 5.2 Busca | 3 | Aula 4 | Aula 9 | Aula 14 |
| 5.3 Cadastrar barbeiro | 2 | Aula 3 | Aula 8 | Aulas 9, 14 |
| 5.4 Criptografar senha e CPF | 3 | Aula 5 | Aula 8 | Aulas 9, 14 |
| 5.5 Editar barbeiro | 3 | Aula 3 | Aula 9 | Aula 14 |
| 6.1 Cliente associado a barbeiro | 3 | Aula 4 | Aula 10 | Aula 14 |
| 7.1 Agendamentos ordenados por data | 3 | Aula 4 | Aula 11 | Aula 12 |
| 7.2 Atualizar data do agendamento | 2 | Aula 4 | Aula 11 | Aula 12 |
