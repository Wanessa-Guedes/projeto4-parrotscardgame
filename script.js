let qteCartas = 0;

while(qteCartas < 4 || qteCartas > 14 || qteCartas%2 != 0){
    qteCartas = parseInt(prompt("Com quantas cartas quer jogar? Escolha entre 4 e 14!"));
}

