let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let x_mouse
let y_mouse
let click = false
let musica_intro = new Audio('intro.mp3')
let musica_loop = new Audio('loop.mp3')
let imagem_mira = new Image();
imagem_mira.src = ./jogo/'mira.png';
let imagem_inimigoBD = new Image();
imagem_inimigoBD.src = 'inimigoBD.png'
let imagem_inimigoBE = new Image();
imagem_inimigoBE.src = 'inimigoBE.png'
let imagem_inimigoCD = new Image();
imagem_inimigoCD.src = 'inimigoCD.png'
let imagem_inimigoCE = new Image();
imagem_inimigoCE.src = 'inimigoCE.png'
let asa = 0;
let score = 0;
document.getElementById("score").value = score;
let portal1 = new Image();
portal1.src = 'portal1im.png'
let portal2 = new Image();
portal2.src = 'portal2im.png'
let portal3 = new Image();
portal3.src = 'portal3im.png'
let portal4 = new Image();
portal4.src = 'portal4im.png'
let vida = 9;
document.getElementById("vida").value = vida;
let moldura = new Image();
moldura.src = 'moldura.png'
let fundo = new Image();
fundo.src = "jogo/fundo.jpg"
let branco = new Image();
branco.src = 'branco.png'
let explosao = new Image();
explosao.src = 'explosao.png'
let fundo_intro = new Image();
fundo_intro.src = 'introFundo.png'
let imagem_hp = new Image();
imagem_hp.src = 'hp1.jpg'
let b_start=0;  // para poder jogar dnv caso morra

function titulo(){
    ctx.font = "40px American Typewriter";
    ctx.fillStyle= "rgb(69, 66, 243)";
    ctx.fillText("The Portal",20,50);
    ctx.fillText("of", 70,90);
    ctx.fillText("Dragon's Cave", 20,130);
}
window.onload = function(){
    ctx.drawImage(moldura,10,10,250,150)
    titulo()
}

let Hp1 = { //esquerda cima-baixo
    altura: 25,
    largura: 25,
    x:175,
    y:-2025
}

let Hp2 = { //direita baixo-cima
    altura: 25,
    largura: 25,
    x:525,
    y:4500
}

let Hp3 = { //cima esquerda-direita
    altura: 25,
    largura: 25,
    x:-6025,
    y:125
}

let Hp4 = { //baixo direita-esquerda
    altura: 25,
    largura: 25,
    x:8700,
    y:375
}

let mira = {
    altura : 50,
    largura : 50,
    x : (c.width/2) - 25,
    y : (c.height/4) - 25,
};

addEventListener('mousemove', function(evento){
    rect = c.getBoundingClientRect();
    x_mouse = evento.clientX - rect.left - (mira.largura/2);
    y_mouse = evento.clientY - rect.top - (mira.altura/2);
})

let intro_cima = {
    cor: "black",
    altura: 50,
    largura:50,
    x: 0,
    y: 0
}

let intro_baixo = { //x e y invertido
    cor: "black",
    altura: 50,
    largura:-50,
    x: 700,
    y: 450
}

let monolito = {
    largura: 100,
    altura: 100,
    x: c.width/2 - 30,
    y: c.height/2 - 30,
}

let inimigosQ1 = {
    largura: 66,
    altura: 75,
    x: 700,
    y: -40,
    speedQ1: 1
}

let inimigosQ2 = {
    largura: 66,
    altura: 75,
    x: -40,
    y: -40,
    speedQ2: 1   
}

let inimigosQ3 = {
    largura: 66,
    altura: 75,
    x: -44,
    y: 494,
    speedQ3: 1
}

let inimigosQ4 = {
    largura: 66,
    altura: 75,
    x: 700,
    y: 500,
    speedQ4: 1
}

let inimigosV1 = {
    largura: 66,
    altura: 75,
    x: (c.width/2) - 20,
    y: -55,
    speedV1: 1
}

let inimigosV2 = {
    largura: 66,
    altura: 75,
    x: (c.width/2) - 20,
    y: 530,
    speedV2: 1
}

let inimigosH1 = {
    largura: 66,
    altura: 75,
    x: -50,
    y: c.height/2 - 30,
    speedH1: 1
}

