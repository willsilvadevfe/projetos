const btnTopo = document.getElementById("btn-topo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTopo.style.display = "flex";
    } else {
      btnTopo.style.display = "none";
    }
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

