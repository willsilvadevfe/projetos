const form = document.getElementById("form-contato");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_p7q3b6o", "template_iedwzsm", this).then(
    function () {
      Swal.fire({
        title: "Agradeço seu contato!",
        text: "Seu e-mail foi enviado com sucesso, retornarei em breve.",
        icon: "success",
        background: "#f4f8f7", // FUNDO
        color: "#2f3e46", // TEXTO
        confirmButtonColor: "#5c8d89",
        iconColor: "#5c8d89",
        draggable: true,
      });
      form.reset();
    },
    function (error) {
      Swal.fire({
        title: "Erro.",
        text: "Houve um erro ao enviar o email, iremos tratar esse problema.",
        icon: "erro",
        background: "#f4f8f7", // FUNDO
        color: "#2f3e46", // TEXTO
        confirmButtonColor: "#5c8d89",
        iconColor: "#5c8d89",
        draggable: true,
      });
      console.error("EmailJS Error:", error);
    }
  );
});
