let jogoComecou = false;
let nivel = 1;
let cores = ['verde', 'vermelho', 'azul', 'amarelo'];
let listaDeCoresDoJogo = [];
let listaDeCoresDoJogador = [];
//AÇÕES EXECUTADAS AO APERTAR ENTER OU A OU S OU Z PU X
document.addEventListener('keydown', function(event){
    if (event.key == 'Enter') {
        iniciarJogo();
    }

    switch(event.key) {
        case 'a':
            if(jogoComecou){
            animacaoCliqueDoBotao('verde');
            listaDeCoresDoJogador.push('verde')
            checarResposta();
            }
            break;
        case 's':
            if(jogoComecou){
            animacaoCliqueDoBotao('vermelho');
            listaDeCoresDoJogador.push('vermelho')
            checarResposta();
            }
            break;
        case 'z':
            if(jogoComecou){
            animacaoCliqueDoBotao('amarelo');
            listaDeCoresDoJogador.push('amarelo')
            checarResposta();
            }
            break;
        case 'x':
            if(jogoComecou){
            animacaoCliqueDoBotao('azul');
            listaDeCoresDoJogador.push('azul')
            checarResposta();
            }
            break;
    }
});

document.querySelectorAll('.botao').forEach(function(botao){
    botao.addEventListener('click', function(){
        if(jogoComecou){
            const corDoBotaoClicado = botao.getAttribute('id');
            listaDeCoresDoJogador.push(corDoBotaoClicado);
            checarResposta();
            animacaoCliqueDoBotao(corDoBotaoClicado);
        }
    });
});

document.getElementById('clickAqui').addEventListener('click', function(){
    iniciarJogo();
})

function animacaoCliqueDoBotao(corDoBotaoClicado) {
    tocarSom(corDoBotaoClicado);
     animacaoBotaoClicado(corDoBotaoClicado);
}

function tocarSom(cor) {
    const audio = new Audio('sons/'+ cor + '.mp3');
    audio.play();
}
function animacaoBotaoClicado(cor){
    document.querySelector('#' + cor).classList.add('botaoApertado');
    setTimeout(function(){
        document.querySelector('#' + cor).classList.remove('botaoApertado');
    }, 200);
}

function iniciarJogo(){
    jogoComecou = true;
    document.getElementById('clickAqui').classList.add('esconder');
    proximoNivelDoJogo();
}

function proximoNivelDoJogo() {
    const numeroAleatorio = Math.floor(Math.random() * 4);
    const corAleatoria = cores[numeroAleatorio];
    listaDeCoresDoJogo.push(corAleatoria);
    setTimeout(function(){
        document.getElementById('nivel').textContent = 'Nivel ' + nivel;
    piscarCoresDoJogo();
    }, 1000);
}

function piscarCoresDoJogo() {
    for (let i = 0;i < listaDeCoresDoJogo.length; i++){
        setTimeout(function(){
            animacaoCliqueDoBotao(listaDeCoresDoJogo[i]);
        }, 500 * i);
    }
}

function checarResposta(){
    const posicaoAtual = listaDeCoresDoJogador.length -1;
    if (listaDeCoresDoJogo[posicaoAtual] === listaDeCoresDoJogador[posicaoAtual]) {
        if(listaDeCoresDoJogador.length === listaDeCoresDoJogo.length){
            nivel++
            proximoNivelDoJogo();
            listaDeCoresDoJogador = [];
            }
        }
    else{
        finalizarJogo();
    }
}

function finalizarJogo(){
    nivel = 1;
    listaDeCoresDoJogador = [];
    listaDeCoresDoJogo = [];
    tocarSom('errado');
    document.querySelector('.fundoRosa').classList.add('vermelho');
    setTimeout(function(){
        document.querySelector('.fundoRosa').classList.remove('vermelho');
    }, 300);
    document.getElementById('nivel').textContent = 'Aperte ENTER para começar';
    document.getElementById('clickAqui').classList.remove('esconder');
    jogoComecou = false;
}