const $ = (id) => document.getElementById(id);

const birthdayInput = $("birthday");
const nameInput = $("nameInput");

// CONFIGURACIÓN INICIAL
let targetDate = null;
let soundOn = false;
let audioContext = null;
let wishIndex = 0;

const DEFAULT_NAME = "Brenda (Papucha)";
const DEFAULT_BIRTHDAY = "2026-10-16";

// CALCULAR EL PRÓXIMO CUMPLEAÑOS
function nextBirthday(dateValue) {
  const [, month, day] = dateValue.split("-").map(Number);
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  let target = new Date(
    now.getFullYear(),
    month - 1,
    day,
    0, 0, 0
  );

  // Si el cumpleaños ya pasó, calcular el del próximo año.
  // Si es hoy, conservar la fecha para mostrar la felicitación.
  if (target < today) {
    target = new Date(
      now.getFullYear() + 1,
      month - 1,
      day,
      0, 0, 0
    );
  }

  return target;
}

// ACTUALIZAR LA CUENTA REGRESIVA
function updateCountdown() {
  if (!targetDate) return;

  const now = new Date();
  let diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    $("days").textContent = "000";
    $("hours").textContent = "00";
    $("minutes").textContent = "00";
    $("seconds").textContent = "00";

    $("wishText").innerHTML =
      "🎂 <strong>¡Feliz cumpleaños, Brenda (Papucha)!</strong> " +
      "Que hoy te sobren motivos para sonreír. 💖";

    return;
  }

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;

  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;

  const minutes = Math.floor(diff / 60000);
  diff %= 60000;

  const seconds = Math.floor(diff / 1000);

  $("days").textContent = String(days).padStart(3, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
}

// CONFIGURAR FECHA Y NOMBRE
function setBirthday(dateValue) {
  if (!dateValue) return;

  targetDate = nextBirthday(dateValue);
  updateCountdown();
}

// MOSTRAR EL NOMBRE DESDE QUE SE ABRE LA PÁGINA
if (birthdayInput) {
  birthdayInput.value = DEFAULT_BIRTHDAY;
}

if (nameInput) {
  nameInput.value = DEFAULT_NAME;
}

if ($("personName")) {
  $("personName").textContent = DEFAULT_NAME;
}

setBirthday(DEFAULT_BIRTHDAY);

// ACTUALIZAR CADA SEGUNDO AUTOMÁTICAMENTE
setInterval(updateCountdown, 1000);

// BOTÓN PARA GUARDAR PERSONALIZACIÓN
$("saveBtn").addEventListener("click", () => {
  if (birthdayInput.value) {
    setBirthday(birthdayInput.value);
  }

  const name = nameInput.value.trim() || DEFAULT_NAME;

  // El nombre permanece visible.
  $("personName").textContent = name;

  $("saveBtn").textContent = "¡Listo! ✓";

  setTimeout(() => {
    $("saveBtn").textContent = "Personalizar ✨";
  }, 1600);

  burstConfetti(65);
});

// COLORES DEL CONFETI
const colors = [
  "#ff5fa2",
  "#ffe66d",
  "#48c6ef",
  "#9b7bff",
  "#78f0c5",
  "#ff9068",
  "#ffffff"
];

// GENERADOR DE CONFETI
function burstConfetti(amount = 100) {
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");

    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.borderRadius =
      Math.random() > 0.5 ? "50%" : "2px";

    piece.style.width = 5 + Math.random() * 8 + "px";
    piece.style.height = 7 + Math.random() * 12 + "px";

    piece.style.setProperty(
      "--drift",
      Math.random() * 240 - 120 + "px"
    );

    piece.style.animationDuration =
      2.5 + Math.random() * 3.5 + "s";

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 6500);
  }

  if (soundOn) playChime();
}

// BOTÓN DE CONFETI
$("confettiBtn").addEventListener("click", () => {
  burstConfetti(150);
});

// MENSAJES DE CUMPLEAÑOS
const wishes = [
  "Que la vida te sorprenda con " +
  "<strong>aventuras bonitas, amistades sinceras y muchísima alegría.</strong> 🌈",

  "Nunca dejes de soñar en grande: " +
  "<strong>tu historia tiene capítulos increíbles por escribir.</strong> ⭐",

  "Que cada vela represente un deseo y cada abrazo te recuerde " +
  "<strong>lo mucho que te quieren.</strong> 💖",

  "Hoy celebramos tu existencia y toda la luz que compartes. " +
  "<strong>¡Que venga tu mejor año!</strong> 🥳"
];

$("wishBtn").addEventListener("click", () => {
  $("wishText").innerHTML =
    wishes[wishIndex % wishes.length];

  wishIndex++;

  burstConfetti(35);
});


// CONFETI AUTOMÁTICO AL ABRIR LA PÁGINA
setTimeout(() => {
  burstConfetti(45);
}, 700);
