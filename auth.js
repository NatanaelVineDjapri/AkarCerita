const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

 window.addEventListener("DOMContentLoaded", function(){
    if (window.location.hash === "#register") {
      container.classList.add("right-panel-active");
    } else if (window.location.hash === "#login") {
      container.classList.remove("right-panel-active");
    }
  });