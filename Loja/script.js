// Substitua 'YOUR_ACCESS_KEY' pela sua chave de acesso do Unsplash
const accessKey = 'IOKYSSRsHJJt8tnbuOVplLmCb59F0XH11jQ_yLj-XJE';

// Função para buscar imagens aleatórias relacionadas a "supermercado"
function buscarImagens() {
  fetch(`https://api.unsplash.com/photos/random?query=supermarket&client_id=${accessKey}`)
    .then(response => response.json())  // Converte a resposta para JSON
    .then(data => {
      // Exibindo a URL da primeira imagem (você pode mostrar mais, se quiser)
      console.log(data[0].urls.small);  // URL da imagem
      mostrarImagemNaTela(data[0].urls.small);
    })
    .catch(error => console.error('Erro ao buscar imagem:', error));
}

// Função para exibir a imagem na página HTML
function mostrarImagemNaTela(urlImagem) {
  const imgElement = document.createElement('img');
  imgElement.src = urlImagem;
  imgElement.alt = "Imagem de supermercado";
  imgElement.style.width = '300px';  // Ajuste o tamanho da imagem conforme necessário

  // Exibindo a imagem em um elemento HTML
  document.getElementById('imagem-container').appendChild(imgElement);
}

// Chamando a função para buscar as imagens
buscarImagens();

// declaração de variavel produtos, global
let produtos

//habilita uma função quando a janela é carregada
window.onload = function(){
    var storagedUser = localStorage.getItem("usuario")
    var user = JSON.parse(storagedUser)
    document.getElementById("user").textContent = user.name
    document.getElementById("perfil").textContent = user.name
    document.getElementById("idPerfil").textContent = user.id
}

document.addEventListener("DOMContentLoaded", function(){
    //fetch dos produtos e armazenamento na variavel global
    fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
        produtos = data
        console.log(produtos)
        const produtosContainer = document.getElementById("produtos-container")

        produtos.forEach((produto, index) => {
            console.log(produto)
            const card = document.createElement("div")
            card.className = "card"
            card.style.width = "18rem"
            card.style.margin = "10px"

            const imagem = document.createElement("img")
            imagem.src = produto.imagem
            imagem.className = "card-img-top"

            const cardBody = document.createElement("div")
            cardBody.className = "card-body"

            const cardTitle = document.createElement("h5")
            cardTitle.className = "card-title"
            cardTitle.textContent = produto.descricao

            const cardText = document.createElement("p")
            cardText.className = "card-text"
            cardText.textContent = "Preço $" + produto.preco.toFixed(2)

            const btnAddCarrinho = document.createElement("a")
            btnAddCarrinho.href = '#'
            btnAddCarrinho.className = "btn btn-primary btn-add-Carrinho"
            btnAddCarrinho.setAttribute("data-indice", index)
            btnAddCarrinho.textContent = "Adicionar ao carrinho"

            cardBody.appendChild(cardTitle)
            cardBody.appendChild(cardText)
            cardBody.appendChild(btnAddCarrinho)

            card.appendChild(imagem)
            card.appendChild(cardBody)

            produtosContainer.appendChild(card)
        })
    })
    .catch((error) => console.log("Erro ao carregar arquivo JSON", error))

    $("#produtos-container").on("click", ".btn-add-Carrinho", function(){
        const indexProduto = $(this).data("indice")
        const produtoSelecionado = produtos[indexProduto]
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(produtoSelecionado)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        alert("Produto adicionado ao carrinho!")

    })
})