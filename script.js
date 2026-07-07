//========================
// WEREWORDS
//========================

document.getElementById("novoJogo").onclick = function() {
    location.reload();
};

const tela = document.getElementById("conteudo");

let palavraEscolhida = "";
let palavrasSorteadas = [];
let timer;
let tempo = 240;

//------------------------
// NARRAÇÃO
//------------------------

function falar(texto, callback){

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "pt-BR";
    voz.rate = 1;
    voz.pitch = 1;

    voz.onend = () => {

        if(callback) callback();

    }

    speechSynthesis.speak(voz);

}

//------------------------
// UTIL
//------------------------

function embaralhar(lista){

    return [...lista].sort(()=>Math.random()-0.5);

}

function mostrar(html){

    tela.classList.remove("fade");

    void tela.offsetWidth;

    tela.classList.add("fade");

    tela.innerHTML = html;

}

let dificuldade = "medio";

let palavras = [];

function montarBanco(){

    palavras = [];

    Object.values(bancoPalavras).forEach(categoria=>{

        palavras.push(...categoria);

    });

}

function pegarPalavrasPorDificuldade(){

    let facil = [];
    let medio = [];
    let dificil = [];


    Object.values(bancoPalavras).forEach(categoria=>{

        facil.push(...categoria.facil);

        medio.push(...categoria.medio);

        dificil.push(...categoria.dificil);

    });


    return {
        facil,
        medio,
        dificil
    };

}

function sortear4(){

    const banco = pegarPalavrasPorDificuldade();

    console.log(banco);

    let lista=[];


    if(dificuldade==="muitoFacil"){

        lista=[
            ...embaralhar(banco.facil).slice(0,4)
        ];

    }


    if(dificuldade==="facil"){

        lista=[
            ...embaralhar(banco.facil).slice(0,2),
            ...embaralhar(banco.medio).slice(0,2)
        ];

    }


    if(dificuldade==="medio"){

        lista=[
            ...embaralhar(banco.medio).slice(0,4)
        ];

    }


    if(dificuldade==="dificil"){

        lista=[
            ...embaralhar(banco.medio).slice(0,2),
            ...embaralhar(banco.dificil).slice(0,2)
        ];

    }


    if(dificuldade==="extremo"){

        lista=[
            ...embaralhar(banco.dificil).slice(0,4)
        ];

    }


    palavrasSorteadas = embaralhar(lista);

}

//------------------------
// TELA INICIAL
//------------------------

inicio();

function trocarDificuldade(){

    const niveis = [
        "muitoFacil",
        "facil",
        "medio",
        "dificil",
        "extremo"
    ];

    let atual = niveis.indexOf(dificuldade);

    atual++;

    if(atual >= niveis.length){
        atual = 0;
    }

    dificuldade = niveis[atual];


    document.getElementById("dificuldade").innerHTML =
        "DIFICULDADE: " + dificuldade.toUpperCase();

}

function inicio(){

    clearInterval(timer);

    mostrar(`

        <button id="iniciar">
            INICIAR PARTIDA
        </button>

        <button id="dificuldade">
            DIFICULDADE: ${dificuldade.toUpperCase()}
        </button>

    `);


    document
    .getElementById("iniciar")
    .onclick = dormirTodos;


    document
    .getElementById("dificuldade")
    .onclick = trocarDificuldade;

}

//------------------------
// TODOS DORMEM
//------------------------

function dormirTodos(){

    mostrar(`

        <h2>😴</h2>

        <h2>Todos fechem os olhos</h2>

    `);


    falar("Todos fechem os olhos.");


    setTimeout(prefeitoAcorda,2500);

}
//------------------------
// PREFEITO
//------------------------

