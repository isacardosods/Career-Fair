//DADOS
const player = document.querySelector(".player");
var obstaculo = document.querySelector(".obstaculo");
let obstaculoInterval = null
const perdido = document.querySelector(".perdeu");
const restart = document.querySelector(".restart");
const menu = document.querySelector("#menu");
var jogoRodando = false
let scoreInterval = null
let trilhoInterval = null
const jogo = document.querySelector("#jogo")
const larguraDoJogo = jogo.offsetWidth;
const alturaDoJogo = jogo.offsetHeight
const opacidade = document.querySelector("#opacidadeBaixa");
const cor = document.querySelector(".corzinha")
let score = 0;
const ganhar = document.querySelector(".ganhou");
const creditos = document.querySelector("#criadores");

//GAME START
 


function StartGame(){
    jogoRodando= true;

    //REMOVE TELAS FORA DO JOGO
    score = 0;
    menu.style.display = "none";  // Tela Inicial
    cor.style.display = "none";
    opacidade.style.opacity = "1";


    if (obstaculoInterval){
        clearInterval(obstaculoInterval);
    }

    obstaculoInterval = setInterval(movendoObjeto, 2)


    if (scoreInterval){ //Interrompe o intervalo do Score
        clearInterval(scoreInterval)
    }

    scoreInterval = setInterval(ganhaScore, 100)

    if(trilhoInterval){ //Interrompe o intervalo do Trilho
        clearInterval(trilhoInterval);
    }

    trilhoInterval = setInterval(moverTrilho, 3);   


};

function criadores(){
    menu.style.display = "none";
    creditos.style.display = "flex";
}

function voltarMenu(){
    menu.style.display = "flex";
    creditos.style.display = "none";
}
function gameOver() { //PARA TUDO

    obstaculo.classList.remove('aniO'); //Para animação do Objeto
    perdido.style.display = "flex" //Adiciona a tela do gameOver
    jogoRodando = false;
    jogo.removeChild(obstaculo);
    xObstaculo = 100;
    player.style.left = "5%"
    if (obstaculoInterval){
        clearInterval(obstaculoInterval);
        obstaculoInterval = null
    }

    if (scoreInterval){
        clearInterval(scoreInterval)
        scoreInterval = null
    }

    if(trilhoInterval){
        clearInterval(trilhoInterval);
        trilhoInterval = null
    }
};
    
var velocidadeDoObstaculo = 0.13
let xObstaculo = 100
let xPlayer = 5;

function ganhou(){
    clearInterval(trilhoInterval);
    trilhoInterval = null;
    clearInterval(scoreInterval);
    scoreInterval = null;
    clearInterval(obstaculoInterval);
    obstaculoInterval = null

    opacidade.style.opacity = "0.2";
    cor.style.display = "flex";
    ganhar.style.display = "flex";
}

function movendoObjeto() {
    jogo.appendChild(obstaculo);
    
    if (score <= 130){
        xObstaculo += - velocidadeDoObstaculo
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 130 && score <= 296){
        xObstaculo += - (velocidadeDoObstaculo * 2)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 310 && score < 320){
        xObstaculo += - (velocidadeDoObstaculo * 3)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 330 && score <= 365){
        xObstaculo += - (velocidadeDoObstaculo * 3)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 365 && score < 450){
        xObstaculo += - (velocidadeDoObstaculo )
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 600 && score < 620){
        xObstaculo += + (velocidadeDoObstaculo)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 650 && score < 800){
        xObstaculo += - (velocidadeDoObstaculo * 3)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 820 && score < 850){
        xObstaculo += - (velocidadeDoObstaculo * 3)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 880 && score <= 905){
        xPlayer += + (velocidadeDoObstaculo * 2)
        player.style.left = xPlayer + "%"
    }else if (score > 905 && score <= 915){
        xObstaculo += - (velocidadeDoObstaculo)
        obstaculo.style.left = xObstaculo + "%"
    }else if (score > 920 && score < 940){
        xObstaculo +=  (velocidadeDoObstaculo * 2)
        obstaculo.style.left = xObstaculo + "%"

        xPlayer += - (velocidadeDoObstaculo * 2)
        player.style.left = xPlayer + "%"
    }else if (score >= 1000){
        ganhou();
    }


    if(xObstaculo <= -5){
        jogo.removeChild(obstaculo);
        xObstaculo = 100
    }
}    

function ganhaScore(){
    score += 2;
    atualizaScore();
}

function atualizaScore(){
    document.querySelector("#pontos").innerText = score;
}

    const perdeuJogo = setInterval(function(){ //VERIFICA COLISÃO
    let Y = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let xP = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    let X = parseInt(window.getComputedStyle(obstaculo).getPropertyValue('left'));

    //TRANSFORMANDO EM %
    let xpla = (xP / larguraDoJogo) * 100
    let playerY = (Y / alturaDoJogo) * 100;
    let obstaculoX = (X / larguraDoJogo) * 100;
    
    
        
        
    //COLISÃO DO OBJETO    
    if(obstaculoX <= xpla+16 && obstaculoX >= xpla+10 & playerY >=50){
        gameOver();
    }
});

document.addEventListener('click', (e) => { //VERIFICA ONDE O CLICK CLICA

    let el = e.target;
    if(el.contains(restart)) { //RESTART 
        perdido.style.display = "none" 
        StartGame();
    }
});



function control(e) { //VERIFICADOR DA TECLA

if (e.key == " " ) { //Tecla espaço
        
    if(player != 'animP'){ //PULO
        player.classList.add('animP');
    }
    
    setTimeout(function(){ // REMOVEPULO
        player.classList.remove('animP');
    },615)
    }
}

document.addEventListener("keydown", control); //VERIFICA SE TECLOU

//MOVIMENTO DO CENÁRIO
var trilhos = document.querySelector(".trilhos")
var trilhoUm = document.querySelector(".trilho");
var trilhoDois = trilhos.querySelector(':scope > :nth-child(2)');

let velocidadeDoTrilhoUm = 0.1
let velocidadeDoTrilhoDois = 99;
const velocidadeDosTrilhos = 0.13

function moverTrilho(){ //MOVE O TRILHO PRA ESQUERDA
    if(jogoRodando == true){        
    
    //Velocidade dos Trilhos Um e Dois
    velocidadeDoTrilhoUm += - velocidadeDosTrilhos; 
    trilhoUm.style.left = velocidadeDoTrilhoUm +"%"; 

    velocidadeDoTrilhoDois += - velocidadeDosTrilhos;
    trilhoDois.style.left = velocidadeDoTrilhoDois +"%";
}else{
        trilhos.removeChild(trilhoUm)
        velocidadeDoTrilhoUm = 0.1;
        trilhos.appendChild(trilhoUm)

        trilhos.removeChild(trilhoDois)
        velocidadeDoTrilhoDois = 99;
        trilhos.appendChild(trilhoDois)
}

    // Remove e Adiciona o primeiro Trilho
    
    if(velocidadeDoTrilhoUm <= -101){ 
        trilhos.removeChild(trilhoUm)
        velocidadeDoTrilhoUm = 99;
        trilhos.appendChild(trilhoUm)
    }

    // Remove e Adiciona o segundo Trilho
    
        if(velocidadeDoTrilhoDois <= -101){ 
        trilhos.removeChild(trilhoDois)
        velocidadeDoTrilhoDois = 99;
        trilhos.appendChild(trilhoDois)
    }

}


