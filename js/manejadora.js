document.addEventListener("DOMContentLoaded", () => {
  const mensajes = {
    "nombre": {
      valueMissing: "El campo nombre es obligatorio."
    },
    "email": {
      valueMissing: "El campo email es obligatorio.",
      typeMismatch: "El formato ingresado no es válido. Ej: prueba@mail.com"
    },
    "clave": {
      valueMissing: "El campo clave es obligatorio.",
      tooShort: campo => `Debe tener al menos ${campo.minLength} caracteres.`,
      tooLong: campo => `Debe tener como máximo ${campo.maxLength} caracteres.`
    },
    "pais": {
      valueMissing: "El campo país es obligatorio."
    },
    "terminos": {
      valueMissing: "El campo términos es obligatorio."
    }
  };

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
      limpiarFormulario(form);
    } else {
      alert("❌ Hay errores en el formulario. Por favor, corregí los campos marcados.");
      const camposInvalidos = form.querySelectorAll(':invalid');

      camposInvalidos.forEach(campo => {
        console.log(`Campo inválido: ${campo.id}`);
        console.log(campo.validity);
        generarMensajeError(campo);
      });
    }

    form.classList.add('was-validated');
  });

  form.addEventListener('reset', () => {
    setTimeout(() => limpiarFormulario(form), 0);
  });

  function generarMensajeError(campo) {
    const id = campo.id;
    const divError = document.getElementById("error-" + id);
    if (!divError || !mensajes[id]) return;

    for (const error in campo.validity) {
      if (campo.validity[error] && mensajes[id][error]) {
        const mensaje = typeof mensajes[id][error] === 'function'
          ? mensajes[id][error](campo)
          : mensajes[id][error];
        divError.textContent = mensaje;
        break;
      }
    }
  }

  function limpiarFormulario(form) {
    form.reset();
    form.classList.remove('was-validated');

    const errores = form.querySelectorAll('.invalid-feedback');
    errores.forEach(div => div.textContent = '');
  }
});
