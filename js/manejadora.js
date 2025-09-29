document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const obj = {
                nombre: document.querySelector("#nombre").value,
                email: document.querySelector("#email").value,
                clave: document.querySelector("#clave").value,
                pais: document.querySelector("#pais").value
            };

            console.log(obj);
            alert("✅ Todos los campos son válidos. Enviando datos...");
        } else {
            alert("❌ Hay errores en el formulario. Por favor, corregí los campos marcados.");
            const camposInvalidos = form.querySelectorAll(':invalid');

            camposInvalidos.forEach(campo => {
                console.log(`Campo inválido: ${campo.id}`);
                console.log(campo.validity); // Objeto validityState

                const divError = document.getElementById(`error-${campo.id}`);
                if (divError) {
                    divError.textContent = generarMensajeError(campo);
                }
            });
        }

        form.classList.add('was-validated');
    });

    form.addEventListener('reset', () => {
        setTimeout(() => {
            form.classList.remove('was-validated');
            const errores = document.querySelectorAll('.invalid-feedback');
            errores.forEach(div => div.textContent = '');
        }, 0);
    });

});

function generarMensajeError(campo) {
    const estado = campo.validity;

    if (estado.valueMissing) return "Este campo es obligatorio.";
    if (estado.typeMismatch) return "El formato ingresado no es válido.";
    if (estado.tooShort) return `Debe tener al menos ${campo.minLength} caracteres.`;
    if (estado.tooLong) return `Debe tener como máximo ${campo.maxLength} caracteres.`;
    if (estado.patternMismatch) return "El valor no coincide con el formato esperado.";
    if (estado.rangeUnderflow || estado.rangeOverflow) return "El valor está fuera del rango permitido.";
    if (estado.stepMismatch) return "El valor no es válido según el paso definido.";

    return "Campo inválido. Verificá el contenido.";
}
