import { API } from "./js/api.js";
import { elements } from "./js/helper.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();
//*
elements.form.addEventListener("submit", (e) => {
  e.preventDefault(); //*Form gönderildiği anda sayfanın yenilenmesini engeller.
  const query = e.target[0].value; //*ınputun içerisindeki değere ulaştık.
  //*Inputa girilen değer boş ise fonksiyonu burda durdur.
  if (!query) {
    alert("lütfen boş bırakmayın");
    return;
  }

  updateTitle(`${query} için Sonuçlar`);
  api.searchMusic(query);
});
//* Sayfa yüklendiği anda api'ye istek atıp popüler müzikleri getir.
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});
//
const playMusic = (url) => {
  //*müzik url html aktarıldı
  elements.audioSource.src = url;
  //*audio elemente müzik yüklenme
  elements.audio.load();
  //audio elementinin müziği oynatmasını sağlar
  elements.audio.play();
};
//*listede tıklamalarda çalışır
const handleClick = (e) => {
  console.log(e);
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); //parentElement yerine kullanılır en yakın eevetne götürür.
    renderPlayingInfo(parent.dataset);
    //*müziği çalar
    playMusic(parent.dataset.url);
  }
};
//*liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick);
//* müzik ve animasyon başlatma
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};
//*müzik ve resmi durdurma
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
// müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

// menu açma
document.getElementById("menu").addEventListener("click", function () {
  let ulElement = document.querySelector("header form ul");
  ulElement.classList.toggle("open");
});
