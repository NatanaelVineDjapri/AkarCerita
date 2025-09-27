const slides = document.querySelectorAll(".container-beranda-1");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
var petaObj = document.getElementById("petaIndonesia");
const container = document.querySelector(".topcerita-list");
const registerBottom = document.getElementById("register")

let currentIndex = 0;

/* ---------------- SLIDESHOW ---------------- */
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = "none";
    slide.classList.remove("active");
    if (i === index) {
      slide.style.display = "block";
      slide.classList.add("active");
    }
  });
}

function startSlideShow() {
  setInterval(function () {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }, 10000);
}

function clickRegister(){
  if (window.location.hash === "#auth") {
    document.getElementById("signUp").click();
  }
}
nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
});

prevBtn.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
});

showSlide(currentIndex);
startSlideShow();

/* ---------------- NAVBAR SCROLL ---------------- */
let lastScrollTop = 0;
let navbar = document.querySelector(".container-nav");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-15vh";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

/* ---------------- PETA INDONESIA ---------------- */
petaObj.addEventListener("load", function () {
  var svgDoc = petaObj.contentDocument;
  var provinsi = svgDoc.querySelectorAll("path");

  for (var i = 0; i < provinsi.length; i++) {
    var p = provinsi[i];
    provinsi[i].style.fill = "#eb9800";
    provinsi[i].style.stroke = "#643201";
    p.style.cursor = "pointer";

    // Klik
    p.addEventListener("click", function () {
      alert("Kamu klik: " + this.id);
      // window.location = "provinsi.html?name=" + this.id;
    });

    // Hover masuk
    p.addEventListener("mouseover", function () {
      this.style.fill = "orange";
    });

    // Hover keluar
    p.addEventListener("mouseout", function () {
      this.style.fill = "";
    });
  }
});

/* ---------------- TOP CERITA ---------------- */
function renderTopCerita(containerSelector, data) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  data.forEach((cerita) => {
    const div = document.createElement("div");
    div.classList.add("topcerita-container");

    div.innerHTML = `
      <div class="tk-img-cover-2"><img src="${cerita.img}" alt="${cerita.title}"></div>
      <div class="top-cerita-title">
        <h3>${cerita.title}</h3>
        <p>${cerita.desc}</p>
      </div>
    `;

    container.appendChild(div);
  });
}




renderTopCerita(".topcerita-list", topCerita);