function prefeitoAcorda(){

    sortear4();

    mostrar(`

        <h2>👑 Prefeito</h2>

        <p>Escolha uma palavra</p>

        <div class="listaPalavras">

            ${palavrasSorteadas.map(p=>`

                <div class="palavra">

                    ${p}

                </div>

            `).join("")}

        </div>

    `);

    falar("Prefeito, acorde e escolha uma palavra.");

    document
        .querySelectorAll(".palavra")
        .forEach((botao,i)=>{

            botao.onclick=()=>{

                confirmar(palavrasSorteadas[i]);

            }

        });

}

//------------------------
// CONFIRMAR
//------------------------

function confirmar(palavra){

    mostrar(`

        <h2>Confirmar?</h2>

        <div class="caixaPalavra">

            ${palavra}

        </div>

        <button id="confirmar">

            CONFIRMAR

        </button>

    `);

    document
        .getElementById("confirmar")
        .onclick=()=>{

            palavraEscolhida=palavra;

            prefeitoDorme();

        }

}

//------------------------
// PREFEITO DORME
//------------------------

function prefeitoDorme(){

    mostrar(`

        <h2>😴</h2>

        <h2>Prefeito feche os olhos</h2>

    `);

    falar("Prefeito, feche os olhos.",()=>{

        setTimeout(lobisomem,2000);

    });

}

//------------------------
// LOBISOMEM
//------------------------

function lobisomem(){

    mostrar(`

        <h2>🐺 LOBISOMEM</h2>

        <div class="caixaPalavra">

            ${palavraEscolhida}

        </div>

    `);

    falar("Lobisomem, acorde.");

    setTimeout(lobisomemDorme,4000);

}

//------------------------
// LOBISOMEM DORME
//------------------------

function lobisomemDorme(){

    mostrar(`

        <h2>😴</h2>

        <h2>Lobisomem feche os olhos</h2>

    `);

    falar("Lobisomem, feche os olhos.",()=>{

        setTimeout(vidente,2000);

    });

}

//------------------------
// VIDENTE
//------------------------

function vidente(){

    mostrar(`

        <h2>🔮 VIDENTE</h2>

        <div class="caixaPalavra">

            ${palavraEscolhida}

        </div>

    `);

    falar("Vidente, acorde.");

    setTimeout(videnteDorme,4000);

}

//------------------------
// VIDENTE DORME
//------------------------

function videnteDorme(){

    mostrar(`

        <h2>😴</h2>

        <h2>Vidente feche os olhos</h2>

    `);

    falar("Vidente, feche os olhos.",()=>{

        setTimeout(todosAcordam,1200);

    });

}

//------------------------
// TODOS ACORDAM
//------------------------

function todosAcordam(){

    tempo = 240;

    mostrar(`

        <h2>🌞 TODOS ACORDEM</h2>

        <div id="timer" class="timer">

            04:00

        </div>

    `);

    falar("Todos acordem.");

    iniciarTimer();

}

//------------------------
// TIMER
//------------------------

function iniciarTimer(){

    clearInterval(timer);

    atualizarTimer();

    timer = setInterval(()=>{

        tempo--;

        atualizarTimer();

        if(tempo <= 0){

            finalizarTimer();

        }

    },1000);

}

//------------------------
// ATUALIZAR TIMER
//------------------------

function atualizarTimer(){

    const minutos = Math.floor(tempo/60);
    const segundos = tempo%60;

    const visor = document.getElementById("timer");

    if(!visor) return;

    visor.textContent =
        String(minutos).padStart(2,"0") +
        ":" +
        String(segundos).padStart(2,"0");

    if(tempo <= 60){

        visor.classList.add("vermelho");
        visor.classList.add("pulse");

    }

}

//------------------------
// FIM DO TEMPO
//------------------------

function finalizarTimer(){

    clearInterval(timer);

    mostrar(`

        <h2 class="grande vermelho pulse">

            TEMPO ESGOTADO

        </h2>

        <button id="novo">

            NOVA PARTIDA

        </button>

    `);

    falar("O tempo acabou.");

    document
        .getElementById("novo")
        .onclick=inicio;

}