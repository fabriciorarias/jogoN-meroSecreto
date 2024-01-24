// let titulo = document.querySelector ("h1");
// titulo.innerHTML = "Jogo do Número Secreto";

// let paragrafo = document.querySelector ("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 100:";

//códigos comentados condensados na função exibirTextoNaTela.

let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;


function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, "Brazilian Portuguese Female", {rate:1.2});
}
function exibirMensagemInicial () {
    exibirTextoNaTela ("h1", "Jogo do Número Secreto");
    exibirTextoNaTela ("p", "Escolha um número entre 1 e 10:")
}

exibirMensagemInicial()

function gerarNumeroAleatorio () {

    let numeroEscolhido = parseInt(Math.random () * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio ();
    } else {
        listaNumerosSorteados.push (numeroEscolhido);
        console.log (listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function verificarChute () { //a função onclick deve ser específicada no html
    let chute = document.querySelector ("input").value  // .value funciona para pegar somente um valor, ou no caso, número inserido
    //console.log (chute == numeroSecreto)    // = refer-se somente a relação, quando usamos ==, =>, etc... efetuamos uma comparação

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Parabéns, você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ("h1", "Acertou!");
        exibirTextoNaTela ("p", mensagemTentativas);

        document.getElementById ("reiniciar").removeAttribute ("disabled"); //sempre começando com document.(...) pq os dados estão no html

        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela ("p", "O número secreto é menor!")
            } else {
                exibirTextoNaTela ("p", "O número secreto é maior!")
            }
            tentativas++ // mesmo que "tentativas = tentativas + 1"
            limparCampo ()
        }
    }

function limparCampo () {
    chute = document.querySelector ("input");    //vincula o chute ao input
    chute.value = "";    //determina que o value do input será apagado ou "vazio"
}

function reiniciarJogo () {
    limparCampo ();
    numeroSecreto = gerarNumeroAleatorio ();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