let inimigosH2 = {
    largura: 66,
    altura: 75,
    x: 710,
    y: c.height/2 - 30,
    speedH2: 1
}

function desenhar(){// desenha todos os personagens
    ctx.clearRect(0,0, c.width, c.height)
    ctx.drawImage(fundo,0,0,c.width,c.height) //imagem de fundo na execução do jogo
    ctx.drawImage(imagem_hp, Hp1.x,Hp1.y,Hp1.largura,Hp1.altura) //imagem da vida flutuante
    ctx.drawImage(imagem_hp, Hp2.x,Hp2.y,Hp2.largura,Hp2.altura) //imagem da vida flutuante
    ctx.drawImage(imagem_hp, Hp3.x,Hp3.y,Hp3.largura,Hp3.altura) //imagem da vida flutuante
    ctx.drawImage(imagem_hp, Hp4.x,Hp4.y,Hp4.largura,Hp4.altura) //imagem da vida flutuante

    if(asa%4 === 0){ // animação do portal
        ctx.drawImage(portal1,monolito.x,monolito.y,monolito.largura,monolito.altura)}
    else if(asa % 4 === 1){
        ctx.drawImage(portal2,monolito.x,monolito.y,monolito.largura,monolito.altura)
    }
    else if(asa % 4 === 2){
        ctx.drawImage(portal3,monolito.x,monolito.y,monolito.largura,monolito.altura)
    }
    else if(asa % 4 === 3){
        ctx.drawImage(portal4,monolito.x,monolito.y,monolito.largura,monolito.altura)
    }
    
    //desenhar V1: cima
    if (inimigosV1.y + inimigosV1.altura*3/4 < c.height/2 ){ //animação do inimigo
        if (asa % 2 === 1){
            ctx.drawImage(imagem_inimigoCD, inimigosV1.x, inimigosV1.y, inimigosV1.largura, inimigosV1.altura)}
        else{
            ctx.drawImage(imagem_inimigoBD, inimigosV1.x, inimigosV1.y, inimigosV1.largura, inimigosV1.altura)}
    }
    else{//se chegar no monolito:
        inimigosV1.y = -720
        vida--
        document.getElementById("vida").value = vida
    }

    //desenhar V2: baixo
    if (inimigosV2.y > c.height/2){ //animação do inimigo
        if (asa % 2 === 1){
            ctx.drawImage(imagem_inimigoCE, inimigosV2.x, inimigosV2.y, inimigosV2.largura, inimigosV2.altura)}
        else{
            ctx.drawImage(imagem_inimigoBE, inimigosV2.x, inimigosV2.y, inimigosV2.largura, inimigosV2.altura)}
    }
    else{//se chegar no monolito:
        inimigosV2.y = 1420
        vida--
        document.getElementById("vida").value = vida
    }

    //desenhar H1: esquerda
    if (inimigosH1.x + inimigosH1.largura/3 < c.width/2 - inimigosH1.largura/2){
        if (asa % 2 === 1){
            ctx.drawImage(imagem_inimigoCD, inimigosH1.x, inimigosH1.y, inimigosH1.largura, inimigosH1.altura)}
        else{
            ctx.drawImage(imagem_inimigoBD, inimigosH1.x, inimigosH1.y, inimigosH1.largura, inimigosH1.altura)}
    }
    else{//se chegar no monolito:
        inimigosH1.x = -630
        vida--
        document.getElementById("vida").value = vida
    }

    //desenhar H2: direita
    if (inimigosH2.x > c.width/2 + inimigosH2.largura/2){
        if (asa % 2 === 1){
            ctx.drawImage(imagem_inimigoCE, inimigosH2.x, inimigosH2.y, inimigosH2.largura, inimigosH2.altura)}
        else{
            ctx.drawImage(imagem_inimigoBE, inimigosH2.x, inimigosH2.y, inimigosH2.largura, inimigosH2.altura)}
    }
    else{//se chegar no monolito:
        inimigosH2.x = 1500
        vida--
        document.getElementById("vida").value = vida
    }

    //desenhar Q1:
    if ((inimigosQ1.x > c.width/2) && (inimigosQ1.y < c.height/2 - inimigosQ1.altura/2)){
        if (asa % 2 === 0){
            ctx.drawImage(imagem_inimigoCE, inimigosQ1.x, inimigosQ1.y, inimigosQ1.largura, inimigosQ1.altura)}
        else{
            ctx.drawImage(imagem_inimigoBE, inimigosQ1.x, inimigosQ1.y, inimigosQ1.largura, inimigosQ1.altura)}
    }
    else{//se chegar no monolito:
        inimigosQ1.x = 820
        inimigosQ1.y = -160
        vida--
        document.getElementById("vida").value = vida
    }

    //desenhar Q2:
    if ((inimigosQ2.x < c.width/2 - inimigosQ2.largura/2) && (inimigosQ2.y < c.height/2 - inimigosQ2.altura/2)){
        if (asa % 2 === 0){
            ctx.drawImage(imagem_inimigoCD, inimigosQ2.x, inimigosQ2.y, inimigosQ2.largura, inimigosQ2.altura)}
        else{
            ctx.drawImage(imagem_inimigoBD, inimigosQ2.x, inimigosQ2.y, inimigosQ2.largura, inimigosQ2.altura)}
    }
    else{//se chegar no monolito:
        inimigosQ2.x = -170
        inimigosQ2.y = -170
        vida--
        document.getElementById("vida").value = vida
    }

    //desenhar Q3:
    if ((inimigosQ3.x < c.width/2 - inimigosQ3.largura/2) && (inimigosQ3.y > c.height/2 - inimigosQ3.altura/2)){
        if (asa % 2 === 0){
            ctx.drawImage(imagem_inimigoCD, inimigosQ3.x, inimigosQ3.y, inimigosQ3.largura, inimigosQ3.altura)}
        else{
            ctx.drawImage(imagem_inimigoBD, inimigosQ3.x, inimigosQ3.y, inimigosQ3.largura, inimigosQ3.altura)}
    }
    else{//se chegar no monolito:
        inimigosQ3.x = -220
        inimigosQ3.y = 599
        vida--
        document.getElementById("vida").value = vida
    }    

    //desenhar Q4:
    if ((inimigosQ4.x > c.width/2 ) && (inimigosQ4.y > c.height/2 )){
        if (asa % 2 === 0){
            ctx.drawImage(imagem_inimigoCE, inimigosQ4.x, inimigosQ4.y, inimigosQ4.largura, inimigosQ4.altura)}
        else{
            ctx.drawImage(imagem_inimigoBE, inimigosQ4.x, inimigosQ4.y, inimigosQ4.largura, inimigosQ4.altura)}
    }
    else{//se chegar no monolito:
        inimigosQ4.x = 910
        inimigosQ4.y = 650
        vida--
        document.getElementById("vida").value = vida
    }      

    ctx.drawImage(imagem_mira, mira.x, mira.y, mira.largura, mira.altura);

    if (vida <= 0){
        return
    }
}

