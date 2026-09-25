export function inicializarToast() {
    const toast = document.getElementById("toast");
    const fechar = document.getElementById("fechar-toast");

    fechar?.addEventListener("click", () => {
        toast.hidden = true;
    });
}

export function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    const texto = document.getElementById("texto-toast");

    if (!toast || !texto) return;

    texto.textContent = mensagem;
    toast.hidden = false;
}
