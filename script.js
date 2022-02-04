// Repetições do início do Jogo

let qteCartas = 0;

while (qteCartas < 4 || qteCartas > 14 || qteCartas % 2 != 0) {
    qteCartas = parseInt(prompt("Com quantas cartas quer jogar? Escolha entre 4 e 14!"));
}

// Criando a qte de cartas a serem visualizadas com a escolha de inicialização do jogador

let qteCartasJogo = "";
let arrayCartas = [];

for (let i = 0; i < qteCartas; i++) {
    /* qteCartasJogo += '<div id="carta'+i+'" class="corpoCarta" onclick="rodarCarta()"></div>'; */
    qteCartasJogo += `<div id =carta${i} class="card" onclick="testeClicar(this) data-identifier="card"">
                            <div class="front-face face" data-identifier="front-face">
                            <img src='imagens/front 1.png' alt='Frente da carta - papagaio'>
                            </div>
                            <div class="back-face face" data-identifier="back-face">
                            </div>
                    </div>`;
    arrayCartas += i;
}

// Usar id no console log aparece.. <div id="carta0" class="corpoCarta"> </div><div id="carta1" class="corpoCarta"> </div><div id="carta2" class="corpoCarta"> </div><div id="carta3" class="corpoCarta"> </div>

// Agora o qteCartasJogo parece estar se comportando bem, mas como colocar as imagens? Coloquei direto a da frente, será que pode?

// querySelector eu consigo selecionar os elementos que tem determinada classe? As imagens vão estar tudo dentro de main

let elemento = document.querySelector(".teste");
// resgatar o que esteja dentro do elemento ou atribuir algo a ele? Tipo colocar a carta dentro da div com essa classe?

elemento.innerHTML = qteCartasJogo;

// Jogo -- Passos
// 1 - clicar na carta, 2 - carta virar, 3- aparecer a imagem da carta virada 
//4 - programa precisa saber qual carta é (algum tipo de indice?)
// 5 - armazenar o indice da carta virada para comparar com os das outras cartas
//  6 -  Quando virar e escolheu duas, se acertou continuam viradas e fazer o programa entender que faltam menos cartas
// 6 - se não acertou, as cartas desviram e mantêm-se na mesma posição
// 7 - o jogo é finalizado quando todas as cartas são desviradas e permanecem assim

// Fazer o sorteio das cartas
//push -- sempre adiciona o item ao final da array sem a necessidade de você saber o último índice:
// indices foram adicionados as cartas
let indiceCartas = [];
let verificaCartas = [];

for (let i = 0; i < qteCartas; i += 2) {
    indiceCartas.push(i);
    indiceCartas.push(i);

    // Fazer um push de true para as cartas
    verificaCartas.push(true);
    verificaCartas.push(true);
}

console.log(indiceCartas);

indiceCartas.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

function comparador() {
    return Math.random() - 0.5;
}

// Clicando na carta e fazendo girar
let container = [null, null];
let armazenarPares = 0;
let armazenaCartas = [null, null];
let armazenaId = [null, null];
let infoPar = false;
let contJogadas = 0;

function testeClicar(card) {
    // Assim tenho o índice da carta clicada
    let numCard = parseFloat(card.id.replace('carta', '')); // Número das divs que contem as cartas

    if (verificaCartas[numCard] == true && infoPar == false) {

        virarCarta(card);
        // Depois que virou a carta coloca falso pra não poder desvirar -- ai teria que colocar um ou no if pq 
        // se não for par ai tem que desvirar
        verificaCartas[numCard] = false;

        // Identificar e armazenar qual carta está lá
        if (container[1] == null && container[0] != null) {
            armazenaCartas[1] = numCard;
            armazenaId[1] = card.id;
            if (armazenaCartas[1] != armazenaCartas[0]) {
                container[1] = indiceCartas[numCard];
                contJogadas++;
            } else {
                container[1] = null;
            }
        }
        if (container[0] == null) {
            container[0] = indiceCartas[numCard];
            armazenaCartas[0] = numCard;
            armazenaId[0] = card.id;
            contJogadas++;
        }

        // Comparar o que tem dentro do container
        if (container[0] != null && container[1] != null) {
            if (container[0] == container[1]) {
                armazenarPares += 2;
                console.log('Deu certo');
                console.log(armazenarPares);
                if (armazenarPares < qteCartas) {
                    console.log('Tem jogo ainda...');
                    container = [null, null];
                    infoPar == true;
                    /* armazenaId = [null, null]; */
                } else if (armazenarPares == qteCartas) {
                    setTimeout(fimDeJogo, 500);
                    infoPar == true;
                }
            } else {
                infoPar = false;
                for (let i = 0; i < container.length; i++) {
                    verificaCartas[armazenaCartas[i]] = true;
                }
                setTimeout(function () {
                    desvirarCarta(armazenaId);
                }, 1000);
                /* armazenaId = [null, null]; */
                container = [null, null];
                console.log('Tente de novo =/');
            }
        }

        /*         
                console.log(container);
                console.log(virarCarta);
                console.log(infoPar);
                console.log(verificaCartas); */
    }
}

function virarCarta(card) {
    let front = card.querySelector(".front-face");
    let back = card.querySelector(".back-face");

    front.classList.toggle('flip-front');
    back.classList.toggle('flip-back');
}

function desvirarCarta(armazenaId) {

    let carta0 = document.getElementById(armazenaId[0]);
    carta0.children[0].classList.remove('flip-front');
    carta0.children[1].classList.remove('flip-back');

    let carta1 = document.getElementById(armazenaId[1]);
    carta1.children[0].classList.remove('flip-front');
    carta1.children[1].classList.remove('flip-back');

    console.log(carta0);
    console.log(carta1);
    /*     let front = card.querySelector(".front-face");
        let back = card.querySelector(".back-face");
    
        front.classList.toggle('flip-front');
        back.classList.toggle('flip-back'); */
}

function fimDeJogo() {
    alert(`Fim de jogo!! Parabéns! Você ganhou com ${contJogadas} jogadas!
            
Para jogar novamente, por favor, recarregue a página!`);
}
/* let verificador = [null, null];
let auxVerificador = "";
// Verificar se a carta já foi viradas
function verificaCarta(numCard){  

    if(verificador[0] != null){
        verificador[1] = numCard;
    }else {
        verificador[0] = numCard;
    }

    if(verificador[0] != null && verificador[1] != null){
        if(verificador[0] == verificador[1]){
            auxVerificador = false;
            console.log(auxVerificador);
            console.log(verificador);
            verificador = [null, null]
        } else {
            auxVerificador = true;
            console.log(auxVerificador);
            console.log(verificador);
            verificador = [null, null]
        }
    }

    return auxVerificador;
} */

// Agora colocar a imagem do verso de acordo com o indice sorteado
let imgBack = [];
let backFace = document.querySelectorAll(".back-face");

for (let i = 0; i < qteCartas; i++) {
    imgBack[i] = '<img src=imagens/back' + indiceCartas[i] + '.png>'
    backFace[i].innerHTML = imgBack[i];
}

// desvirar as duas cartas depois que a segunda foi aberta se os índices não forem iguais
// Clicou na carta... Viu quem virou, pegou o id dela... Com o id consigo saber qual carta é a virada



