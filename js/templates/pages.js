import { indicadores, projetos } from "../data.js";

// A URL relativa da imagem funciona em servidores estáticos e no Live Server.
const imagemHero = new URL("../../imagens/Ecotravessia-otimizada.jpg", import.meta.url).href;

const etiqueta = (texto) => `<span class="etiqueta">${texto}</span>`;

function renderInicio() {
    return `
        <section class="hero" aria-labelledby="titulo-inicio">
            <div class="hero-imagem-wrap">
                <img
                    class="hero-imagem"
                    src="${imagemHero}"
                    alt="Lobo-guará junto a uma estrada, ao lado da mensagem de proteção da fauna"
                    width="1536"
                    height="1024"
                    fetchpriority="high">
            </div>
            <div class="hero-conteudo">
                ${etiqueta("Proteção da fauna silvestre")}
                <h1 id="titulo-inicio">Toda vida merece chegar ao outro lado.</h1>
                <p>
                    A EcoTravessia é uma organização sem fins lucrativos dedicada à
                    conscientização sobre os atropelamentos de animais silvestres.
                    Promovemos educação ambiental e incentivamos estradas mais seguras
                    para a fauna brasileira.
                </p>
                <div class="hero-acoes">
                    <a class="botao botao-primario" href="#/voluntario" data-link>Seja voluntário</a>
                    <a class="botao botao-secundario" href="#/projetos" data-link>Conheça os projetos</a>
                </div>
            </div>
        </section>
        <section class="secao-destaque" aria-labelledby="titulo-missao-inicial">
            <div>
                ${etiqueta("Nossa causa")}
                <h2 id="titulo-missao-inicial">Estradas mais seguras para todos</h2>
                <p>
                    Trabalhamos para reduzir os atropelamentos de animais silvestres
                    por meio da educação, da conscientização e da preservação da
                    biodiversidade.
                </p>
            </div>
            <a class="botao botao-primario" href="#/ong/missao" data-link>Conheça a EcoTravessia</a>
        </section>
    `;
}

function renderOng() {
    return `
        <section class="pagina-cabecalho" aria-labelledby="titulo-ong">
            ${etiqueta("Quem somos")}
            <h1 id="titulo-ong">A EcoTravessia</h1>
            <p>Conheça nossa missão, visão e os valores que orientam cada ação.</p>
        </section>
        <section id="missao" class="cartao-informativo" aria-labelledby="titulo-missao">
            <h2 id="titulo-missao">Missão</h2>
            <p>
                Reduzir os atropelamentos de animais silvestres por meio da educação
                ambiental, da conscientização da população e do incentivo à
                preservação da biodiversidade.
            </p>
        </section>
        <section id="visao" class="cartao-informativo" aria-labelledby="titulo-visao">
            <h2 id="titulo-visao">Visão</h2>
            <p>
                Ser referência nacional na proteção da fauna brasileira, promovendo
                estradas mais seguras e sustentáveis.
            </p>
        </section>
        <section id="valores" class="cartao-informativo" aria-labelledby="titulo-valores">
            <h2 id="titulo-valores">Valores</h2>
            <ul class="lista-valores">
                <li>Respeito à vida</li>
                <li>Preservação ambiental</li>
                <li>Educação ambiental</li>
                <li>Responsabilidade social</li>
                <li>Transparência</li>
            </ul>
        </section>
    `;
}

function renderProjetos() {
    const cartoes = projetos.map((projeto) => `
        <article class="cartao-projeto">
            <span class="etiqueta" aria-hidden="true">Projeto ativo</span>
            <div class="cartao-icone" aria-hidden="true">${projeto.icone}</div>
            <h2>${projeto.titulo}</h2>
            <p>${projeto.descricao}</p>
        </article>
    `).join("");

    return `
        <section aria-labelledby="titulo-projetos">
            ${etiqueta("Nossas ações")}
            <h1 id="titulo-projetos">Projetos para proteger a fauna</h1>
            <p class="texto-introdutorio">
                Conheça algumas frentes de trabalho da EcoTravessia.
            </p>
            <div class="grade-projetos">${cartoes}</div>
        </section>
    `;
}

