let nomeUsuario,
  numeroPeca,
  cliente,
  nomeMaquina,
  linhaProducao,
  caracteristicaAvaliada;
let tolSup, tolInf;
let dados = [];

//Elementos html

const elNomeUsuario = document.getElementById("nomeUsuario");
const elNumeroPeca = document.getElementById("numeroPeca");
const elCliente = document.getElementById("cliente");
const elNomeMaquina = document.getElementById("nomeMaquina");
const elLinhaProducao = document.getElementById("linhaProducao");
const elCaracteristica = document.getElementById("caracteristicaAvaliada");
const elTolSup = document.getElementById("tolSup");
const elTolInf = document.getElementById("tolInf");
const elValor = document.getElementById("valorEncontrado");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnRemoverUltimo = document.getElementById("btnRemoverUltimo");
const pdf = document.getElementById("pdf");
const ctx = document.getElementById("grafico").getContext("2d");
const btnConfirm = document.getElementById("confirmbtn");

//ChartJS Line

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Valor",
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 2,
        data: [],
      },
      {
        label: "Tolêrancia Superior",
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 2,
        data: [],
      },
      {
        label: "Tolêrancia Inferior",
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 2,
        data: [],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 10,
          font: { size: 12 },
          color: "#444",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        callbacks: {
          label: function (ctx) {
            return `${ctx.dataset.label}: ${ctx.formattedValue}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#555", font: { size: 12 } },
      },
      y: {
        beginAtZero: false,
        grid: { color: "rgba(200,200,200,0.2)" },
        ticks: { color: "#555", font: { size: 12 } },
      },
    },
  },
});
// Confirmando dados de entrada (iniciais)

function confirmarDadosIniciais() {
  nomeUsuario = elNomeUsuario.value.trim();
  numeroPeca = elNumeroPeca.value.trim();
  cliente = elCliente.value;
  nomeMaquina = elNomeMaquina.value;
  linhaProducao = elLinhaProducao.value;
  caracteristicaAvaliada = elCaracteristica.value;
  tolSup = parseFloat(elTolSup.value);
  tolInf = parseFloat(elTolInf.value);

  //Condições + SweetAlert

  if (
    !nomeUsuario ||
    !numeroPeca ||
    !cliente ||
    !nomeMaquina ||
    !linhaProducao ||
    !caracteristicaAvaliada ||
    isNaN(tolSup) ||
    isNaN(tolInf)
  ) {
    Swal.fire({
      title: "Atenção",
      text: "Preencha todos os campos corretamente.",
      icon: "error",
      confirmButtonColor: "#0B5ED7",
    });
    return;
  }
  if (tolInf >= tolSup) {
    Swal.fire({
      title: "Atenção",
      text: "A tolerância inferior deve ser menor que a tolerância superior.",
      icon: "error",
      confirmButtonColor: "#0B5ED7",
    });
    return;
  }

  if (tolInf == 0) {
    Swal.fire({
      title: "Atenção",
      text: "Identificamos que o processo apresenta apenas tolerância máxima. Não se esqueça de retirar a linha de tolerância inferior antes e gerar o gráfico.",
      icon: "info",
      confirmButtonColor: "#0B5ED7",
      timer: 6000,
      timerProgressBar: true,
    });
  } else {
    Swal.fire({
      icon: "success",
      text: "Dados gravados com sucesso!",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {});
  }

  //Bloqueador de inputs e buttons (Área gráfico)

  bloquearCampos(true);
  pdf.disabled = false;
  elValor.disabled = false;
  btnAdicionar.disabled = false;
  btnRemoverUltimo.disabled = false;

  atualizarLinhasTolerancia();
}

function bloquearCampos(b) {
  pdf.disabled = b;
  elNomeUsuario.disabled = b;
  elNumeroPeca.disabled = b;
  elNomeMaquina.disabled = b;
  elLinhaProducao.disabled = b;
  elCliente.disabled = b;
  elCaracteristica.disabled = b;
  elTolSup.disabled = b;
  elTolInf.disabled = b;
  btnConfirm.disabled = b;
}

//Atualizando linhas de tolêrancia

function atualizarLinhasTolerancia() {
  chart.data.datasets[1].data = chart.data.labels.map(() => tolSup);
  chart.data.datasets[2].data = chart.data.labels.map(() => tolInf);
  chart.update();
}

//Adicionando valores ao gráfico + condições com SweetAlert

function adicionarValor() {
  let valor = parseFloat(elValor.value);
  elValor.value = "";
  elValor.focus();

  if (adicionarValor) {
    elValor.value = "";
    elValor.focus();
  }

  if (isNaN(valor) || valor === "" || valor === null) {
    Swal.fire({
      title: "Atenção",
      text: "Digite um valor válido.",
      icon: "error",
      confirmButtonColor: "#0B5ED7",
    });
    return;
  }
  valor = (valor * 1000) / 1000; // Garantir 3 casas decimais
  let hora = new Date().toLocaleString();
  dados.push({ hora, valor });
  chart.data.labels.push(valor);
  chart.data.datasets[0].data.push(valor);
  chart.data.datasets[1].data.push(tolSup);
  chart.data.datasets[2].data.push(tolInf);
  chart.update();
  elValor.value = "";
}

//Remover último valor adicionado

function removerUltimoValor() {
  elValor.value = "";
  elValor.focus();
  if (dados.length === 0) {
    Swal.fire({
      title: "Atenção",
      text: "Nenhuma valor encontrado para remover.",
      icon: "error",
      confirmButtonColor: "#0B5ED7",
    });
    return;
  }
  dados.pop();
  chart.data.labels.pop();
  chart.data.datasets.forEach((ds) => ds.data.pop());
  chart.update();
}

//Gerar PDF (jsPDF)

async function gerarPDF() {
  const elNomeUsuario = document.getElementById("nomeUsuario").value;
  let timerInterval;
  setTimeout(() => {
    location.reload();
  }, 5000);
  Swal.fire({
    icon: "success",
    title: "Tudo pronto!",
    text:
      elNomeUsuario +
      " ,seu documento foi baixado com sucesso, não se esqueça de move-lo para a pasta de safelaunch.",
    footer: "S:/eco/QLTY/31_SAFELAUNCH/",
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {});
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let y = 20;

  const logoBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAC5CAMAAABDc25uAAAC+lBMVEVHcEwAesIAesIAesIAecEAeMAAecEAesIAecIhHR4hHR4AesIhHR4iHh8iHh8iHh8iHh8iHh8iHh8iHh8hHR4iHh8hHR4iHh8iHh8iHh8hHR4iHh8hHR4hHR4iHh8iHh8iHh8iHh8iHh8AecIiHh8iHh8AesIAecIAecIAeMAiHh8iHh8AeMEAecIAb7IAecEiHh8AeMEAecIAesIAesIAecIAecEAecEAecEAecEAesIAecIAecEAecEAecEAecEAecEiHh8AecIAecIAcrcAd74AecEiHh8AeMAAecIAecEAeMAAesIAesIAecIAecIAecEAecEAeMEAecIAecEAecEAecEAesMAecIAecEAecEAeMAAeMAAecEAecEAecEAecEAesIAecIAecEAecEAecEAecIAecEAeMAAecIAd74Adr0AeMAAecIAecIAecIAecIAecEAecIAecEAeMEAesIAdrwAesIAecEAeMEAeL8AecEAd78AecEAecIAecIAecEAecEAecEAecEAeMEAecEAecEAecIAesIAecEAecIAecIAecAAeMAAecEAecIAecEAecEAecEAecIAecEAecEAecIAd74AecEAesIAeMAAesIhHh8AecEiHh8AeL8iHh8iHh8AecEiHh8AecEiHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHR4iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8iHh8hHR4iHh8eGhshHR4iHh8iHh8iHh8iHh8iHh8iHh8gHB0hHR4hHR8hHR4AecIiHh8AeMAiHh8AecEAd74AesIAecIAeL8Aba4AesKdsBObAAAA/nRSTlMA9v+p/2iK0v8EBYANJhYoR01jOREvBiOmKgxpCglJIVYgN/unv/pO/QGJixYNAYKzGsIm59GYRfX4q+V08zGl3WVSUwMMEoId/uou/uQjzHYQQ/Sz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";

  pdf.addImage(logoBase64, "JPEG", 10, 0, 30, 30);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Relatório dimensional (SAFELAUNCH)", 105, 15, {
    align: "center",
  });
  y += 10;

  const alturaPagina = pdf.internal.pageSize.height;
  const margem = 15;

  // Função para verificar quebra de página
  function verificaQuebra() {
    if (y > alturaPagina - margem) {
      pdf.addPage();
      y = 20; // Reinicia posição no topo da nova página
    }
  }

  function addBoldLabel(label, value) {
    verificaQuebra();
    pdf.setFont("helvetica", "bold");
    pdf.text(label, 10, y);
    const labelWidth = pdf.getTextWidth(label) + 2; // margem
    pdf.setFont("helvetica", "normal");
    pdf.text(value, 10 + labelWidth, y);
    y += 6;
  }

  addBoldLabel("Data do relatório:", new Date().toLocaleString());
  addBoldLabel("Inspetor Responsável:", nomeUsuario);
  addBoldLabel("Válvula:", numeroPeca);
  addBoldLabel("Cliente:", cliente);
  addBoldLabel("Equipamento:", nomeMaquina);
  addBoldLabel("Linha de Produção:", linhaProducao);
  addBoldLabel("Característica Avaliada:", caracteristicaAvaliada);
  addBoldLabel("Tolerância Superior:", `${tolSup.toFixed(3)} mm`);
  addBoldLabel("Tolerância Inferior:", `${tolInf.toFixed(3)} mm`);

  // Gráfico
  verificaQuebra();
  const imgData = chart.toBase64Image();
  pdf.addImage(imgData, "PNG", 10, y, 180, 80);
  y += 90;

  pdf.setFontSize(10);

  verificaQuebra();
  pdf.text("Resultados das peças analisadas:", 10, y);
  y += 6;

  dados.forEach((d) => {
    verificaQuebra();
    pdf.text(`${d.hora}        ${d.valor.toFixed(3)} mm`, 10, y);
    y += 6;
  });

  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR").replace(/\//g, "-"); // dd-mm-aaaa
  const horaFormatada = agora.toLocaleTimeString("pt-BR").replace(/:/g, "-"); // hh-mm-ss

  const nomeArquivo = `${numeroPeca}_${cliente}_${dataFormatada}_${horaFormatada}.pdf`;

  pdf.save(nomeArquivo);
}
