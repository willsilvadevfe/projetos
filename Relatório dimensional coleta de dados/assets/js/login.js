window.onload = function () {
  // Verifica se já existe login válido na sessão
  if (sessionStorage.getItem("logado") === "true") {
    document.getElementById("conteudo").style.display = "block";
  } else {
    login();
  }
};

function login() {
  Swal.fire({
    title: "Login",
    html: `
          <input type="text" id="usuario" class="swal2-input" placeholder="Usuário">
          <input type="password" id="senha" class="swal2-input" placeholder="Senha">
        `,
    width: "390px",
    confirmButtonColor: "#2d5ef2",
    confirmButtonText: "Entrar",
    focusConfirm: false,
    allowOutsideClick: false,
    preConfirm: () => {
      const usuario = Swal.getPopup().querySelector("#usuario").value;
      const senha = Swal.getPopup().querySelector("#senha").value;

      if (!usuario || !senha) {
        Swal.showValidationMessage(`Por favor, preencha todos os campos.`);
      }
      return { usuario: usuario, senha: senha };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (
        result.value.usuario === "admin" &&
        result.value.senha === "admin8864"
      ) {
        sessionStorage.setItem("logado", "true"); // marca como logado na sessão
        Swal.fire({
          icon: "success",
          title: "Tudo certo.",
          text: "Login efetuado com sucesso!",
          timer: 1500,
          timerProgressBar: true,
          confirmButtonColor: "#2d5ef2",
        }).then(() => {});
      } else {
        Swal.fire({
          icon: "error",
          title: "Atenção",
          text: "Login ou senha incorreto, tente novamente.",
          confirmButtonColor: "#2d5ef2",
        }).then(() => {
          login(); // tenta novamente
        });
      }
    }
  });
}
