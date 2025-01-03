// Preguntas y respuestas
const preguntas = [
    {
      pregunta: "¿Que edad cumplire?",
      opciones: ["35", "36", "37", "34"],
      respuesta: 1,
    },
    {
      pregunta: "¿Cual es mi segundo nombre?",
      opciones: ["Luis", "Jose", "Manuel", "Felipe"],
      respuesta: 0,
    },
    {
      pregunta: "¿En qué mes nací?",
      opciones: ["Agosto", "Septiembre", "Octubre", "Noviembre"],
      respuesta: 2,
    },

    {
        pregunta: "¿Cual es mi deporte favorito?",
        opciones: ["Futbol", "Tenis", "Surf", "Basquet"],
        respuesta: 2,
      },
  ];
  
  let preguntaActual = 0;
  let errores = 0;
  let valorPorError = 100; // Valor acumulado por error
  
  // Referencias a elementos del DOM
  const quizContainer = document.getElementById("quiz");
  const welcomeContainer = document.getElementById("welcome");
  const resultContainer = document.getElementById("result");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const finalMessage = document.getElementById("finalMessage");
  const giftMessage = document.getElementById("giftMessage");
  
  // Función para iniciar el cuestionario
  function startQuiz() {
    welcomeContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    mostrarPregunta();
  }
  // Variable para guardar la opción seleccionada
let opcionSeleccionada = null;

// Mostrar pregunta actual con resaltado y selección
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];
  questionElement.textContent = pregunta.pregunta;
  optionsElement.innerHTML = ""; // Limpiar opciones
  opcionSeleccionada = null; // Reiniciar selección

  pregunta.opciones.forEach((opcion, index) => {
    const button = document.createElement("button");
    button.textContent = opcion;
    button.classList.add("option-btn");

    // Evento al hacer clic en una opción
    button.onclick = () => {
      // Elimina la clase 'selected' de cualquier opción previamente seleccionada
      const botones = document.querySelectorAll(".option-btn");
      botones.forEach((btn) => btn.classList.remove("selected"));

      // Resaltar la opción seleccionada
      button.classList.add("selected");
      opcionSeleccionada = index; // Guardar la opción seleccionada
    };

    optionsElement.appendChild(button);
  });
}

// Evaluar respuesta del usuario
function evaluarRespuesta() {
  if (opcionSeleccionada === null) {
    alert("Por favor, selecciona una opción antes de continuar.");
    return false; // Evita pasar a la siguiente pregunta si no hay selección
  }

  const respuestaCorrecta = preguntas[preguntaActual].respuesta;
  if (opcionSeleccionada !== respuestaCorrecta) {
    errores++;
  }
  return true; // Permite pasar a la siguiente pregunta
}

// Pasar a la siguiente pregunta o mostrar resultados
function nextQuestion() {
  if (!evaluarRespuesta()) return; // Solo avanza si hay una selección válida
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
}

  
  // Mostrar resultados finales
  function mostrarResultados() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  
    if (errores === 0) {
      finalMessage.textContent = "¡Felicidades! No necesitas llevar regalo.";
      giftMessage.textContent = "";
    } else {
      finalMessage.textContent = "¡Estás invitado!";
      giftMessage.textContent = `Pero necesitas llevar un regalo valorizado en S/ ${
        errores * valorPorError
      }.`;
    }
  }
  

  let tiempoRestante = 10; // Tiempo inicial en segundos
let intervalo; // Variable para almacenar el intervalo

// Mostrar cronómetro
function iniciarCronometro() {
  const timerElement = document.getElementById("timer"); // Asegúrate de tener este elemento en tu HTML
  tiempoRestante = 10; // Reiniciar el tiempo
  timerElement.textContent = `Tiempo restante: ${tiempoRestante}s`;

  // Detener cualquier intervalo previo
  clearInterval(intervalo);

  // Actualizar cronómetro cada segundo
  intervalo = setInterval(() => {
    tiempoRestante--;
    timerElement.textContent = `Tiempo restante: ${tiempoRestante}s`;

    if (tiempoRestante <= 0) {
      clearInterval(intervalo); // Detener el cronómetro
      alert("¡Se acabó el tiempo! Pasamos a la siguiente pregunta.");
      nextQuestion(); // Pasar automáticamente a la siguiente pregunta
    }
  }, 1000);
}

// Modifica la función mostrarPregunta para iniciar el cronómetro
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];
  questionElement.textContent = pregunta.pregunta;
  optionsElement.innerHTML = ""; // Limpiar opciones
  opcionSeleccionada = null; // Reiniciar selección

  pregunta.opciones.forEach((opcion, index) => {
    const button = document.createElement("button");
    button.textContent = opcion;
    button.classList.add("option-btn");

    button.onclick = () => {
      const botones = document.querySelectorAll(".option-btn");
      botones.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      opcionSeleccionada = index;
    };

    optionsElement.appendChild(button);
  });

  iniciarCronometro(); // Iniciar el cronómetro al mostrar la pregunta
}

// Modifica la función nextQuestion para detener el cronómetro
function nextQuestion() {
  if (!evaluarRespuesta()) return; // Solo avanza si hay una selección válida
  clearInterval(intervalo); // Detener el cronómetro al avanzar
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
}


