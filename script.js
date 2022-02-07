// Iniciando o jogo -- recebendo quantidade de cartas 

let qteCartas = 0;

while (qteCartas < 4 || qteCartas > 14 || qteCartas % 2 != 0) {
    qteCartas = parseInt(prompt("Com quantas cartas quer jogar? Escolha um número par entre 4 e 14!"));
}

// Criando o html de acordo com a qte de cartas escolhidas na inicialização pelo jogador

let qteCartasJogo = "";

for (let i = 0; i < qteCartas; i++) {
    qteCartasJogo += `<div id =carta${i} class="card" onclick="clicar(this)" data-identifier="card">
                            <div class="front-face face" data-identifier="back-face">
                            <img src='imagens/front 1.png' alt='Frente da carta - papagaio'>
                            </div>
                            <div class="back-face face" data-identifier="front-face">
                            </div>
                    </div>`;
}

let elemento = document.querySelector(".kard");
elemento.innerHTML = qteCartasJogo;

// indices adicionados as cartas - Usando +2 para adicionar de 2 em 2 e auxiliar nos pares
let indiceCartas = [];
let verificaCartas = [];

for (let i = 0; i < qteCartas; i += 2) {
    indiceCartas.push(i);
    indiceCartas.push(i);

    // Fazer um push de true para as cartas - auxílio para virar e desvirar com o clique
    verificaCartas.push(true);
    verificaCartas.push(true);
}

// Fazer o sorteio das cartas com os indices selecionados

indiceCartas.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

function comparador() {
    return Math.random() - 0.5;
}

// Iniciando a lógica do jogo

let container = [null,null];
let armazenarPares = 0;
let armazenaCartas = [null, null];
let armazenaId = [null, null];
let infoPar = false;
let contJogadas = 0;
let contador = document.querySelector(".NoJogadas");

// Função que inicia a lógica do jogo ao clicar na carta
function clicar(card) {

    // Assim tenho o índice da carta clicada
    let numCard = parseFloat(card.id.replace('carta', '')); 
    
    // Comparar se a carta já foi clicada e se ela já fez par... Se nenhuma das duas condições for atendida
    // ai pode virar a carta

    if (verificaCartas[numCard] == true && infoPar == false) {

        virarCarta(card);

        // Depois que virou a carta coloca falso pra não poder desvirar  
        verificaCartas[numCard] = false;

        // Identificar se a carta 1 (primeira clicada) já foi alocada na posição 0
        if (container[1] == null && container[0] != null) {
            // se sim, armazena o número da carta e seu identificador
            armazenaCartas[1] = numCard;
            armazenaId[1] = card.id;
            // Se não for a mesma carta que foi clicada -- verificada pelo id
            // armazena a carta 2 no container e conta como mais uma jogada
            // se for a mesma carta o container 1 volta a ser nulo
            if (armazenaCartas[1] != armazenaCartas[0]) {
                container[1] = indiceCartas[numCard];
                contJogadas++;
                contador.innerHTML = `Quantidade de jogadas: ${contJogadas}`;
            } else {
                container[1] = null;
                contJogadas--;
            }
        }
        // Se o container 0 não tiver recebido nenhuma carta, ele recebe ela e dentro do if
        // armazena o id e o número da carta e conta mais jogada
        if (container[0] == null) {
            container[0] = indiceCartas[numCard];
            armazenaCartas[0] = numCard;
            armazenaId[0] = card.id;
            contJogadas++;
            contador.innerHTML = `Quantidade de jogadas: ${contJogadas}`;
        }

        // Comparar se as duas posições do container receberam uma carta
        if (container[0] != null && container[1] != null) {
            // Comparar de são pares e armazena como pares
            if (container[0] == container[1]) {
                armazenarPares += 2;
            //    Se a quantidade de pares for menor que a quantidade de cartas -- Ainda tem jogo
                if (armazenarPares < qteCartas) {
                //    Armazenou os pares e esvaziou os containers para receber mais cartas
                    container = [null, null];
                    // Se o valor de pares é igual ao número de cartas final de jogo
                    // A variável booleana que informa se são pares e seta a virada da carta com o clique
                    // é ativada, assim mesmo se clicar nas cartas não vira mais
                } else if (armazenarPares == qteCartas) {
                    setTimeout(fimDeJogo, 500);
                    infoPar = true;
                }
            } else {
                // se não forem par o a variável que informa se é par é ativada para impedir que 
                // possa clicar em outras cartas e elas virarem quando ainda as cartas anteriores ainda 
                // não foram desviradas... Na função desvirarCarta essa variável volta a false para poder
                // virar as cartas novamente
                infoPar = true;
                // se não for par as cartas podem ser viradas novamente
                for (let i = 0; i < container.length; i++) {
                    verificaCartas[armazenaCartas[i]] = true;
                }

                // função de desvirar cartas com o tempo de 1 segundo
                setTimeout(function () {
                    desvirarCarta(armazenaId);
                }, 1000);

                // containers esvaziados                
                container = [null, null];
            }

        }
    }
}

// Função para virar a carta
function virarCarta(card) {
    let front = card.querySelector(".front-face");
    let back = card.querySelector(".back-face");

    front.classList.toggle('flip-front');
    back.classList.toggle('flip-back');
}

// Função para desvirar as cartas e permitir que elas sejam clicáveis novamente
function desvirarCarta(armazenaId) {

    let carta0 = document.getElementById(armazenaId[0]);
    carta0.children[0].classList.remove('flip-front');
    carta0.children[1].classList.remove('flip-back');

    let carta1 = document.getElementById(armazenaId[1]);
    carta1.children[0].classList.remove('flip-front');
    carta1.children[1].classList.remove('flip-back');

    infoPar = false;
}

// Função para alertar que o jogo acabou e informar o número de jogadas realizadas
function fimDeJogo() {
    alert(`Fim de jogo!! Parabéns! Você ganhou com ${contJogadas} jogadas!
            
Para jogar novamente, por favor, recarregue a página!`);
}

// Colocando a imagem do verso de acordo com o indice sorteado
let imgBack = [];
let backFace = document.querySelectorAll(".back-face");

for (let i = 0; i < qteCartas; i++) {
    imgBack[i] = '<img src=imagens/back' + indiceCartas[i] + '.gif>'
    backFace[i].innerHTML = imgBack[i];
}
