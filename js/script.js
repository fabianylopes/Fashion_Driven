let cont = 0;

let modelo;
let gola;
let tecido;

let urlImagem = "https://www.industriallogic.com/img/blog/2013/09/800px-Slava_Zaitsev_fashion_show-2.jpg";

//let nome = prompt("Qual o seu lindo nome? ");

function selecionarModelo(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".modelo.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }

    modelo = "blusa"

    marcado.classList.add("selecionado");
    verificarPedido();
}

function selecionarGola(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".gola.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }
  
    gola = "v"

    marcado.classList.add("selecionado");
    verificarPedido();

}

function selecionarTecido(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".tecido.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }

    tecido = "algodão"

    marcado.classList.add("selecionado");
    verificarPedido();
}

function verificarPedido() {
    if(cont === 3){
        const botao = document.querySelector(".confirmar-pedido");
        botao.classList.add("clicavel")
    }
}


// function validarImagem() {
    
//     urlImagem = document.querySelector(".url-imagem").value;

// }

// function confirmarPedido() {
// }


function confirmarPedido(){
    const promessa = axis.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',
    {
        model: modelo,
        neck: gola,
        material: tecido,
        image: urlImagem,
        owner: nome,
        author: nome
    }
    
    );

    promessa.then(confirmada);
    promessa.catch(naoConfirmada);
    
}

function confirmada() {
    alert("Encomenda Confirmada!");
}

function naoConfirmada() {
    alert("Ops, não conseguimos processar sua encomenda");
}
