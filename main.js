let todasMusicas = [
    {titulo:"Bury The Light", src:"./music/buryTheLight.mp3", imagem:"./images/bury.jpg"},
    {titulo:"Holiday", src:"./music/holiday.mp3", imagem:"./images/holiday.jpg"},
    {titulo:"Stay With Me", src:"./music/stayWithMe.mp3", imagem:"./images/stayWithMe.jpg"},
    {titulo:"Vogel im Kafig", src:"./music/vogelImKafig.mp3", imagem:"./images/vogel.jpg"},
    
];

let musica = document.querySelector("audio");

let fimMusica = document.querySelector(".fim");
fimMusica.textContent = segundoParaMinutos(Math.floor(musica.duration));

let botPlay = document.querySelector(".botao-play");
let botPause = document.querySelector(".botao-pause");
let anterior = document.querySelector(".anterior");
let proxima = document.querySelector(".proxima");


let imagemDaMusica = document.querySelector(".imagemMusica");
let nomeMusica = document.querySelector(".nomeMusica h2");

let indexMusica = 0;

renderizarMusica(indexMusica)

//EVENTOS DO SITE
botPlay.addEventListener("click", tocarMusica);
botPause.addEventListener("click", pausarMusica);
musica.addEventListener("timeupdate", atualizarBarra);
anterior.addEventListener("click", () => {
    indexMusica--;
    if(indexMusica < 0){
        indexMusica = 3;
    }
    renderizarMusica(indexMusica);
});

proxima.addEventListener("click", () => {
    indexMusica++;
    if(indexMusica > 3){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
})

//FUNCOES DOS EVENTOS
function renderizarMusica(index){
    musica.setAttribute("src", todasMusicas[index].src)
    musica.addEventListener("loadeddata", () => {
        nomeMusica.textContent = todasMusicas[index].titulo;
        imagemDaMusica.src = todasMusicas[index].imagem;
        fimMusica.textContent = segundoParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    botPause.style.display = "block";
    botPlay.style.display = "none";
}

function pausarMusica(){
    musica.pause();
    botPause.style.display = "none";
    botPlay.style.display = "block";
}

function atualizarBarra (){
    let barra = document.querySelector("progress");
    let tempoDecorrido = document.querySelector(".inicio");
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + "%";
    tempoDecorrido.textContent = segundoParaMinutos(Math.floor(musica.currentTime));
}

function segundoParaMinutos(segundos){
    let CampoMinutos = Math.floor(segundos / 60);
    let CampoSegundos = segundos % 60;
    if(CampoSegundos<10){
    CampoSegundos = "0" + CampoSegundos;
    }

    return CampoMinutos + ":" + CampoSegundos
}

console.log(imagemDaMusica)

