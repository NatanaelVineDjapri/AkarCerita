document.addEventListener("DOMContentLoaded", function() {

    var container = document.getElementById("ceritarakyatContainer");
    var template = document.getElementById("ceritaTemplate");
    var nextBtn = document.getElementById("nextBtn");
    var prevBtn = document.getElementById("prevBtn");
    var themeFilter = document.getElementById("themeFilter");
    var currentList = []; 

    function renderCeritaList(list) {
        container.innerHTML = "";
        list.forEach(function(c) {
            var clone = template.content.cloneNode(true);
            clone.querySelector(".title").innerText = c.nama;
            clone.querySelector(".province").innerText = c.provinsi;
            clone.querySelector(".desc").innerText = c.deskripsi;
            clone.querySelector("img").src = c.image;
            clone.querySelector(".detaillink").href = "detailcerita.html?id=" + c.id;
            container.appendChild(clone);
        });

        var items = container.querySelectorAll(".ceritarakyat-container2");
        if(items.length > 4){
            nextBtn.style.display = "flex";
            prevBtn.style.display = "flex";
        } else {
            nextBtn.style.display = "none";
            prevBtn.style.display = "none";
        }

        if(items.length > 0){
            var itemWidth = items[0].offsetWidth + 16; 
            nextBtn.onclick = function() {
                container.scrollBy({ left: 4 * itemWidth, behavior: 'smooth' });
            }
            prevBtn.onclick = function() {
                container.scrollBy({ left: -4 * itemWidth, behavior: 'smooth' });
            }
        }
    }

    if (window.location.pathname.includes("ceritarakyat.html") || 
        window.location.pathname.includes("detailcerita.html")) {

        var params = new URLSearchParams(window.location.search);
        var ceritaId = params.get("id");
        var provinsiName = params.get("prov");
        var searchQuery = params.get("search");

        if (ceritaId) {
            var cerita = ceritaRakyat.find(c => c.id == ceritaId);
            var detailContainer = document.getElementById("detailContainer");

            if (cerita) {
                document.getElementById("detailTitle").innerText = cerita.nama;
                document.getElementById("detailProvince").innerText = "Provinsi: " + cerita.provinsi;
                document.getElementById("detailDescribe").innerText = cerita.deskripsi;
                document.getElementById("detailContent").innerText = cerita.isi;
                document.getElementById("detailMoral").innerText = cerita.pesanMoral;
                document.getElementById("detailBacklink").href = "ceritarakyat.html?prov=" + cerita.provinsi;
                document.getElementById("detailPicture").src = cerita.image;
            } else {
                detailContainer.innerHTML = '<p style="color: white;">Cerita tidak ditemukan.</p>';
            }

        } else {
            let initialList = ceritaRakyat;

            if (provinsiName) {
                initialList = ceritaRakyat.filter(c => c.provinsi === provinsiName);
                if(initialList.length > 0){
                    document.getElementById("hasilProvince").innerText = "Cerita dari Provinsi " + provinsiName;
                }
            } else if (searchQuery) {
                initialList = ceritaRakyat.filter(c => {
                    const query = searchQuery.toLowerCase().split(" ");
                    const prov = (c.provinsi || "").toLowerCase();
                    const nama = (c.nama || "").toLowerCase();
                    return query.every(word => nama.includes(word) || prov.includes(word));
                });
                if(initialList.length > 0){
                    document.getElementById("hasilProvince").innerText = "Hasil pencarian untuk: " + searchQuery;
                }
            }

            currentList = initialList; // <-- set currentList sebelum render
            renderCeritaList(initialList);
        }
    }

    const dropdown = document.getElementById('themeFilterCustom');
    const display = dropdown.querySelector('.select-display');
    const optionsContainer = dropdown.querySelector('.select-options');
    const optionItems = dropdown.querySelectorAll('.option-item');

    function filterAndRender(selectedTheme) {
        var filteredList = currentList;

        if (selectedTheme) {
            filteredList = currentList.filter(c => c.tema === selectedTheme);
        }

        if (filteredList.length > 0) {
            container.style.display = "flex";
            container.style.justifyContent = "flex-start";
            container.style.alignItems = "stretch";
            container.style.height = ""; 
            
            renderCeritaList(filteredList); 
        } else {
            container.innerHTML = '<p style="color: white; text-align:center">Tidak ada cerita untuk tema "' + (selectedTheme || 'Semua Tema') + '"</p>';
            container.style.display = "flex";
            container.style.justifyContent = "center";
            container.style.alignItems = "center";
            container.style.height = "200px"; 
        }
    }


    display.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

    optionItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const selectedValue = item.getAttribute('data-value');
            const selectedText = item.textContent;

            display.textContent = selectedText;
            display.setAttribute('data-value', selectedValue);

            optionsContainer.style.display = 'none';

            filterAndRender(selectedValue); 
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            optionsContainer.style.display = 'none';
        }
    });

    filterAndRender('');


});
