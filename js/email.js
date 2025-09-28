(function(){
    emailjs.init("bszvSMDn2chzBykLn"); // ambil dari EmailJS dashboard
  })();

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_00576xn", "template_y05xlpg", this)
      .then(function() {
        document.getElementById("status").innerText = "Pesan berhasil dikirim";
      }, function(err) {
        document.getElementById("status").innerText = "Gagal kirim " + JSON.stringify(err);
      });
  });