function asaMov(){
    if (vida <= 0){return}
    setTimeout(function(){asa++; asaMov()}, 330)
}

function mover_mira(){// movimenta a mira com o mouse
    
    if (x_mouse < (c.width - mira.largura) && x_mouse > 0){
        mira.x = x_mouse //x do mouse está no canto superior esquerdo da imagem mira
    }
    else if (x_mouse >= (c.width - mira.largura)){
        mira.x = (c.width - mira.largura)
    }
    else if (x_mouse <= 0){
        mira.x = 0
    }
    
    if (y_mouse < (c.height - mira.altura) && y_mouse > 0){
        mira.y = y_mouse
    }
    else if(y_mouse >= (c.height - mira.altura)){
        mira.y = (c.height - mira.altura)
    }
    else if(y_mouse <= 0){
        mira.y = 0
    }
    
    if (vida <= 0){
        return
    }

}

function mover_inimigos(){// movimenta os inimigos
    
    //MoverQ1:
    if (inimigosQ1.x <= c.width/2 - inimigosQ1.largura/2 /*centro*/){
        inimigosQ1.x += 0
    }
    else{
    inimigosQ1.x -= (7/9*inimigosQ1.speedQ1)
    }

    if (inimigosQ1.y >= c.height/2 - inimigosQ1.altura/2 /*centro*/){
        inimigosQ1.y += 0
    }
    else{
    inimigosQ1.y += (5/9*inimigosQ1.speedQ1)}

    //MoverQ2:
    if (inimigosQ2.x >= c.width/2 - inimigosQ2.largura/2 /*centro*/){
        inimigosQ2.x += 0
    }
    else{
    inimigosQ2.x += (7/9*inimigosQ2.speedQ2)
    }

    if (inimigosQ2.y >= c.height/2 - inimigosQ2.altura/2 /*centro*/){
        inimigosQ2.y += 0
    }
    else{
    inimigosQ2.y += (5/9*inimigosQ2.speedQ2)}
    
    //MoverQ3:
    if (inimigosQ3.x >= c.width/2 - inimigosQ3.largura/2 /*centro*/){
        inimigosQ3.x += 0
    }
    else{
    inimigosQ3.x += (7/9*inimigosQ3.speedQ3)
    }

    if (inimigosQ3.y <= c.height/2 - inimigosQ3.altura/2 /*centro*/){
        inimigosQ3.y += 0
    }
    else{
    inimigosQ3.y -= (5/9*inimigosQ3.speedQ3)}   

    //MoverQ4:
    if (inimigosQ4.x <= c.width/2 - inimigosQ4.largura/2 /*centro*/){
        inimigosQ4.x += 0
    }
    else{
    inimigosQ4.x -= (7/9*inimigosQ4.speedQ4)
    }

    if (inimigosQ4.y <= c.height/2 - inimigosQ4.altura/2 /*centro*/){
        inimigosQ4.y += 0
    }
    else{
    inimigosQ4.y -= (5/9*inimigosQ4.speedQ4)}
    
    //MoverV1:
    if (inimigosV1.y >= c.height/2 - inimigosV1.altura/2 /*centro*/){
        inimigosV1.y += 0
    }
    else{
    inimigosV1.y += (5/9*inimigosV1.speedV1)}

    //MoverV2:
    if (inimigosV2.y <= c.height/2 - inimigosV2.altura/2 /*centro*/){
        inimigosV2.y += 0
    }
    else{
    inimigosV2.y -= (5/9*inimigosV2.speedV2)}

    //MoverH1:
    if (inimigosH1.x >= c.width/2 - inimigosH1.largura/2 /*centro*/){
        inimigosH1.x += 0 //fica parado
    }
    else{
    inimigosH1.x += (7/9*inimigosH1.speedH1) //anda
    }

    //MoverH2:
    if (inimigosH2.x <= c.width/2 - inimigosH2.largura/2 /*centro*/){
        inimigosH2.x += 0 //fica parado
    }
    else{
    inimigosH2.x -= (7/9*inimigosH2.speedH2) //anda
    }
    if (vida <= 0){
        return
    }
}

