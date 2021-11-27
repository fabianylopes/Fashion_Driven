let cont = 0;

let modelo = "";
let gola = "";
let tecido = "";

let dados;

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

let botao = document.querySelector("button");
botao.disabled = true;

function verificarPedido() {
    const url = document.querySelector("input");

    if(cont === 3 && validarURL(url.value)){
        const button = document.querySelector(".confirmar-pedido");
        button.classList.add("clicavel");
        botao.disabled = false;
    }
}

function validarURL(url){
    let link = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(link.test(url)){
        return true;
    }else{
        return false;
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
    alert("Pedido Confirmado!");
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
    
    dados = resposta.data;
    
    for(let i = 0; i < 5; i++){
        recentes.innerHTML += `
        <div class="recente" onclick="fazerPedido(${i})">
            <img src="${dados[i].image}">
            <div class="legenda"><span class="bold">Criador: </span>${dados[i].owner}</div>
        </div>
        `
    }
}

mostrarRecentes();

function fazerPedido(camisa) {
    let mensagem = "Deseja confirmar este pedido?";
    resultado = window.confirm(mensagem);
    
    if(resultado){
        escolherPronta(camisa);
    }
}

function escolherPronta(i) {
    const camisa = dados[i];

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',
    {
        model: camisa.model,
        neck: camisa.neck,
        material: camisa.material,
        image: camisa.image,
        owner: camisa.owner,
        author: nome
    }
    );

    promessa.then(confirmada);
    promessa.catch(naoConfirmada);
}
