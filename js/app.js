import { inicializarFormulario } from "./modules/form.js";
import { inicializarNavegacao } from "./modules/navigation.js";
import { inicializarRoteador } from "./modules/router.js";
import { inicializarToast } from "./modules/feedback.js";

inicializarNavegacao();
inicializarToast();

window.addEventListener("ecotravessia:renderizada", () => {
    inicializarFormulario();
});

inicializarRoteador();
