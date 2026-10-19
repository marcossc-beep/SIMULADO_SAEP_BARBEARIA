const API = 'http://localhost:6767'

// usuário que fez login (o login guarda no localStorage)
function pegarUsuario () {
    return JSON.parse(localStorage.getItem('usuario'))
}

// a sessão vale enquanto existir token e a hora de expiração ainda não passou
function sessaoValida () {
    const token = localStorage.getItem('token')
    const expira = Number(localStorage.getItem('expira'))
    return token && Date.now() < expira
}

// sair do sistema: apaga a sessão e volta para o login
function sair (mensagem) {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('expira')
    if (mensagem) alert(mensagem)
    window.location.href = 'index.html'
}

// colocar no começo de toda página que precisa de login
function protegerPagina () {
    if (!sessaoValida()) {
        sair('Sessão expirada. Faça login novamente.')
    }
}

// o fetch de sempre, só que já manda o token. Se a API responder 401, a sessão acabou.
async function api (caminho, metodo = 'GET', corpo) {
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
        // a sessão acabou e a página volta para o login: o código que chamou o api() para por aqui
        return new Promise(() => {})
    }

    return dados
}
