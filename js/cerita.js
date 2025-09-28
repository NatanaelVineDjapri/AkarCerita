var params = new URLSearchParams(window.location.search);
var ceritaId = params.get("id");
var provinsiName = params.get("prov");
if(ceritaId){
    var cerita = ceritaRakyat.find(c => c.id == ceritaId);
    var detailContainer = document.getElementById("detailContainer");

    if(cerita){
        document.getElementById("detailTitle").innerText = cerita.nama;
        document.getElementById("detailProvince").innerText = "Provinsi: " + cerita.provinsi;
        document.getElementById("detailDescribe").innerText = cerita.deskripsi;
        document.getElementById("detailContent").innerText = cerita.isi;
        document.getElementById("detailMoral").innerText = cerita.pesanMoral;
        document.getElementById("detailBacklink").href = `ceritarakyat.html?prov=${cerita.provinsi}`;
        document.getElementById("detailPicture").src = cerita.image;
    } else {
        detailContainer.innerHTML = '<p style="color: white;">Cerita tidak ditemukan.</p>';
    }
    
}else {
    var ceritaList = ceritaRakyat.filter(c => c.provinsi === provinsiName);
    var container = document.getElementById("ceritarakyatContainer");
    var template = document.getElementById("ceritaTemplate");

    if (ceritaList.length > 0) {
        document.getElementById("hasilProvince").innerText = "Cerita dari Provinsi " + provinsiName;

        ceritaList.forEach(c => {
            var clone = template.content.cloneNode(true);

            clone.querySelector(".title").innerText = c.nama;
            clone.querySelector(".province").innerText = c.provinsi;
            clone.querySelector(".desc").innerText = c.deskripsi;
            clone.querySelector("img").src = c.image;
            clone.querySelector(".detaillink").href = "detailcerita.html?id=" + c.id;
            container.appendChild(clone);
        });
        
        } else {
            container.innerHTML = '<p style="color: white;">Belum ada cerita untuk provinsi ini.</p>';
        }

}
