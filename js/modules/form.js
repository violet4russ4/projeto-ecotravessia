import { carregarCadastro, salvarCadastro } from "./storage.js";
import { mostrarToast } from "./feedback.js";

const mensagens = {
    nome: "Informe seu nome completo (pelo menos 2 caracteres).",
    email: "Informe um endereço de e-mail válido.",
    telefone: "Informe um telefone válido ou deixe o campo em branco."
};

function erroDoCampo(campo) {
    const valor = campo.value.trim();

    if (campo.name === "nome") {
        return valor.length >= 2 ? "" : mensagens.nome;
    }

    if (campo.name === "email") {
        return valor && campo.validity.valid ? "" : mensagens.email;
    }

    if (campo.name === "telefone" && valor) {
        return /^[+()\d\s.-]{8,20}$/.test(valor) ? "" : mensagens.telefone;
    }

    return "";
}

export function inicializarFormulario() {
    const formulario = document.getElementById("formulario-voluntario");
    if (!formulario) return;

    const campos = [...formulario.querySelectorAll("input")];
    const campoNome = formulario.querySelector("#nome");
    const campoEmail = formulario.querySelector("#email");
    const campoTelefone = formulario.querySelector("#telefone");
    const feedback = document.getElementById("feedback-formulario");
    const tocados = new Set();

    const cadastroSalvo = carregarCadastro();
    if (cadastroSalvo) {
        campoNome.value = cadastroSalvo.nome;
        campoEmail.value = cadastroSalvo.email;
        campoTelefone.value = cadastroSalvo.telefone;
    }

    function validar(campo) {
        const mensagem = erroDoCampo(campo);
        const saida = document.getElementById(`erro-${campo.name}`);
        const preenchido = campo.value.trim().length > 0;

        campo.classList.toggle("campo-invalido", Boolean(mensagem));
        campo.classList.toggle("campo-valido", preenchido && !mensagem);
        campo.setAttribute("aria-invalid", String(Boolean(mensagem)));

        if (saida) saida.textContent = mensagem;
        return !mensagem;
    }

    function mostrarFeedback(mensagem) {
        if (!feedback) return;

        feedback.textContent = mensagem;
        feedback.className = "alerta alerta-erro";
        feedback.hidden = false;
    }

    campos.forEach((campo) => {
        campo.addEventListener("blur", () => {
            tocados.add(campo.name);
            validar(campo);
        });

        campo.addEventListener("input", () => {
            if (tocados.has(campo.name)) validar(campo);
            if (feedback) feedback.hidden = true;
        });
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const validos = campos.map((campo) => {
            tocados.add(campo.name);
            return validar(campo);
        });

        if (validos.includes(false)) {
            mostrarFeedback("Revise os campos destacados antes de continuar.");
            campos[validos.indexOf(false)].focus();
            return;
        }

        const cadastro = {
            nome: campoNome.value.trim(),
            email: campoEmail.value.trim(),
            telefone: campoTelefone.value.trim()
        };

        if (!salvarCadastro(cadastro)) {
            mostrarFeedback(
                "O navegador não permitiu salvar o cadastro. Seus dados não foram enviados."
            );
            return;
        }

        if (feedback) feedback.hidden = true;
        mostrarToast(
            "Cadastro salvo neste navegador. Nenhum dado foi enviado à EcoTravessia."
        );
    });
}