function tiro(){
    //V1
    if (click && x_mouse + (mira.largura/2)> inimigosV1.x && x_mouse +(mira.largura/2) < inimigosV1.x + inimigosV1.largura && y_mouse + (mira.largura/2)> inimigosV1.y && y_mouse+ (mira.largura/2)< inimigosV1.y + inimigosV1.altura){
        inimigosV1.y = -300
        score += 1
        inimigosV1.speedV1 += 0.06
    }
    
    //V2
    if (click && x_mouse + (mira.largura/2)> inimigosV2.x && x_mouse +(mira.largura/2) < inimigosV2.x + inimigosV2.largura && y_mouse + (mira.largura/2)> inimigosV2.y && y_mouse+ (mira.largura/2)< inimigosV2.y + inimigosV2.altura){        
        inimigosV2.y = 800
        score += 1
        inimigosV2.speedV2 += 0.06
    }
    else{}

    //Q1
    if (click && x_mouse + (mira.largura/2)> inimigosQ1.x && x_mouse +(mira.largura/2) < inimigosQ1.x + inimigosQ1.largura && y_mouse + (mira.largura/2)> inimigosQ1.y && y_mouse+ (mira.largura/2)< inimigosQ1.y + inimigosQ1.altura){
        inimigosQ1.x = 845
        inimigosQ1.y = -130
        score += 1
        inimigosQ1.speedQ1 += 0.06
    }
    else{}

    //Q2
    if (click && x_mouse + (mira.largura/2)> inimigosQ2.x && x_mouse +(mira.largura/2) < inimigosQ2.x + inimigosQ2.largura && y_mouse + (mira.largura/2)> inimigosQ2.y && y_mouse+ (mira.largura/2)< inimigosQ2.y + inimigosQ2.altura){
        inimigosQ2.x = -213
        inimigosQ2.y = -213
        score += 1
        inimigosQ2.speedQ2 += 0.06
    }
    else{}

    //Q3
    if (click && x_mouse + (mira.largura/2)> inimigosQ3.x && x_mouse +(mira.largura/2) < inimigosQ3.x + inimigosQ3.largura && y_mouse + (mira.largura/2)> inimigosQ3.y && y_mouse+ (mira.largura/2)< inimigosQ3.y + inimigosQ3.altura){
        inimigosQ3.x = -75
        inimigosQ3.y = 525
        score += 1
        inimigosQ3.speedQ3 += 0.06
    }
    else{}

    //Q4
    if (click && x_mouse + (mira.largura/2)> inimigosQ4.x && x_mouse +(mira.largura/2) < inimigosQ4.x + inimigosQ4.largura && y_mouse + (mira.largura/2)> inimigosQ4.y && y_mouse+ (mira.largura/2)< inimigosQ4.y + inimigosQ4.altura){
        inimigosQ4.x = 770
        inimigosQ4.y = 570
        score += 1
        inimigosQ4.speedQ4 += 0.06
    }
    else{}

    //H1
    if (click && x_mouse + (mira.largura/2)> inimigosH1.x && x_mouse +(mira.largura/2) < inimigosH1.x + inimigosH1.largura && y_mouse + (mira.largura/2)> inimigosH1.y && y_mouse+ (mira.largura/2)< inimigosH1.y + inimigosH1.altura){
        inimigosH1.x = -300
        score += 1
        inimigosH1.speedH1 += 0.06
    }
    else{}

    //H2
    if (click && x_mouse + (mira.largura/2)> inimigosH2.x && x_mouse +(mira.largura/2) < inimigosH2.x + inimigosH2.largura && y_mouse + (mira.largura/2)> inimigosH2.y && y_mouse+ (mira.largura/2)< inimigosH2.y + inimigosH2.altura){
        inimigosH2.x = 873
        score += 1
        inimigosH2.speedH2 += 0.06
    }
    else{}

    //Hp1
    if (click && x_mouse + (mira.largura/2)> Hp1.x && x_mouse +(mira.largura/2) < Hp1.x + Hp1.largura && y_mouse + (mira.largura/2)> Hp1.y && y_mouse+ (mira.largura/2)< Hp1.y + Hp1.altura){
        Hp1.y = (-8000 - Hp1.altura)
        vida += 6
        document.getElementById("vida").value = vida
    }

    //Hp2
    if (click && x_mouse + (mira.largura/2)> Hp2.x && x_mouse +(mira.largura/2) < Hp2.x + Hp2.largura && y_mouse + (mira.largura/2)> Hp2.y && y_mouse+ (mira.largura/2)< Hp2.y + Hp2.altura){
        Hp2.y = 8500
        vida += 6
        document.getElementById("vida").value = vida
    }

    //Hp3
    if (click && x_mouse + (mira.largura/2)> Hp3.x && x_mouse +(mira.largura/2) < Hp3.x + Hp3.largura && y_mouse + (mira.largura/2)> Hp3.y && y_mouse+ (mira.largura/2)< Hp3.y + Hp3.altura){
        Hp3.x = (-8000 - Hp3.largura)
        vida += 6
        document.getElementById("vida").value = vida
    }

    //Hp4
    if (click && x_mouse + (mira.largura/2)> Hp4.x && x_mouse +(mira.largura/2) < Hp4.x + Hp4.largura && y_mouse + (mira.largura/2)> Hp4.y && y_mouse+ (mira.largura/2)< Hp4.y + Hp4.altura){
        Hp4.x = 8700
        vida += 6
        document.getElementById("vida").value = vida
    }

    document.getElementById("score").value = score
}