function renderImpacto() {
    const cartoes = indicadores.map((indicador) => `
        <article class="cartao-impacto">
            <strong>${indicador.valor}</strong>
            <span>${indicador.rotulo}</span>
        </article>
    `).join("");

    return `
        <section class="secao-impacto" aria-labelledby="titulo-impacto">
            ${etiqueta("Resultados")}
            <h1 id="titulo-impacto">Nosso impacto</h1>
            <p>
                Cada pessoa voluntária e cada campanha contribui para estradas mais
                seguras e para a preservação da vida silvestre.
            </p>
            <div class="grade-impacto">${cartoes}</div>
        </section>
    `;
}

function renderVoluntario() {
    return `
        <section class="pagina-cabecalho" aria-labelledby="titulo-voluntario">
            ${etiqueta("Participe")}
            <h1 id="titulo-voluntario">Seja voluntário</h1>
            <p>Preencha seus dados para registrar seu interesse em participar.</p>
        </section>
        <section class="secao-formulario" aria-labelledby="titulo-formulario">
            <h2 id="titulo-formulario">Cadastro de voluntários</h2>
            <form id="formulario-voluntario" novalidate>
                <div class="campo">
                    <label for="nome">Nome completo <span aria-hidden="true">*</span></label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        autocomplete="name"
                        aria-describedby="erro-nome"
                        required>
                    <span class="mensagem-campo" id="erro-nome" aria-live="polite"></span>
                </div>
                <div class="campo">
                    <label for="email">E-mail <span aria-hidden="true">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="email"
                        aria-describedby="erro-email"
                        required>
                    <span class="mensagem-campo" id="erro-email" aria-live="polite"></span>
                </div>
                <div class="campo">
                    <label for="telefone">Telefone (opcional)</label>
                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        autocomplete="tel"
                        inputmode="tel"
                        aria-describedby="erro-telefone">
                    <span class="mensagem-campo" id="erro-telefone" aria-live="polite"></span>
                </div>
                <p class="aviso-privacidade">
                    Este protótipo guarda o último cadastro somente neste navegador;
                    ele não é enviado à ONG. Use dados fictícios em demonstrações.
                </p>
                <button class="botao botao-primario" type="submit">Registrar interesse</button>
                <p id="feedback-formulario" class="alerta" role="status" aria-live="polite" hidden></p>
            </form>
        </section>
    `;
}

function renderDoacao() {
    return `
        <section class="pagina-cabecalho secao-doacao" aria-labelledby="titulo-doacao">
            ${etiqueta("Apoie a causa")}
            <h1 id="titulo-doacao">Ajude a proteger a fauna</h1>
            <p>
                Sua contribuição pode apoiar pesquisas, campanhas educativas e
                iniciativas de preservação.
            </p>
            <p>
                Para combinar uma forma de contribuição, entre em contato com a
                EcoTravessia.
            </p>
            <a class="botao botao-destaque" href="#/contato" data-link>Fale conosco</a>
        </section>
    `;
}

function renderContato() {
    return `
        <section class="pagina-cabecalho" aria-labelledby="titulo-contato">
            ${etiqueta("Vamos conversar")}
            <h1 id="titulo-contato">Contato</h1>
            <p>Entre em contato para saber mais sobre projetos, voluntariado e apoio.</p>
            <address class="cartao-contato">
                <p><strong>E-mail:</strong> <a href="mailto:contato@ecotravessia.org">contato@ecotravessia.org</a></p>
                <p><strong>Localização:</strong> Mairiporã - SP</p>
            </address>
        </section>
    `;
}

export const paginas = {
    inicio: { titulo: "Início", render: renderInicio },
    ong: { titulo: "A ONG", render: renderOng },
    projetos: { titulo: "Projetos", render: renderProjetos },
    impacto: { titulo: "Impacto", render: renderImpacto },
    voluntario: { titulo: "Seja voluntário", render: renderVoluntario },
    doacao: { titulo: "Doação", render: renderDoacao },
    contato: { titulo: "Contato", render: renderContato }
};

