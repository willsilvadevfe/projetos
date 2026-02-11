const dados = [
  0.5, 1.001, 1.002, 1.003, 1.004, 1.005, 1.006, 1.007, 1.008, 1.009, 1.0, 1.01,
  1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.1, 1.11, 1.12, 1.13, 1.14,
  1.15, 1.16, 1.17, 1.18, 1.19, 1.2, 1.21, 1.22, 1.23, 1.24, 1.25, 1.26, 1.27,
  1.28, 1.29, 1.3, 1.31, 1.32, 1.33, 1.34, 1.35, 1.36, 1.37, 1.38, 1.39, 1.4,
  1.41, 1.42, 1.43, 1.44, 1.45, 1.47, 1.48, 1.49, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0,
  4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5,
  12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0, 17.5, 18.0,
  18.5, 19.0, 19.5, 20.0, 20.5, 21.0, 21.5, 22.0, 22.5, 23.0, 23.5, 24.0, 24.5,
  25.0, 50.0, 75.0, 100.0,
];

const input = document.getElementById("valor").focus();

function limpar() {
  const clear = document.getElementById("clear");
  const input = parseFloat(document.getElementById("valor").value);
  const resultado = document.getElementById("resultado");

  document.getElementById("valor").value = "";
  location.reload();
}

const LIMITE_COMBINACOES = 4;

function buscarCombinacoes() {
  const input = parseFloat(document.getElementById("valor").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(input) || input <= 0) {
    Swal.fire({
      icon: "error",
      title: "Algo deu errado",
      text: "Não foi possível identificar uma combinação compatível com os valores fornecidos.",
      confirmButtonColor: "#276AC0",
    });
    return;
    
  }

  const ordenado = [...dados].sort((a, b) => b - a);
  const combinacao = encontrarSoma(ordenado, input);

  if (combinacao) {
    resultado.innerHTML = "";
    resultado.style =
      "text-align: start; background-color: #6aafff8a;; padding: 40px; border-radius: 10px;";
    resultado.innerHTML += `<div style="font-size: 1.4em;">Valor procurado:&nbsp <strong><span style="color: #276AC0;">${input}</strong></span></div>`;
    resultado.innerHTML += `<div style="font-size: 1.4em;">
  Combinação de blocos:&nbsp;
  <strong>
    ${combinacao
      .map((item) => `<span style="color: #276AC0;">${item}</span>`)
      .join(`<span style="color: #276AC0;"> + </span>`)}
  </strong>
</div>`;
    resultado.innerHTML += `<br><h4><div style="font-size: 1.4em">Atenção:</div></h4>`;
    resultado.innerHTML += `<br>Certifique-se de que o relógio comparador está bem fixado na posição correta, não deve estar solto, quebrado ou danificado.<br>`;
    resultado.innerHTML += `Confira se a calibração está válida, observando a etiqueta de validade fixada ao relógio.`;
  } else {
    Swal.fire({
      icon: "error",
      title: "Algo deu errado",
      text: "Não foi possível identificar uma combinação compatível com os valores fornecidos.",
      confirmButtonColor: "#276AC0",
    });
  }
  document.getElementById("valor").focus();
}

function encontrarSoma(arr, alvo, combinacao = [], somaAtual = 0, index = 0) {
  const EPSILON = 0.0001;

  if (Math.abs(somaAtual - alvo) < EPSILON) {
    return combinacao;
  }

  if (combinacao.length >= LIMITE_COMBINACOES) {
    return null;
  }

  for (let i = index; i < arr.length; i++) {
    const valor = arr[i];
    const novaSoma = somaAtual + valor;

    if (novaSoma - alvo > EPSILON) continue;

    const novaCombinacao = [...combinacao, valor];
    const resultado = encontrarSoma(arr, alvo, novaCombinacao, novaSoma, i + 1);
    if (resultado) return resultado;
  }

  return null;
}
