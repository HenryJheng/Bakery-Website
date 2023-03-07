//Mobile nav control
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const backToBar = document.querySelectorAll(".backToBar");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("is-active");
  navMenu.classList.toggle("active");
});

backToBar.forEach((element) => {
  element.addEventListener("click", () => {
    menuToggle.classList.toggle("is-active");
    navMenu.classList.toggle("active");
  });
});
