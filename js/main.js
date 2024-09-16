import { API } from "./api.js";
import { elements } from "./helpers.js";
import { renderPlayingInfo, updateTitle } from "./ui.js";

const api = new API();
api.getPopular();

document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

const playMusic = (url) => {
  elements.audioSource.src = url;
  console.log(elements.audio);
  elements.audio.load();
};

const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card");

    renderPlayingInfo(parent.dataset);

    playMusic(parent.dataset.url);

    elements.audio.play();
  }
};

document.addEventListener("click", handleClick);

const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};

elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = e.target[0].value;
  if (!query) {
    alert("Lütfen bütün alanları doldurunuz!");
    return;
  }

  updateTitle(`${query} İçin Sonuçlar`);
  api.searchMusic(query);
});

elements.menu.addEventListener("click", () => {
  elements.ulList.classList.toggle("toggle");
});
