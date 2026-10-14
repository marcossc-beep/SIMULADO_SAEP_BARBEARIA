---
name: saep-barbearia-aula
description: Monta o roteiro de live coding de uma aula do simulado SAEP 2026 Barbearia (turmas 3B e 3C, professores Marcos e Paulo, Node + Fastify + PostgreSQL 17, bcrypt e JWT). Use quando o usuário passar o dia da aula, a turma, o número da aula ou o título/descrição/critérios avaliativos e pedir o passo a passo da aula, roteiro, plano de aula ou live coding do SAEP/barbearia.
---

# Roteiro de live coding - Simulado SAEP 2026 Barbearia

O professor informa a aula de um destes jeitos (qualquer combinação serve):
- data e turma ("quinta 22/10, 3B")
- número da aula ("aula 7")
- título, descrição e critérios avaliativos copiados do cronograma

Seu trabalho: devolver um roteiro pronto para o professor projetar e codar ao vivo,
cumprindo exatamente os critérios da lista de verificação daquela aula.

## Arquivos de referência (leia antes de escrever)

- `references/aulas.md` - as 14 aulas + simulado: datas por turma, professor, duração,
  critérios, o que já existe no projeto ANTES da aula e o que deve existir DEPOIS.
- `references/criterios.md` - lista de verificação adaptada (19 itens, 38 pontos) e
  o caderno de prova resumido (contexto + regras de negócio + entregas).
- `references/gabarito/` - código final testado. É a fonte da verdade do código:
  `saep_db.sql`, `sistema/server.js`, `sistema/referencias.http`, `sistema/front/*`.
  Use os MESMOS nomes de tabelas, colunas, rotas, ids de HTML e funções do gabarito,
  para que uma aula encaixe na outra mesmo com professores diferentes.

## Passo 1 - Identificar a aula

1. Ache a aula em `references/aulas.md` pela data+turma, pelo número ou pelo título.
2. Se o professor mandou título/descrição/critérios diferentes do arquivo, os dele valem;
   use o arquivo só para saber o estado do projeto antes e depois.
3. Duração útil: dia de 3 aulas = ~120 min de live coding; dia de 2 aulas = ~75 min
   (já descontados ~15 min de chamada). Ajuste o tamanho do roteiro a isso.
4. Se não der para identificar a aula, pergunte qual é (uma pergunta só).

## Passo 2 - Escrever o roteiro

Gere em português, neste formato, e salve como `roteiro_aula_XX_TURMA.md` no diretório
de trabalho atual (ex.: `roteiro_aula_07_3B.md`). Depois mostre o roteiro na resposta.

```
# Aula XX - <título>
Turma <3B/3C> · <data> · Prof. <nome> · <2 ou 3 aulas>

## Objetivo da aula
Uma frase do que os alunos terão funcionando no fim.

## Critérios avaliativos cumpridos hoje
| Item | Evidência observável | Peso | Como vamos provar em aula |

## Antes de começar (5 min)
- Estado esperado do projeto (o que veio da aula anterior) e como conferir rápido.
- O que abrir: VS Code, pgAdmin, terminal com npm start, REST Client, navegador.
- Plano B se algum aluno não tem a aula anterior: qual arquivo do gabarito entregar.

## Linha do tempo
| Minuto | Bloco | O que acontece |
(blocos de 10 a 25 min, somando a duração útil)

## Live coding passo a passo
Para cada passo:
### Passo N - <nome curto> (≈ X min)
- **Fala/explicação**: 1 a 3 frases simples, com analogia quando ajudar.
- **Arquivo**: caminho exato (ex.: sistema/server.js).
- **Código**: o trecho a digitar AGORA, incremental (só o que é novo neste passo),
  igual ao gabarito. Nunca cole o arquivo inteiro de uma vez.
- **Testar**: comando, requisição do referencias.http ou clique na tela + resultado esperado.
- **Pergunta para a turma**: uma pergunta que verifique entendimento.

## Erros comuns e como resolver
3 a 6 erros reais desta etapa (mensagem de erro + causa + correção).

## Checagem final com a lista de verificação
Cada critério do dia com um "Sim" comprovável: o que o avaliador olharia.

## Fechamento e tarefa
- O que o aluno deve deixar salvo/commitado.
- Desafio curto opcional para quem terminou antes.
- O que a próxima aula assume que está pronto (puxar de references/aulas.md).
```

## Regras

- Código sempre igual ao gabarito (Fastify, `pg` com `sql.query` e `$1`, bcrypt com custo
  10, `@fastify/jwt` com `expiresIn: '30m'`, front em HTML + JS puro com `sessao.js`).
- Sem variáveis de ambiente / dotenv: segredo do JWT e dados do banco ficam no código
  (não é critério avaliativo). Lembre o aluno de ajustar senha/porta do Postgres da máquina.
- Explique ligando ao critério: sempre que um passo garante um item, diga qual (ex.: "isso é o 5.4, peso 3").
- Linguagem para alunos de ensino médio técnico: frases curtas, sem jargão sem explicação.
- Em ensaios cronometrados (aulas 13 e 14) o roteiro vira condução de prova: tempos,
  regras, o que o professor observa, gabarito para a correção em duplas.
- Para o simulado (13/11) gere o roteiro do avaliador: preparação das máquinas,
  leitura das orientações, controle de tempo e correção pela lista de verificação.
- Não invente critérios novos nem mude nomes de tabelas/rotas.
