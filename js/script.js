const slides = document.querySelectorAll(".container-beranda-1");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
var petaObj = document.getElementById("petaIndonesia");
const container = document.querySelector(".topcerita-list");
const registerBottom = document.getElementById("register")
const query = document.getElementById("searchInput")

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
  slideInterval = setInterval(function () {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }, 20000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
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
var petaObj = document.getElementById("petaIndonesia");

petaObj.addEventListener("load", function() {
    var svgDoc = petaObj.contentDocument;
    var provinsi = svgDoc.querySelectorAll("path");

    for (var i = 0; i < provinsi.length; i++) {
        var p = provinsi[i];

        p.style.fill = "#46ac34ff";    
        p.style.stroke = "#3b6b1e";  
        p.style.cursor = "pointer";
        p.style.pointerEvents = "auto";
        p.clicked = false;

        p.addEventListener("click", function() {
            if (this.clicked) {
                this.clicked = false;
            } else {
                this.style.fill = "green";
                this.clicked = true;
            }

           var provinsiName = this.getAttribute("title");
            if(provinsiName) {
                window.location.href = "ceritarakyat.html?prov=" + encodeURIComponent(provinsiName);
            } else {
                alert("Nama provinsi tidak ditemukan!");
            }
        });

        p.addEventListener("mouseover", function() {
            if (!this.clicked) {
                this.style.fill = "#3f992dff";
            }
        });

        p.addEventListener("mouseout", function() {
            if (!this.clicked) {
                this.style.fill = "#4eac3eff";
            }
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
      <div class="tk-img-cover-2">
        <img src="${cerita.img}" alt="${cerita.title}">
      </div>
      <div class="top-cerita-title">
        <h3>${cerita.title}</h3>
        <p>${cerita.desc}</p>
        <a href="detailcerita.html?id=${cerita.id}" class="topcerita-link">Selengkapnya</a>

      </div>
    `;

    container.appendChild(div);
  });
}

renderTopCerita(".topcerita-list", topCerita);

function doSearch() {
    var querys = query.value.trim();
    if(querys !== ""){
        window.location.href = "ceritarakyat.html?search=" + encodeURIComponent(querys);
    }
}

function scrollToTop() {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
}

document.getElementById('searchBottom').addEventListener('click',function(){
  doSearch();
})

window.onscroll = function() {
    const button = document.getElementById('buttonUp');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = 'flex';
    } else{
        button.style.display = 'none';
    }
};

searchInput.addEventListener('focus', function() {
  stopSlideShow();
});


searchInput.addEventListener('blur', function() {
  startSlideShow();
});

