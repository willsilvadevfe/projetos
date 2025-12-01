(function () {
  emailjs.init("MIAAasZpFR55Shn5O");
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_p7q3b6o", "template_iyb02ex", this).then(
      function () {
        alert("Mensagem enviada com sucesso!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Ocorreu um erro ao enviar. Tente novamente.");
        console.error("Erro:", error);
      }
    );
  });
