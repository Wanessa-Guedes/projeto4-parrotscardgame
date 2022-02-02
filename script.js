// Repetições do início do Jogo

let qteCartas = 0;

while(qteCartas < 4 || qteCartas > 14 || qteCartas%2 != 0){
    qteCartas = parseInt(prompt("Com quantas cartas quer jogar? Escolha entre 4 e 14!"));
}

// Criando a qte de cartas a serem visualizadas com a escolha de inicialização do jogador

let qteCartasJogo = "";
let arrayCartas = [];

for(let i = 0; i < qteCartas; i++){
    /* qteCartasJogo += '<div id="carta'+i+'" class="corpoCarta" onclick="rodarCarta()"></div>'; */
    qteCartasJogo += `<div class="card" onclick="testeClicar(this)">
                            <div class="front-face face">
                            <img src='imagens/front 1.png' alt='Frente da carta - papagaio'>
                            </div>
                            <div class="back-face face">
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

for(let i = 0; i < qteCartas; i+=2){
    indiceCartas.push(i); 
    indiceCartas.push(i);
}

indiceCartas.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

// Clicando na carta e fazendo girar

function testeClicar(card){
    let front = card.querySelector(".front-face"); 
    let back = card.querySelector(".back-face"); 

    front.classList.toggle('flip-front');
    back.classList.toggle('flip-back');
}

// Agora colocar a imagem do verso de acordo com o indice sorteado
let imgBack = [];
let backFace = document.querySelectorAll(".back-face");

for(let i = 0; i < qteCartas; i++){
    imgBack[i] = '<img src=imagens/back' + indiceCartas[i] + '.png>'
    backFace[i].innerHTML = imgBack[i];
}


