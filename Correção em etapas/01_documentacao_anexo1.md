# Etapa 1: Documentação de software (Anexo 1) - Correção

Entrega 1 da prova: `documentacao.pdf` (15 minutos na prova).

Critérios da lista de verificação cumpridos nesta etapa:

| Item | Evidência observável | Peso |
|---|---|---|
| 1.1 | Identificou no mínimo 4 requisitos do sistema conforme Anexo 1 | 2 |
| 1.2 | Identificou todos os requisitos de infraestrutura (SGBD e linguagem de programação) conforme Anexo 1 | 1 |

(O item 1.3, diagrama entidade relacionamento, é a etapa 2.)

---

## ANEXO 1 preenchido

**Estudante:** ______________________________
**Data:** 13/11/2026
**Número da prova:** ______________________________

### ENTREGA 01: Documentação de software

#### 1.1 Preencha a tabela dos requisitos funcionais do sistema

**Requisitos Funcionais do Sistema**

| ID | Requisito | Descrição |
|---|---|---|
| RF01 | Autenticar usuário | O sistema deve permitir que o usuário faça login informando o e-mail e a senha cadastrados no banco de dados e, se estiverem corretos, seja redirecionado para a funcionalidade principal. |
| RF02 | Validar falha de login | O sistema deve exibir uma mensagem de erro quando o e-mail ou a senha forem inválidos ou não forem preenchidos. |
| RF03 | Controlar sessão com expiração | O sistema deve manter o usuário autenticado por um tempo limitado e, depois que esse tempo expirar, exigir um novo login. |
| RF04 | Exibir funcionalidade principal | O sistema deve exibir o nome do usuário logado e uma forma de acessar as funcionalidades de barbeiro, cliente e agendamento. |
| RF05 | Sair do sistema | O sistema deve permitir que o usuário saia, encerrando a sessão e voltando para a tela de login. |
| RF06 | Gerenciar barbeiros | O sistema deve permitir cadastrar, listar, editar e excluir barbeiros, salvando as alterações no banco de dados. |
| RF07 | Buscar barbeiros | O sistema deve permitir que o usuário digite um termo (nome ou e-mail) e, ao confirmar, atualizar a listagem mostrando apenas os barbeiros que correspondem ao termo. |
| RF08 | Proteger dados do barbeiro | O sistema deve armazenar o CPF e a senha dos barbeiros de forma criptografada no banco de dados, em conformidade com a LGPD. |
| RF09 | Cadastrar cliente associado a um barbeiro | O sistema deve permitir cadastrar um cliente, exigindo que ele seja associado a um barbeiro. |
| RF10 | Listar agendamentos por data | O sistema deve exibir os agendamentos cadastrados ordenados pela data, trazendo todos os dados do barbeiro e do cliente de cada agendamento. |
| RF11 | Atualizar data do agendamento | O sistema deve permitir alterar a data de um agendamento já cadastrado, salvando a alteração no banco de dados. |
| RF12 | Cadastrar agendamento | O sistema deve permitir cadastrar um agendamento informando data, serviço, barbeiro e cliente. |

#### 1.2 Preencha os requisitos de infraestrutura

| Campo | Resposta |
|---|---|
| SGBD Utilizado | PostgreSQL |
| Versão | 17 |
| Linguagem de Programação | JavaScript (executado com Node.js) |
| Versão | ES6 |

---

## Linha de raciocínio para destrinchar com os estudantes

A ideia é que o estudante nunca "invente" requisito: cada linha da tabela nasce de uma frase do caderno de prova.

### Passo 0. O que o avaliador vai conferir

- 1.1: pelo menos **4 requisitos funcionais** na tabela, que combinem com o que o caderno pede.
- 1.2: **os quatro campos** de infraestrutura preenchidos (SGBD, versão, linguagem, versão). Campo em branco = "Não".

Pergunta para a turma: "Quantos requisitos eu preciso para pontuar? E quantos eu consigo escrever em 15 minutos?"
Resposta: o mínimo são 4, o ideal são 6 a 8. A lista completa acima (12) é o gabarito do professor, não o que se espera do aluno.

### Passo 1. Ler a contextualização e responder "qual é o problema?"

Trecho do caderno: *"O controle manual dos agendamentos e dos registros de barbeiros e clientes tem ocasionado perda de horários, duplicidade de informações... a ausência de mecanismos adequados de proteção dos dados pessoais dos barbeiros, como o CPF..."*

- Problema 1: controle manual de agendamentos, barbeiros e clientes. Então o sistema precisa **cadastrar e gerenciar** essas três coisas.
- Problema 2: dados pessoais sem proteção (LGPD). Então o sistema precisa **proteger o CPF**.
- Na reunião o gestor pediu **autenticação com tempo de expiração**. Então o sistema precisa de **login e sessão que vence**.

Resultado: já saem os primeiros requisitos (RF01, RF03, RF06, RF08).

### Passo 2. Descobrir as "coisas" e quem usa o sistema

- Quem usa: o usuário que faz login (recepção ou gestor).
- Do que o sistema cuida: **barbeiro, cliente, agendamento** (e o usuário, para o login).

Pergunta para a turma: "Se eu sou o usuário, o que eu faço quando abro o sistema?" Resposta em ordem: entro com login, vejo a tela principal, vou para barbeiros, clientes e agendamentos, e saio. Essa é a **ordem da tabela**.

### Passo 3. Transformar cada regra de negócio em requisito

Sublinhar as 7 regras de negócio do caderno e, para cada uma, perguntar "o que o sistema precisa FAZER para cumprir isso?":

| Regra de negócio do caderno | O que o sistema faz | Vira |
|---|---|---|
| Script do banco com pelo menos 3 registros por tabela, respeitando tipos, chaves primárias e estrangeiras | Isso não é algo que o usuário usa. É uma exigência do **banco de dados** | **Não entra na tabela de requisitos.** Vai para a entrega 3 (`saep_db.sql`, critérios 2.1 e 2.2) |
| Login com validação em caso de falha | Entra com e-mail e senha e é avisado quando erra | RF01 e RF02 |
| CPF dos barbeiros criptografado no banco | Guarda CPF (e senha) sem texto puro | RF08 |
| Principal exibe nome do usuário, forma de acessar os recursos e forma de sair | Mostra o nome, tem menu e tem botão sair | RF04 e RF05 |
| Barbeiro com busca por termo e edição | Busca, atualiza a lista, edita e salva | RF07 e RF06 |
| Agendamento listado por dia com dados do barbeiro e do cliente, e atualização da data | Lista ordenada e altera a data | RF10 e RF11 |
| Ao cadastrar cliente, associar a um barbeiro | Cliente só é cadastrado com barbeiro | RF09 |

E de onde saem os que não estão nas regras?
- **RF03** (sessão com expiração): vem da conversa com o gestor, no texto da contextualização ("autenticação dos usuários com tempo de expiração").
- **RF06** completo (cadastrar, listar, editar, excluir) e **RF12** (cadastrar agendamento): vêm do **Desafio** ("cadastro e gerenciamento de barbeiros, clientes e agendamentos").

### Passo 4. Escrever cada requisito com uma fórmula

> **"O sistema deve" + verbo + o que + (condição).**
> Verbos úteis: permitir, exibir, validar, armazenar, listar.

- **Requisito:** nome curto, 2 a 4 palavras ("Buscar barbeiros").
- **Descrição:** uma frase completa dizendo o que o sistema faz.

| Fraco | Bom |
|---|---|
| "Tela de barbeiro" (é um lugar, não um comportamento) | "O sistema deve permitir cadastrar, listar, editar e excluir barbeiros." |
| "Usar bcrypt" (é tecnologia) | "O sistema deve armazenar o CPF e a senha de forma criptografada." |
| "Login" (sem dizer o que faz) | "O sistema deve permitir login com e-mail e senha cadastrados e redirecionar para a principal." |

### Passo 5. Separar o que é requisito funcional do que é tecnologia

- Requisito funcional = o que o **usuário** vê ou faz. Descreva sem citar ferramenta.
- Não escreva "Fastify", "JWT", "bcrypt", "fetch" ou "localStorage" na descrição. Isso é como o sistema é construído, não o que ele faz.
- "Criptografado" pode aparecer, porque está na regra de negócio do caderno.
- Banco e linguagem têm lugar próprio: o item 1.2.

### Passo 6. Numerar na ordem do fluxo do usuário

RF01, RF02, RF03... na ordem em que a pessoa usa o sistema: login, principal, sair, barbeiro, cliente, agendamento. Assim a tabela fica fácil de conferir e de ler.

### Passo 7. Conferir o que a tabela cobre da prova

Cada requisito tem um "irmão" na lista de verificação. Por isso a documentação é o mapa do que será construído:

