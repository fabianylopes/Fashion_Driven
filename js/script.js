let cont = 0;

let modelo = "";
let gola = "";
let tecido = "";

let nome = prompt("Qual o seu lindo nome? ");

function selecionarModelo(item) {
    const marcado = item.querySelector(".circulo");
    const selecionado = document.querySelector(".modelo.selecionado");
    
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }else{
        cont++;
    }
    
    if(item.innerText === "Manga Longa"){
        modelo = "long";
    }else if(item.innerText === "Camiseta"){
        modelo = "top-tank";
    }else if(item.innerText === "T-Shirt"){
        modelo = "t-shirt";
    }
        
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
  
    if(item.innerText === "Gola V"){
        gola = "v-neck";
    }else if(item.innerText === "Gola Redonda"){
        gola = "round";
    }else if(item.innerText === "Gola Polo"){
        gola = "polo";
    }
    
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

    if(item.innerText === "Seda"){
        tecido = "silk";
    }else if(item.innerText === "Algodão"){
        tecido = "cotton";
    }else if(item.innerText === "Poliéster"){
        tecido = "polyester";
    }
    
    marcado.classList.add("selecionado");
    verificarPedido();
}

function verificarPedido() {
    if(cont === 3){
        const botao = document.querySelector(".confirmar-pedido");
        botao.classList.add("clicavel")
    }
}


function confirmarPedido(){
    const url = document.querySelector("input");

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',
    {
        model: modelo,
        neck: gola,
        material: tecido,
        image: url.value,
        owner: nome,
        author: nome
    }
    );

    promessa.then(confirmada);
    promessa.catch(naoConfirmada);
}

function confirmada() {
    alert("Encomenda Confirmada!");
    mostrarRecentes();
}

function naoConfirmada() {
    alert("Ops, não conseguimos processar sua encomenda");
}

function mostrarRecentes() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promessa.then(ultimosPedidos);
}

function ultimosPedidos(resposta) {
    const recentes = document.querySelector(".ultimos-pedidos");
    recentes.innerHTML = "";

    let dados = resposta.data;

    for(let i = 0; i < 5; i++){
        recentes.innerHTML += `
        <div class="recente" onclick="fazerPedido()">
            <img src="${dados[i].image}">
            <div class="legenda"><span class="bold">Criador: </span>${dados[i].owner}</div>
        </div>
        `
    }
    console.log(resposta);
}

mostrarRecentes();

function fazerPedido() {
    let mensagem = "Deseja confirmar este pedido?";
    resultado = window.confirm(mensagem);

    if(resultado){
        confirmarPedido();
    }
}