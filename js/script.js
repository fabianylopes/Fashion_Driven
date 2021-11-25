let cont = 0;

//let nome = prompt("Qual o seu lindo nome? ");

function selecionarModelo(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".modelo.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }

    marcado.classList.add("selecionado");
}

function selecionarGola(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".gola.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }

    marcado.classList.add("selecionado");
}

function selecionarTecido(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".tecido.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }

    marcado.classList.add("selecionado");
}
