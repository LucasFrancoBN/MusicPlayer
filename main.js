//ARRAY COM AS MUSICAS EM FORMATO DE OBJETO
let todasMusicas = [
    {titulo:"Bury The Light", src:"./music/buryTheLight.mp3", imagem:"./images/bury.jpg"},
    {titulo:"Holiday", src:"./music/holiday.mp3", imagem:"./images/holiday.jpg"},
    {titulo:"Stay With Me", src:"./music/stayWithMe.mp3", imagem:"./images/stayWithMe.jpg"},
    {titulo:"Vogel im Kafig", src:"./music/vogelImKafig.mp3", imagem:"./images/vogel.jpg"},
    
];

let musica = document.querySelector("audio");

//INDICA O NUMERO DE MINUTOS E SEGUNDOS DA MUSICA NO TOTAL
let fimMusica = document.querySelector(".fim");
fimMusica.textContent = segundoParaMinutos(Math.floor(musica.duration));

//SELECAO DOS BOTOES
let botPlay = document.querySelector(".botao-play");
let botPause = document.querySelector(".botao-pause");
let anterior = document.querySelector(".anterior");
let proxima = document.querySelector(".proxima");

//SELECAO DA IMAGEM DA MUSICA E DO NOME DA MUSICA
let imagemDaMusica = document.querySelector(".imagemMusica");
let nomeMusica = document.querySelector(".nomeMusica h2");

//VARIAVEL CRIADA PARA AJUDAR NA MUDANCA DE MUSICA
let indexMusica = 0;

//ESSA FUNCAO FOI CHAMADA AQUI PARA DEIXAR O NOME, IMAGEM E O TEMPO DA PRIMEIRA MUSICA CERTOS
renderizarMusica(indexMusica)

//EVENTOS DO SITE
    //1º AO CLICAR NO PLAY ELE TOCA A MUSICA
botPlay.addEventListener("click", tocarMusica);
    //PAUSA A MUSICA
botPause.addEventListener("click", pausarMusica);
    //ATUALIZA A BARRA
musica.addEventListener("timeupdate", atualizarBarra);
    //TROCA A A MUSICA PARA A ANTERIOR
anterior.addEventListener("click", () => {
    indexMusica--;
    //SE A MUSICA FOR A PRIMEIRA, ELE VAI DIRETO PARA A ULTIMA
    if(indexMusica < 0){
        indexMusica = 3;
    }
    renderizarMusica(indexMusica);
});
    //TROCA PARA A MUSICA SEGUINTE
proxima.addEventListener("click", () => {
    indexMusica++;
    //SE A MUSICA FOR A ULTIMA, ELE VAI PARA A PRIMEIRA
    if(indexMusica > 3){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
})

//FUNCOES DOS EVENTOS
    //FUNCAO RESPONSAVEL POR TROCAR DE MUSICA
function renderizarMusica(index){
    musica.setAttribute("src", todasMusicas[index].src);
    //AO CARREGAR A MUSICA, ELE TROCA A IMAGEM, NOME DA MUSICA E O TEMPO FINAL DELA
    musica.addEventListener("loadeddata", () => {
        nomeMusica.textContent = todasMusicas[index].titulo;
        imagemDaMusica.src = todasMusicas[index].imagem;
        fimMusica.textContent = segundoParaMinutos(Math.floor(musica.duration));
    });
}

    //RESPONSAVEL POR DAR PLAY NA MUSICA
function tocarMusica(){
    musica.play();
    botPause.style.display = "block";
    botPlay.style.display = "none";
}

    //RESPONSAVEL POR PAUSAR A MUSICA
function pausarMusica(){
    musica.pause();
    botPause.style.display = "none";
    botPlay.style.display = "block";
}

    //ATUALIZA A BARRA DE TEMPO DA MUSICA
function atualizarBarra (){
    let barra = document.querySelector("progress");
    let tempoDecorrido = document.querySelector(".inicio");
    //ATUALIZA A BARRA DE MUSICA EM SI
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + "%";
    //ATUALIZA O TEMPO TOCADO DE MUSICA
    tempoDecorrido.textContent = segundoParaMinutos(Math.floor(musica.currentTime));
}

    //ALTERA OS MINUTOS E SEGUNDOS DA MUSICA
function segundoParaMinutos(segundos){
    let CampoMinutos = Math.floor(segundos / 60);
    let CampoSegundos = segundos % 60;
    if(CampoSegundos<10){
    CampoSegundos = "0" + CampoSegundos;
    }

    return CampoMinutos + ":" + CampoSegundos
}
