export function inicializarNavegacao() {
    const cabecalho = document.querySelector(".header");
    const botaoMenu = document.getElementById("menu-toggle");
    const botoesDropdown = document.querySelectorAll(".dropdown-toggle");

    if (!cabecalho || !botaoMenu) return;

    function definirMenu(aberto) {
        cabecalho.classList.toggle("menu-aberto", aberto);
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu principal" : "Abrir menu principal"
        );
    }

    function fecharSubmenus() {
        botoesDropdown.forEach((botao) => {
            botao.setAttribute("aria-expanded", "false");
            botao.closest(".dropdown")?.classList.remove("dropdown-aberto");
        });
    }

    botaoMenu.addEventListener("click", () => {
        const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
        definirMenu(!aberto);
    });

    botoesDropdown.forEach((botao) => {
        botao.addEventListener("click", () => {
            const aberto = botao.getAttribute("aria-expanded") === "true";
            botao.setAttribute("aria-expanded", String(!aberto));
            botao.closest(".dropdown")?.classList.toggle("dropdown-aberto", !aberto);
        });
    });

    document.addEventListener("click", (evento) => {
        if (evento.target.closest("[data-link]")) {
            definirMenu(false);
            fecharSubmenus();
        } else if (!evento.target.closest(".dropdown")) {
            fecharSubmenus();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key !== "Escape") return;

        const dropdownAberto = document.querySelector(".dropdown-aberto .dropdown-toggle");
        if (dropdownAberto) {
            dropdownAberto.setAttribute("aria-expanded", "false");
            dropdownAberto.closest(".dropdown")?.classList.remove("dropdown-aberto");
            dropdownAberto.focus();
            return;
        }

        if (botaoMenu.getAttribute("aria-expanded") === "true") {
            definirMenu(false);
            botaoMenu.focus();
        }
    });
}
