// Repetições do início do Jogo

let qteCartas = 0;

while(qteCartas < 4 || qteCartas > 14 || qteCartas%2 != 0){
    qteCartas = parseInt(prompt("Com quantas cartas quer jogar? Escolha entre 4 e 14!"));
}

// Criando a qte de cartas a serem visualizadas com a escolha de inicialização do jogador

let qteCartasJogo = "";
let arrayCartas = [];

for(let i = 0; i < qteCartas; i++){
    qteCartasJogo += '<div id="carta'+i+'" class="corpoCarta" onclick="virarCarta()"></div>';
    arrayCartas += i;
}

// Usar id no console log aparece.. <div id="carta0" class="corpoCarta"> </div><div id="carta1" class="corpoCarta"> </div><div id="carta2" class="corpoCarta"> </div><div id="carta3" class="corpoCarta"> </div>

// Agora o qteCartasJogo parece estar se comportando bem, mas como colocar as imagens? Coloquei direto a da frente, será que pode?

// querySelector eu consigo selecionar os elementos que tem determinada classe? As imagens vão estar tudo dentro de main

let elemento = document.querySelector("main");

// resgatar o que esteja dentro do elemento ou atribuir algo a ele? Tipo colocar a carta dentro da div com essa classe?

elemento.innerHTML = qteCartasJogo; 

// Colocar imagem na frente - Ver as divs dentro do main 
let insideElemento = elemento.children;

// Criar imagem no documento
let img_frente = "<img src='imagens/front 1.png' alt='Frente da carta - papagaio'>";

// insideElemento.appendChild(img_frente) 
// Agora eu tenho os elementos dentro do main que acrescentei e tenho que percorrer eles para acrescentar as imagens 
for(let carta of insideElemento){
    carta.innerHTML = img_frente;
}

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

function jogo(){

    // virar a carta

    
}