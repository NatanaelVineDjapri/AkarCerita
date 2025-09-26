const slides = document.querySelectorAll(".container-beranda-1");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
var petaObj = document.getElementById('petaIndonesia');
const container = document.querySelector(".topcerita-list");

let currentIndex = 0;


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
  setInterval(function() {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }, 10000); 
}


nextBtn.addEventListener("click", function(){
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
});

prevBtn.addEventListener("click", function(){
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
});

let lastScrollTop = 0; 
let navbar = document.querySelector(".container-nav");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop; //ambil posisi scroll skrng

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-15vh";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

showSlide(currentIndex);
startSlideShow();




petaObj.addEventListener('load', function() {
    // Ambil dokumen SVG di dalam <object>
    var svgDoc = petaObj.contentDocument;

    // Ambil semua elemen <path> di SVG (misal tiap provinsi bentuknya path)
    var provinsi = svgDoc.querySelectorAll('path');

    // Loop tiap path (provinsi)
    for (var i = 0; i < provinsi.length; i++) {
        var p = provinsi[i];
        provinsi[i].style.fill = '#eb9800';
         provinsi[i].style.stroke = '#643201';
        p.style.cursor = 'pointer';

        // Event klik → tampil alert nama id provinsi
        p.addEventListener('click', function() {
            alert('Kamu klik: ' + this.id);
            // bisa diganti navigasi, misal:
            // window.location = "provinsi.html?name=" + this.id;
        });

        // Event hover → ubah warna saat mouse di atas
        p.addEventListener('mouseover', function() {
            this.style.fill = 'orange';
        });

        // Event hover keluar → kembalikan warna semula
        p.addEventListener('mouseout', function() {
            this.style.fill = '';
        });
    }
});

function renderTopCerita(containerSelector, data) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = ""; // biar gak dobel kalau dipanggil ulang

  data.forEach(cerita => {
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


