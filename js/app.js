//? Variables

const enviarBtn = document.querySelector("#enviar");

const resetBtn = document.querySelector("#resetBtn");

const formulario = document.querySelector("#enviar-mail");

//* Variables campos del formulario

const email = document.querySelector("#email");

const asunto = document.querySelector("#asunto");

const mensaje = document.querySelector("#mensaje");

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//? Inicialización listeners

cargaEventListeners();

function cargaEventListeners() {
  //* Al iniciar la app
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //* Validaciones

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //* Resetear formulario

  resetBtn.addEventListener("click", resetearFormulario);

  //* Enviar email

  formulario.addEventListener("submit", enviarEmail);
}
//? Funciones

function iniciarApp() {
  enviarBtn.disabled = true;
  enviarBtn.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(event) {
  if (event.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    event.target.classList.remove("border", "border-red-500");
    event.target.classList.add("border", "border-green-500");
  } else {
    event.target.classList.remove("border", "border-green-500");
    event.target.classList.add("border", "border-red-500");

    mostrarError("Todos los campos son obligatorios");
  }

  if (event.target.type === "email") {
    if (er.test(event.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      event.target.classList.remove("border", "border-red-500");
      event.target.classList.add("border", "border-green-500");
    } else {
      event.target.classList.remove("border", "border-green-500");
      event.target.classList.add("border", "border-red-500");

      mostrarError("Email no válido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    enviarBtn.disabled = false;
    enviarBtn.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    //! Añadido por mi
    mostrarError("Faltan campos por rellenar");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  //* Usamos querySelectorAll debido a que posee la propiedad length y es más fácil comprobar si hay errores
  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(event) {
  event.preventDefault();

  //* Mostrar spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //* Despues de 3 segundos ocultar spinner y mostrar mensaje
  setTimeout(() => {
    spinner.style.display = "none";

    //* Mensaje de envio correcto
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envió correctamene";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}

//* Funcion resetear formulario

function resetearFormulario() {
  formulario.reset();
  email.classList.remove("border", "border-green-500");
  asunto.classList.remove("border", "border-green-500");
  mensaje.classList.remove("border", "border-green-500");
  iniciarApp();
}
