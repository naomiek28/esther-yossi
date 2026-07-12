const openButton = document.getElementById("openEnvelope");
const invitation = document.getElementById("invitation");
const weddingMusic = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;
let envelopeOpened = false;

function updateMusicButton() {
  if (weddingMusic.paused) {
    musicToggle.textContent = "♫";
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-label", "Lancer la musique");
  } else {
    musicToggle.textContent = "♪";
    musicToggle.classList.add("playing");
    musicToggle.setAttribute("aria-label", "Arrêter la musique");
  }
}

function playMusic() {
  weddingMusic.volume = 0.45;

  weddingMusic.play().then(() => {
    musicStarted = true;
    updateMusicButton();
  }).catch(() => {
    updateMusicButton();
  });
}

function openInvitation() {
  if (envelopeOpened) return;

  envelopeOpened = true;
  openButton.disabled = true;
  document.body.classList.add("invitation-open");

  playMusic();

  invitation.classList.add("visible");

  setTimeout(() => {
    invitation.scrollIntoView({ behavior: "smooth" });
  }, 220);
}

openButton.addEventListener("click", openInvitation);

musicToggle.addEventListener("click", () => {
  if (!musicStarted || weddingMusic.paused) {
    playMusic();
  } else {
    weddingMusic.pause();
    updateMusicButton();
  }
});

const weddingDate = new Date("October 28, 2026 19:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "Aujourd'hui est le grand jour";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
updateMusicButton();
