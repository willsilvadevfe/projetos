const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const links = document.querySelectorAll(".nav-list a");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });