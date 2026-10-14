# Caderno de prova (resumo) e lista de verificação - Simulado Barbearia

## Contexto
Uma barbearia perde horários e duplica informações por controlar agendamentos, barbeiros e
clientes à mão, e não protege dados pessoais dos barbeiros (CPF), arriscando a LGPD. O gestor
quer autenticação com tempo de expiração, proteção dos dados pessoais e documentação técnica
(requisitos funcionais e DER).

## Regras de negócio
- Script do banco com pelo menos 3 registros em todas as tabelas, respeitando tipos, PK e FK.
- Login com validação em caso de falha na autenticação.
- CPF dos barbeiros armazenado criptografado.
- Principal exibe nome do usuário logado, acesso aos demais recursos e forma de sair.
- Barbeiro: busca por termo (inserir, confirmar, listagem atualiza) e edição salvando no banco.
- Agendamento: listagem ordenada por dia, com todos os dados do barbeiro e do cliente;
  atualizar a data de um agendamento salvando no banco.
- Ao cadastrar um cliente, associá-lo a um barbeiro.

## Entregas (tempo estimado do caderno)
1. documentacao.pdf (Anexo 1) - 15 min
2. der.png ou der.pdf - 5 min
3. saep_db.sql - 20 min
4. Login - 20 min
5. Principal - 20 min
6. Gerenciamento Barbeiro - 30 min
7. Gerenciamento Cliente - 30 min
8. Gerenciamento Agendamentos - 40 min
Itens 4 a 8 ficam na pasta "sistema". Tudo compactado com o nome completo do aluno.

## Lista de verificação (capacidade · peso)
| Item | Evidência observável | Cap. | Peso |
|---|---|---|---|
| 1.1 | Identificou no mínimo 4 requisitos do sistema conforme Anexo 1 | C1 | 2 |
| 1.2 | Identificou todos os requisitos de infraestrutura (SGBD e linguagem) conforme Anexo 1 | C1 | 1 |
| 1.3 | Gerou o diagrama entidade relacionamento | C4 | 1 |
| 2.1 | Criou as tabelas respeitando a chave estrangeira de cada relacionamento | C4 | 2 |
| 2.2 | Inseriu pelo menos três registros em cada tabela | C4 | 1 |
| 3.1 | Autenticação redireciona para o módulo principal com login e senha do banco | C7 | 1 |
| 3.2 | Sessão do usuário autenticado com tempo de expiração | C7 | 3 |
| 3.3 | Validação (front ou back) em caso de falha de autenticação | C3 | 2 |
| 4.1 | Nome do usuário autenticado exibido na principal | C7 | 2 |
| 4.2 | Meio para sair do sistema | C3 | 1 |
| 4.3 | Acesso a "Barbeiro", "Cliente" e "Agendamento" a partir da "Principal" | C7 | 1 |
| 5.1 | Listar e excluir barbeiros | C7 | 2 |
| 5.2 | Busca com no mínimo um termo | C3 | 3 |
| 5.3 | Inserção de novo barbeiro com persistência | C7 | 2 |
| 5.4 | Criptografar pelo menos a senha e o CPF do barbeiro | C7 | 3 |
| 5.5 | Editar barbeiro existente | C7 | 3 |
| 6.1 | Inserir novo cliente associando-o a um barbeiro | C7 | 3 |
| 7.1 | Listar agendamentos ordenados por data | C3 | 3 |
| 7.2 | Atualizar a data de um agendamento | C7 | 2 |
Total: 38 pontos.

## Mapeamento com a prova original (clínica veterinária)
Tutor -> Barbeiro · Pet -> Cliente · Agendamento -> Agendamento · Usuário -> Usuário.