function introPiscarBranco(){
    ctx.clearRect(0,0,c.width,c.height)
    setTimeout(function (){
        ctx.drawImage(branco,0,0,c.width,c.height)}, 200)
} 

function introPiscarBranco2(){
    setTimeout(function (){
        ctx.drawImage(branco,0,0,c.width,c.height)}, 500)
}

function introPiscarBranco3(){
    setTimeout(function (){
        ctx.drawImage(branco,0,0,c.width,c.height)}, 800)
}  

function introPiscarBackground(){
    setTimeout(function(){
        ctx.drawImage(fundo_intro,0,0,c.width,c.height)}, 300)
}

function introPiscarBackground2(){
    setTimeout(function(){
        ctx.drawImage(fundo_intro,0,0,c.width,c.height)}, 600)
}

function introPiscarBackground3(){
    setTimeout(function(){
        ctx.drawImage(fundo_intro,0,0,c.width,c.height)}, 900)
}

function intro(){
    setTimeout(function() {barras()},1000)
}

function barras(){
    ctx.fillStyle = intro_baixo.cor;
    ctx.fillRect(intro_baixo.x,intro_baixo.y,intro_baixo.largura,intro_baixo.altura)

    ctx.fillStyle = intro_cima.cor;
    ctx.fillRect(intro_cima.x,intro_cima.y,intro_cima.largura,intro_cima.altura)

    if (intro_baixo.x > 0){
        intro_baixo.x += intro_baixo.largura//velocidade da barra, obs: este valor deve ser menor ou igual a intro_baixo.largura
    }
    else if (intro_baixo.y === 250){
        intro_baixo.y = intro_baixo.y
    }
    else {
        intro_baixo.x = 700
        intro_baixo.y -= 50
    }

    if (intro_cima.x < 700){
        intro_cima.x += intro_cima.largura //velocidade da barra, obs: este valor deve ser menor ou igual a intro_cima.largura
    }
    else if (intro_cima.y === 200){
        intro_cima.y = intro_cima.y
    }
    else {
        intro_cima.x = 0
        intro_cima.y += 50
    }

    requestAnimationFrame(barras)
}

