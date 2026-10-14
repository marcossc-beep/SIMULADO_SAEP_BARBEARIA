Na pasta documentações tem as documentações das ferramentas. Não alterem nem apaguem essa pasta.

Extensões: Lembrem-se de verificar se a extensão REST Client está ativa no VS Code e salvem todos os arquivos nos locais corretos.

# Simulado SAEP 2026 - Barbearia

Stack da prova: Node.js + Fastify + PostgreSQL 17, com bcrypt (senha e CPF) e JWT (sessão com expiração).

Ordem sugerida das entregas (mesma ordem do caderno de prova):

1. documentacao.pdf (Anexo 1: requisitos funcionais + SGBD e linguagem com versões)
2. der.png ou der.pdf (gerado no pgAdmin: botão direito no banco > ERD For Database)
3. saep_db.sql (CREATE TABLE + mínimo 3 INSERT por tabela)
4. Login (com validação e sessão com tempo de expiração)
5. Principal (nome do usuário, menu para Barbeiro/Cliente/Agendamento e Sair)
6. Barbeiro (listar, buscar, cadastrar, editar, excluir, CPF e senha criptografados)
7. Cliente (cadastrar associando a um barbeiro)
8. Agendamento (listar ordenado por data com dados do barbeiro e do cliente, atualizar a data)

Comandos:

    npm install
    npm start

Antes de compactar o projeto no final da prova, você deve renomear a pasta principal do repositório seguindo estritamente este padrão:

# nome_sobrenome (Exemplo: marcos_coelho)

Estrutura final do .zip:

    nome_sobrenome.zip
    ├── documentacao.pdf
    ├── der.png
    ├── saep_db.sql
    └── sistema/
        ├── package.json
        ├── server.js
        ├── referencias.http
        └── front/ (index.html, principal.html, barbeiros.html, clientes.html, agendamentos.html, sessao.js, estilo.css)
