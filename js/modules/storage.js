const CHAVE_CADASTRO = "ecotravessia:ultimo-voluntario";

export function carregarCadastro() {
    try {
        const texto = window.localStorage.getItem(CHAVE_CADASTRO) ?? window.localStorage.getItem("voluntario");
        if (!texto) return null;

        const dados = JSON.parse(texto);
        if (
            !dados ||
            typeof dados !== "object" ||
            typeof dados.nome !== "string" ||
            typeof dados.email !== "string"
        ) {
            return null;
        }

        return {
            nome: dados.nome,
            email: dados.email,
            telefone: typeof dados.telefone === "string" ? dados.telefone : ""
        };
    } catch {
        return null;
    }
}

export function salvarCadastro(cadastro) {
    try {
        window.localStorage.setItem(CHAVE_CADASTRO, JSON.stringify(cadastro));
        return true;
    } catch {
        return false;
    }
}

