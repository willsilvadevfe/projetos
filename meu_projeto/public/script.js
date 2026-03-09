document.getElementById("btnSalvar").addEventListener("click", () => {
  const tipoValvula = document.getElementById("tipoValvula").value;
  const partnumber = document.getElementById("partnumber").value;
  let faceponta = document.getElementById("faceponta").value;
  let planicidadetopo = document.getElementById("planicidadetopo").value;

  faceponta = faceponta.replace(",", ".");
  faceponta = parseFloat(faceponta);

  planicidadetopo = planicidadetopo.replace(",", ".");
  planicidadetopo = parseFloat(planicidadetopo);

  const visual = document.querySelector('input[name="visual"]:checked')?.value;

  fetch("http://localhost:3000/salvar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tipoValvula,
      partnumber,
      faceponta,
      planicidadetopo,
      visual,
    }),
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);
    })
    .catch((err) => {
      console.log(err);
    });
});
