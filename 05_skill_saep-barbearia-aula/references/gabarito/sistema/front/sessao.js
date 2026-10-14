// =====================================================================
// sessao.js - funções usadas por TODAS as páginas do sistema
// =====================================================================

const API = 'http://localhost:3000'

// Usuário logado salvo no navegador (ou null)
function pegarUsuario() {
    return JSON.parse(localStorage.getItem('usuario'))
}

// A sessão é válida se existe token e o horário de expiração ainda não passou
function sessaoValida() {
    const token = localStorage.getItem('token')
    const expira = Number(localStorage.getItem('expira'))
    return token && Date.now() < expira
}

// Sai do sistema: apaga tudo e volta para o login
function sair(mensagem) {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('expira')
    if (mensagem) alert(mensagem)
    window.location.href = 'index.html'
}

// Colocar no topo de toda página que precisa de login
function protegerPagina() {
    if (!sessaoValida()) {
        sair('Sessão expirada. Faça login novamente.')
    }
}

// fetch já com o token. Se a API responder 401 a sessão acabou.
async function api(caminho, metodo = 'GET', corpo) {
    const opcoes = {
        method: metodo,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }

    if (corpo) {
        opcoes.headers['Content-Type'] = 'application/json'
        opcoes.body = JSON.stringify(corpo)
    }

    const resposta = await fetch(API + caminho, opcoes)
    const dados = await resposta.json()

    if (resposta.status === 401) {
        sair(dados.message)
    }

    return dados
}

// Mostra a data do banco no formato brasileiro
function formatarData(data) {
    return new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}
