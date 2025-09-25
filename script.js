const beranda = [
  {
    title: "Akar Cerita.",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "Images/Beranda/2.png"
  },
  {
    title: "Cerita Rakyat Nusantara.",
    text: "Cerita rakyat penuh hikmah dari berbagai daerah Indonesia.",
    img: "Images/Beranda/3.png"
  },
  {
    title: "Legenda dan Mitologi.",
    text: "Temukan kisah-kisah legenda yang menarik dan mendidik.",
    img: "Images/Beranda/4.png"
  }
];

let current = 0;

const titleEl = document.getElementById("beranda-title");
const textEl = document.getElementById("beranda-text");
const imgEl = document.getElementById("beranda-img");

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % beranda.length;
  updateContent();
});

document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + beranda.length) % beranda.length;
  updateContent();
});

function updateContent() {
  titleEl.innerHTML = beranda[current].title;
  textEl.textContent = beranda[current].text;
  imgEl.src = beranda[current].img;
}