function jogo(){
    c.style.cursor = "none";
    desenhar();
    mover_mira();
    mover_inimigos();
    hp();
    c.addEventListener('mousedown', function clicar() {click = true})
    tiro()
    window.addEventListener('mouseup', function tirar() {if (click === true){click = false}})
    if (vida <= 0){
        return end()
    }   
    requestAnimationFrame(jogo)
}

function musicIntro(){
    musica_intro.volume = 0.05
    musica_intro.play();
}

function musicLoop(){
    setTimeout(function(){
        musica_loop.volume = 0.05
        musica_loop.loop = true;
        musica_loop.load()
        musica_loop.play()},12999)
}

function atualizar(){
    setTimeout(function(){jogo()}, 2500)
}

function gameover(){
    c.style.cursor = "default"
    
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);
    
    ctx.font = "30px Arial";
    ctx.fillStyle="red";
    ctx.textAlign = "center";
    ctx.fillText("Fim de Jogo!", 350, 50);

    ctx.font = "30px Arial";
    ctx.fillStyle="rgb(15, 227, 64)";
    ctx.textAlign = "center";
    ctx.fillText("Parabéns! Seu score foi de:", 350, 110);
    ctx.fillText(score,350,160);
    ctx.drawImage(imagem_inimigoCE, 350,140)
    ctx.drawImage(imagem_inimigoCD, 10,140)
    ctx.fillText("Obrigado, por jogar The Portal of Dragon's Cave ^^",350,200);
}

function hp(){
    Hp1.y += 1.7
    if (Hp1.y > 510){
        Hp1.y = (-8000 - Hp1.altura)
    }
    Hp2.y -= 1.7
    if (Hp2.y < -10){
        Hp2.y = -8500
    }
    Hp3.x += 1.7
    if (Hp3.x > 710){
        Hp3.x = (-8000 - Hp3.largura)
    }
    Hp4.x -= 1.7
    if (Hp4.x < -10){
        Hp4.x = 8700
    }
}

function reset(){
    asa = 0
    score = 0
    intro_cima.x = 0
    intro_cima.y = 0
    intro_baixo.y = 700
    intro_baixo.y = 450
    document.getElementById("botao").disabled = true

    if(b_start == 1){
        location.reload();
        }
    else{
       b_start=1 
       }
}

function end(){
    musica_intro.pause()
    musica_loop.pause()
    ctx.clearRect(0,0,c.width,c.height)
    document.getElementById("botao").disabled = false
    gameover()
}
