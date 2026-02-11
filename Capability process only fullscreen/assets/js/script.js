let dataPoints = [];
let chartInstance = null;

document.getElementById("val").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    dataPoints.push(parseFloat(e.target.value));
    e.target.value = "";
    updateUI();
  }
});

function updateUI() {
  const list = document.getElementById("list");
  document.getElementById("count").innerText = dataPoints.length;
  list.innerHTML = dataPoints
    .map(
      (v, i) => `
        <div class="log-item">
            <span>Amostra&nbsp;<strong>${i + 1}</strong>:</span>
            <span>&nbsp;Valor inserido:&nbsp;<strong>${v.toFixed(3)}</strong></span>
            <button style="border:none; background:none; color:red; cursor:pointer;" onclick="remove(${i})">✕</button>
        </div>
    `,
    )
    .reverse()
    .join("");
}

function remove(index) {
  dataPoints.splice(index, 1);
  updateUI();
}

function processData() {
  const lslInput = document.getElementById("lsl").value;
  const uslInput = document.getElementById("usl").value;
  if (dataPoints.length < 3 || uslInput === "") {
    return Swal.fire({
      icon: "warning",
      title: "Não foi possível prosseguir",
      text: "Antes de prosseguir, informe os valores das amostras e os limites de tolerância do processo.",
      confirmButton: "btn btn-primary px-4",
      iconColor: "#dc3545",
      confirmButtonColor: "#0d6efd",
    });
  }

  if(lslInput > uslInput || uslInput === lslInput){
     Swal.fire({
      icon: "error",
      title: "Não foi possível prosseguir",
      html: "<div> <p>Verifique as tolerâncias inseridas. A <strong>tolerância superior (TS)</strong> não deve ser menor ou igual do que a <strong>tolerância inferior (TI).</strong></p></div>",
      confirmButton: "btn btn-primary px-4",
      iconColor: "#dc3545",
      confirmButtonColor: "#0d6efd",
    });
    return
  }



  const USL = parseFloat(uslInput);
  const LSL =
    document.getElementById("lsl").value !== ""
      ? parseFloat(document.getElementById("lsl").value)
      : null;

  const mean = ss.mean(dataPoints);
  const stdevP = ss.standardDeviation(dataPoints);

  // Within Stdev (Diferença Sucessiva)
  let sumD = 0;
  for (let i = 0; i < dataPoints.length - 1; i++)
    sumD += Math.abs(dataPoints[i + 1] - dataPoints[i]);
  const stdevS = sumD / (dataPoints.length - 1) / 1.128;

  // Cálculos Condicionais (Bilateral vs Unilateral)
  let Cp = null,
    Cpk,
    Pp = null,
    Ppk;
  let outOfSpec = dataPoints.filter((v) => v > USL).length;

  if (LSL !== null) {
    // Bilateral
    Cp = (USL - LSL) / (6 * stdevS);
    const cpkU = (USL - mean) / (3 * stdevS);
    const cpkL = (mean - LSL) / (3 * stdevS);
    Cpk = Math.min(cpkU, cpkL);

    Pp = (USL - LSL) / (6 * stdevP);
    const ppkU = (USL - mean) / (3 * stdevP);
    const ppkL = (mean - LSL) / (3 * stdevP);
    Ppk = Math.min(ppkU, ppkL);

    outOfSpec += dataPoints.filter((v) => v < LSL).length;
    document.getElementById("type-report").innerText =
      "Estudo de capabilidade com análise bileteral (Tolerância Superior e Tolerância Inferior)";
      
  } else {
    // Unilateral Superior apenas
    Cpk = (USL - mean) / (3 * stdevS);
    Ppk = (USL - mean) / (3 * stdevP);
    document.getElementById("type-report").innerText =
      "Estudo de capabilidade com análise unilateral (Tolerância Superior)";
  }

  const stats = {
    Cp,
    Cpk,
    Pp,
    Ppk,
    n: dataPoints.length,
    out: outOfSpec,
    mean,
    lsl: LSL,
    usl: USL,
  };
  document.getElementById("dl").style.display = "block";
  render(dataPoints, stats);
}