| Requisito | Vai ser cobrado em |
|---|---|
| RF01 Autenticar usuário | 3.1 |
| RF02 Validar falha de login | 3.3 |
| RF03 Controlar sessão com expiração | 3.2 |
| RF04 Exibir funcionalidade principal | 4.1 e 4.3 |
| RF05 Sair do sistema | 4.2 |
| RF06 Gerenciar barbeiros | 5.1, 5.3 e 5.5 |
| RF07 Buscar barbeiros | 5.2 |
| RF08 Proteger dados do barbeiro | 5.4 |
| RF09 Cadastrar cliente associado a um barbeiro | 6.1 |
| RF10 Listar agendamentos por data | 7.1 |
| RF11 Atualizar data do agendamento | 7.2 |
| RF12 Cadastrar agendamento | apoio para testar 7.1 e 7.2 |

Pergunta para a turma: "Se eu esquecer um requisito aqui, o que acontece depois?" Resposta: nada na nota de 1.1, mas fica sem plano para o item correspondente na hora de programar.

### Passo 8. Preencher a infraestrutura (item 1.2)

Perguntar "o que a gente está usando de verdade?" e **conferir na máquina**:

| Campo | Pergunta | Como conferir | Resposta |
|---|---|---|---|
| SGBD | Qual banco guarda os dados? | pgAdmin | PostgreSQL |
| Versão | Qual versão? | Query Tool: `SELECT version();` | 17 |
| Linguagem | Em que linguagem fazemos a API e as telas? | package.json (Node) e as páginas `.html` com `.js` | JavaScript (executado com Node.js) |
| Versão | Qual versão? | Padrão da linguagem: ES6. A do Node aparece com `node -v` | ES6 |

Atenção: se a máquina da prova tiver outra versão do Postgres, **escreva a que a máquina mostra**. A resposta certa é a que o `SELECT version();` devolve.

### Passo 9. Revisar e exportar

Checklist do aluno antes de salvar:

- [ ] A tabela tem pelo menos 4 requisitos (idealmente 6 a 8).
- [ ] Cada descrição começa com "O sistema deve" e é uma frase completa.
- [ ] Nenhum requisito cita ferramenta ou tecnologia.
- [ ] Nenhum requisito está repetido.
- [ ] Os quatro campos da infraestrutura estão preenchidos.
- [ ] Nome do estudante e data preenchidos no topo.
- [ ] Salvo em PDF com o nome exato `documentacao.pdf` (Word ou LibreOffice: Arquivo > Salvar como > PDF).

### Divisão do tempo (15 minutos na prova)

| Tempo | O que fazer |
|---|---|
| 3 min | Ler as regras de negócio e sublinhar |
| 8 min | Escrever 6 a 8 requisitos (fórmula do passo 4) |
| 2 min | Infraestrutura (conferir `SELECT version();`) |
| 2 min | Revisar e salvar em PDF |

Se o tempo apertar, escreva primeiro os 4 mais seguros, que estão escritos quase palavra por palavra no caderno: **RF01** (login), **RF04** (principal), **RF07** (busca) e **RF10** (agendamentos por data).

---

## Como o professor corrige

| Item | "Sim" quando | "Não" quando |
|---|---|---|
| 1.1 | A tabela do Anexo 1 tem 4 ou mais requisitos **funcionais** que fazem sentido com o caderno | Menos de 4; tabela em branco; só tecnologia ("usar Node", "usar Postgres"); requisitos repetidos ou que não têm relação com a prova |
| 1.2 | SGBD, versão, linguagem e versão **todos** preenchidos | Qualquer campo em branco, ou no lugar de um campo algo que não é SGBD/linguagem |

Observação para a justificativa do "Não": anotar qual campo faltou ou quantos requisitos válidos havia.

## Erros comuns dos estudantes

- Copiar uma regra de negócio inteira como se fosse requisito (fica longo e sem o "O sistema deve").
- Escrever só o nome da tela ("Tela de login", "Tela de barbeiro") sem dizer o que ela faz.
- Colocar tecnologia como requisito funcional ("Usar JWT", "Banco PostgreSQL").
- Tentar colocar a regra dos 3 registros por tabela na tabela de requisitos.
- Deixar a versão em branco por não saber qual é: o `SELECT version();` resolve em 10 segundos.
- Escrever o nome do arquivo errado ao exportar (precisa ser `documentacao.pdf`).
