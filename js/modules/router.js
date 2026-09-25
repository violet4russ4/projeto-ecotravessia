import { paginas } from "../templates/pages.js";

function lerRota() {
    const fragmento = window.location.hash.replace(/^#\/?/, "");
    const partes = fragmento.split("/").filter(Boolean);

    return {
        pagina: partes[0] || "inicio",
        secao: partes[1] || ""
    };
}

function atualizarNavegacao(paginaAtual) {
    document.querySelectorAll("[data-link]").forEach((link) => {
        const rota = link.getAttribute("href").replace(/^#\/?/, "").split("/")[0];
        if (rota === paginaAtual) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

export function inicializarRoteador() {
    const app = document.getElementById("app");
    if (!app) return;

    function renderizar() {
        const { pagina, secao } = lerRota();
        const configuracao = paginas[pagina];

        if (configuracao) {
            app.innerHTML = configuracao.render();
            document.title = `${configuracao.titulo} | EcoTravessia`;
        } else {
            app.innerHTML = `
                <section class="pagina-cabecalho" aria-labelledby="titulo-nao-encontrado">
                    <h1 id="titulo-nao-encontrado">Página não encontrada</h1>
                    <p>O endereço solicitado não existe.</p>
                    <a class="botao botao-primario" href="#/inicio" data-link>Voltar ao início</a>
                </section>
            `;
            document.title = "Página não encontrada | EcoTravessia";
        }

        atualizarNavegacao(pagina);
        window.dispatchEvent(new CustomEvent("ecotravessia:renderizada"));

        requestAnimationFrame(() => {
            const destino = secao ? document.getElementById(secao) : null;
            if (destino) {
                destino.scrollIntoView({ behavior: "smooth", block: "start" });
                destino.setAttribute("tabindex", "-1");
                destino.focus({ preventScroll: true });
                return;
            }

            const titulo = app.querySelector("h1");
            titulo?.setAttribute("tabindex", "-1");
            titulo?.focus({ preventScroll: true });
        });
    }

    document.addEventListener("click", (evento) => {
        const link = evento.target.closest("a[data-link]");
        if (!link || evento.defaultPrevented) return;

        evento.preventDefault();
        if (window.location.hash === link.getAttribute("href")) {
            renderizar();
        } else {
            window.location.hash = link.getAttribute("href");
        }
    });

    window.addEventListener("hashchange", renderizar);
    renderizar();
}
