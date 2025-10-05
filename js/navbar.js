const hamburger = document.querySelector('.container-nav-hamburger ion-icon');
const menuMix = document.querySelector('.container-nav-mix');

hamburger.addEventListener('click', function(event) {
    event.stopPropagation();
    menuMix.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    if (menuMix.classList.contains('active')) {
        if (!menuMix.contains(event.target) && !hamburger.contains(event.target)) {
            menuMix.classList.remove('active');
        }
    }
});