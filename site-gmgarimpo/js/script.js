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
const botoesComprar = document.querySelectorAll(".botao-comprar");
const botaoFecharModal = document.querySelector(".fechar-modal");

botoesComprar.forEach(botao => {
    botao.addEventListener("click", () => {
        produtoSelecionado.textContent = botao.dataset.produto;
        formularioCompra.reset();
        nomeComprador.setCustomValidity("");
        cepComprador.setCustomValidity("");
        modalCompra.showModal();
        nomeComprador.focus();
    });
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
        `Nome: ${nome}`,
        `CEP: ${cep.slice(0, 5)}-${cep.slice(5)}`
    ].join("\n");

    window.location.assign(
        `https://wa.me/5511981599583?text=${encodeURIComponent(mensagem)}`
    );
});