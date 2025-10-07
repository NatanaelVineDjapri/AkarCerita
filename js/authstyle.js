const page = window.location.pathname.split("/").pop();

if (page === "auth.html") {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container2 = document.getElementById("container");
  const navLogin = document.getElementById("logins");
  const navRegister = document.getElementById("register");

  signUpButton.addEventListener("click", function() {
    container2.classList.add("right-panel-active");
    window.location.href = "auth.html#register";
  });

  signInButton.addEventListener("click", function() {
    container2.classList.remove("right-panel-active");
    window.location.href = "auth.html#login";
  });

  if (navLogin) {
    navLogin.addEventListener("click", function(e) {
      e.preventDefault();
      window.location.href = "auth.html#login";
    });
  }

  if (navRegister) {
    navRegister.addEventListener("click", function(e) {
      e.preventDefault();
      window.location.href = "auth.html#register";
    });
  }

  window.addEventListener("DOMContentLoaded", function() {
    if (window.location.hash === "#register") {
      container2.classList.add("right-panel-active");
    } else if (window.location.hash === "#login") {
      container2.classList.remove("right-panel-active");
    }
  });

  window.addEventListener("hashchange", function() {
    if (window.location.hash === "#register") {
      container2.classList.add("right-panel-active");
    } else if (window.location.hash === "#login") {
      container2.classList.remove("right-panel-active");
    }
  });
}
