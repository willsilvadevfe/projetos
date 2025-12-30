const section = document.querySelector("#dados-psicologia");
const bars = document.querySelectorAll(".progress-fill");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        // PREENCHE AS BARRAS
        bars.forEach((bar) => {
          const percent = bar.getAttribute("data-percent");
          bar.style.width = percent + "%";
        });
      } else {
        // RESET QUANDO SAI DA SECTION
        bars.forEach((bar) => {
          bar.style.width = "0%";
        });
      }

    });
  },
  { threshold: 0.4 }
);

observer.observe(section);