function render(data, stats) {
  const ctx = document.getElementById("capChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  const minX =
    Math.min(
      ...data,
      stats.lsl !== null
        ? stats.lsl
        : stats.mean - 3 * ss.standardDeviation(data),
    ) * 0.98;
  const maxX = Math.max(...data, stats.usl) * 1.02;
  const bins = 10;
  const size = (maxX - minX) / bins;
  const histogramData = Array(bins).fill(0);
  data.forEach((v) => {
    let idx = Math.floor((v - minX) / size);
    histogramData[Math.min(idx, bins - 1)]++;
  });

  const curve = [];
  const sd = ss.standardDeviation(data);
  for (let x = minX; x <= maxX; x += (maxX - minX) / 100) {
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - stats.mean) / sd, 2));
    curve.push({ x: x, y: y * data.length * size });
  }

  const annotations = {
    usl: {
      type: "line",
      xMin: stats.usl,
      xMax: stats.usl,
      borderColor: "#f0ad4e",
      borderDash: [6, 4],
      label: { content: "USL", display: true, position: "start" },
    },
  };
  if (stats.lsl !== null) {
    annotations.lsl = {
      type: "line",
      xMin: stats.lsl,
      xMax: stats.lsl,
      borderColor: "#f0ad4e",
      borderDash: [6, 4],
      label: { content: "LSL", display: true, position: "start" },
    };
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          type: "line",
          data: curve,
          borderColor: "#d9534f",
          borderWidth: 2,
          pointRadius: 0,
          order: 1,
        },
        {
          data: histogramData.map((v, i) => ({
            x: minX + i * size + size / 2,
            y: v,
          })),
          backgroundColor: "#0663eebd",
          borderColor: "#ffffff",
          borderWidth: 1,
          barPercentage: 1,
          categoryPercentage: 1,
          order: 2,
        },
      ],
    },
    options: {
      responsive: false,
      layout: { padding: { right: 230, top: 40, left: 10 } },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "Dimensão" },
        },
        y: { beginAtZero: true },
      },
      plugins: {
        legend: { display: false },
        annotation: { annotations },
      },
    },
    plugins: [
      {
        id: "infoBox",
        afterDraw: (chart) => {
          const { ctx, width, height } = chart;
          ctx.save();
          ctx.fillStyle = "white";
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = "source-over";

          const x = width - 210;
          let y = 70;

          ctx.fillStyle = "#003366";
          ctx.font = "bold 18px 'Inter'";
          ctx.fillText("Análise do processo", x, y);

          ctx.fillStyle = "#444";
          ctx.font = "14px 'Inter'";
          y += 25;
          ctx.fillText(`Amostras(n): ${stats.n}`, x, y);
          y += 20;
          ctx.fillText(`Média(x̄): ${stats.mean.toFixed(4)}`, x, y);
          y += 20;
          ctx.fillText(`Limite Superior (TS): ${stats.usl}`, x, y);
          if (stats.lsl !== null) {
            y += 20;
            ctx.fillText(`Limite Inferior (TI): ${stats.lsl}`, x, y);
          }

          y += 35;
          ctx.fillStyle = "#003366";
          ctx.font = "bold 18px 'Inter'";
          ctx.fillText("Índices de capacidade", x, y);

          ctx.fillStyle = "#444";
          ctx.font = "14px 'Inter'";
          y += 25;
          ctx.fillText(
            `Cp:   ${stats.Cp !== null ? stats.Cp.toFixed(3) : "*"}`,
            x,
            y,
          );
          y += 20;
          ctx.fillText(`Cpk: ${stats.Cpk.toFixed(3)}`, x, y);
          y += 20;
          ctx.fillText(
            `Pp:   ${stats.Pp !== null ? stats.Pp.toFixed(3) : "*"}`,
            x,
            y,
          );
          y += 20;
          ctx.fillText(`Ppk: ${stats.Ppk.toFixed(3)}`, x, y);

          y += 35;
          ctx.fillStyle = stats.out > 0 ? "#d9534f" : "#28a745";
          ctx.font = "bold 16px 'Inter'";
          ctx.fillText(`Fora do especificado: ${stats.out}`, x, y);


          

          if (stats.Cp === null) {
            y += 30;
            ctx.fillStyle = "#888";
            ctx.font = "12px 'Inter'";
            ctx.fillText("*: Estudo unilateral", x, y);
          }

          ctx.restore();
        },
      },
    ],
  });
}

function download() {
  const canvas = document.getElementById("capChart");
  const link = document.createElement("a");
  link.download = `Relatorio_Capabilidade_${new Date().toISOString().slice(0, 10)}.png`;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}
