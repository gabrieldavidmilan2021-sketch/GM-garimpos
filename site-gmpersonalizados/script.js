// Pequena animação ao clicar nos links do menu

const links = document.querySelectorAll(".menu a");

links.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navegando para: " + link.textContent);
    });
});