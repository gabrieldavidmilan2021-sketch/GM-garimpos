const PRECO_PRODUTO = 69.90;
const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format(PRECO_PRODUTO);

document.querySelectorAll("[data-preco-produto]").forEach(elemento => {
    elemento.textContent = precoFormatado;
});

const links = document.querySelectorAll(".menu a");

links.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navegando para: " + link.textContent);
    });
});

const modalCompra = document.querySelector("#modal-compra");
const formularioCompra = document.querySelector("#formulario-compra");
const nomeComprador = document.querySelector("#nome-comprador");
const cepComprador = document.querySelector("#cep-comprador");
const produtoSelecionado = document.querySelector("#produto-selecionado");
const produtoDaFicha = document.querySelector("#produto-da-ficha");
const tecidoProduto = document.querySelector("#tecido-produto");
const precoProduto = document.querySelector("#preco-produto");
const tamanhoProduto = document.querySelector("#tamanho-produto");
const tamanhoSelecionado = document.querySelector("#tamanho-selecionado");
const etapaFicha = document.querySelector("#etapa-ficha");
const etapaDados = document.querySelector("#etapa-dados");
const etiquetaEtapaCompra = document.querySelector("#etapa-compra-etiqueta");
const tituloEtapaCompra = document.querySelector("#titulo-modal-compra");
const descricaoEtapaCompra = document.querySelector("#descricao-etapa-compra");
const botoesComprar = document.querySelectorAll(".botao-comprar");
const botaoFecharModal = document.querySelector(".fechar-modal");
const botaoAvancarParaDados = document.querySelector("#avancar-para-dados");
const botaoVoltarParaFicha = document.querySelector("#voltar-para-ficha");

const mostrarEtapaCompra = fichaAtiva => {
    etapaFicha.hidden = !fichaAtiva;
    etapaDados.hidden = fichaAtiva;

    etiquetaEtapaCompra.textContent = fichaAtiva ? "FICHA TÉCNICA" : "ETAPA 2 DE 2";
    tituloEtapaCompra.textContent = fichaAtiva
        ? "Confira os detalhes do produto"
        : "Continuar pelo WhatsApp";
    descricaoEtapaCompra.textContent = fichaAtiva
        ? "Confira as informações e escolha o tamanho desejado."
        : "Informe seus dados para enviarmos seu pedido.";
};

botoesComprar.forEach(botao => {
    botao.addEventListener("click", () => {
        produtoSelecionado.textContent = botao.dataset.produto;
        produtoDaFicha.textContent = botao.dataset.produto;
        tecidoProduto.textContent = botao.dataset.tecido;
        precoProduto.textContent = precoFormatado;
        formularioCompra.reset();
        nomeComprador.setCustomValidity("");
        cepComprador.setCustomValidity("");
        tamanhoSelecionado.textContent = "";
        mostrarEtapaCompra(true);
        modalCompra.showModal();
        tamanhoProduto.focus();
    });
});

botaoAvancarParaDados.addEventListener("click", () => {
    if (!tamanhoProduto.reportValidity()) {
        return;
    }

    tamanhoSelecionado.textContent = tamanhoProduto.value;
    mostrarEtapaCompra(false);
    nomeComprador.focus();
});

botaoVoltarParaFicha.addEventListener("click", () => {
    mostrarEtapaCompra(true);
    tamanhoProduto.focus();
});

botaoFecharModal.addEventListener("click", () => {
    modalCompra.close();
});

modalCompra.addEventListener("click", evento => {
    if (evento.target === modalCompra) {
        modalCompra.close();
    }
});

nomeComprador.addEventListener("input", () => {
    nomeComprador.setCustomValidity("");
});

cepComprador.addEventListener("input", () => {
    const numeros = cepComprador.value.replace(/\D/g, "").slice(0, 8);
    cepComprador.value = numeros.length > 5
        ? `${numeros.slice(0, 5)}-${numeros.slice(5)}`
        : numeros;
    cepComprador.setCustomValidity("");
});

formularioCompra.addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = nomeComprador.value.trim();
    const cep = cepComprador.value.replace(/\D/g, "");

    if (nome.length < 2) {
        nomeComprador.setCustomValidity("Informe seu nome para continuar.");
        nomeComprador.reportValidity();
        return;
    }

    nomeComprador.setCustomValidity("");

    if (!/^\d{8}$/.test(cep)) {
        cepComprador.setCustomValidity("Digite um CEP válido com 8 números.");
        cepComprador.reportValidity();
        return;
    }

    cepComprador.setCustomValidity("");

    const mensagem = [
        "Olá! Quero comprar este produto:",
        `Produto: ${produtoSelecionado.textContent}`,
        `Preço: ${precoFormatado}`,
        `Tamanho: ${tamanhoProduto.value}`,
        `Nome: ${nome}`,
        `CEP: ${cep.slice(0, 5)}-${cep.slice(5)}`
    ].join("\n");

    window.location.assign(
        `https://wa.me/5511981599583?text=${encodeURIComponent(mensagem)}`
    );
});