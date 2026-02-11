document.getElementById("excelFile").addEventListener("change", handleExcel);

function handleExcel(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    // Primeira aba
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Converte para array (linhas)
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Limpa dados anteriores (opcional)
    dataPoints.length = 0;

    rows.forEach((row) => {
      const value = row[0]; // Coluna A

      if (typeof value === "number" && !isNaN(value)) {
        dataPoints.push(value);
      }
    });

    updateUI();

    if (dataPoints.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Ops! Não encontramos dados",
        text: "O arquivo importado não possui amostras numéricas necessárias para o cálculo estatístico.",
        iconColor: '#dc3545',
        confirmButtonColor: '#0d6efd',
      });
    }
  };

  reader.readAsArrayBuffer(file);
}
