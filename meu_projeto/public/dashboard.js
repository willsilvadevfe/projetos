fetch("/dados")
.then(r => r.json())
.then(dados => {

console.log("DADOS:", dados);

if(dados.length === 0){
alert("Sem dados no banco");
return;
}

// -------- VISUAL

let ok = 0;
let nok = 0;

dados.forEach(d => {

if(d.visual === "OK") ok++;
if(d.visual === "NOK") nok++;

});

new Chart(
document.getElementById("grafico1"),
{
type:"bar",
data:{
labels:["Aprovado","Reprovado"],
datasets:[{
label:"Controle de aprovações e rejeições de setup",
data:[ok,nok]
}]
}
}
);


// -------- TIPO VALVULA

let tipos = {};

dados.forEach(d => {

tipos[d.tipoValvula] =
(tipos[d.tipoValvula] || 0) + 1;

});

new Chart(
document.getElementById("grafico2"),
{
type:"pie",
data:{
labels:Object.keys(tipos),
datasets:[{
data:Object.values(tipos)
}]
}
}
);


// -------- PLANICIDADE

let topo = dados.map(d => d.planicidadetopo);

new Chart(
document.getElementById("grafico3"),
{
type:"line",
data:{
labels: topo.map((_,i)=>i+1),
datasets:[{
label:"Planicidade",
data:topo
}]
}
}
);


})
.catch(err=>{
console.log(err);
alert("Erro ao buscar dados");
});

// roda quando abre
carregarDados();


// roda a cada 3 segundos
setInterval(carregarDados, 3000);