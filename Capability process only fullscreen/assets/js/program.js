function processoCpk() {
  Swal.fire({
    icon: "info",
    title: "Como o Cpk é calculado ?",
    html: `
      <div style="height:320px; display: flex; align-itens: start; flex-direction: column;">
        <p>O índice Cpk avalia a capacidade real de um processo em atender aos limites de especificação, considerando a variabilidade e o posicionamento da média.</p>
        <p>A partir das amostras informadas, calcula-se a <strong>média (x̄)</strong> e o desvio padrão <strong>within (σᵥ)</strong>, estimado pelo método da diferença sucessiva, conforme prática industrial:</p>
        <p><strong>σᵥ = ( média das diferenças sucessivas ) / 1,128</strong></p>
        <p>Quando existem limites superior (USL) e inferior (LSL), o estudo é bilateral, e o Cpk corresponde ao menor valor entre:</p>
        <p><strong>Cpk = min [ (USL − x̄) / (3σᵥ) , (x̄ − LSL) / (3σᵥ) ]</strong></p>
        <p>Caso apenas o USL seja informado, o estudo é unilateral:</p>
        <p><strong>Cpk = (USL − x̄) / (3σᵥ)</strong></p>
        <p>Valores de <strong>Cpk ≥ 1,33</strong> indicam um processo capaz; valores menores que <strong>1,00</strong> indicam processo incapaz.</p>
      </div>
    `,
    width: "80%", 
    padding: "1rem",
    showCloseButton: true,
    confirmButtonText: "Fechar",
    confirmButtonColor: '#0d6efd',
  });
}

function processoCp(){
Swal.fire({
    icon: "info",
    title: "Como o Cp é calculado ?",
    html: `
      <div style="height:320px; display: flex; align-itens: start; flex-direction: column;">
        <p>O índice Cp mede a <strong>capacidade potencial do processo</strong>, avaliando apenas a largura da tolerância em relação à variabilidade natural, sem considerar o posicionamento da média.</p>
        <p>Neste sistema, o Cp é calculado somente quando existem <strong>limite superior (USL) e limite inferior (LSL)</strong>, caracterizando um estudo bilateral.</p>
        <p>A variabilidade do processo é representada pelo <strong>desvio padrão within (σᵥ)</strong>, estimado pelo método da diferença sucessiva, conforme prática estatística industrial:</p>
        <p><strong>σᵥ = ( média das diferenças sucessivas ) / 1,128</strong></p>
        <p>Com isso, o Cp é calculado pela relação entre a faixa de tolerância e seis desvios padrão do processo:</p>
        <p><strong>Cp = (USL − LSL) / (6σᵥ)</strong></p>
        <p>O índice Cp representa a capacidade teórica máxima do processo. Valores de <strong>Cp ≥ 1,33</strong> indicam que a variabilidade é suficientemente pequena em relação à tolerância; entretanto, mesmo com Cp adequado, o processo pode ser incapaz se estiver descentralizado, o que é avaliado pelo índice Cpk.</p>
      </div>
    `,
    width: "80%", 
    padding: "1rem",
    showCloseButton: true,
    confirmButtonText: "Fechar",
    confirmButtonColor: '#0d6efd',
  });
}

function processoPpk(){
Swal.fire({
    icon: "info",
    title: "Como o Ppk é calculado ?",
    html: `
      <div style="height:320px; display: flex; align-itens: start; flex-direction: column;">
        <p>O índice Ppk avalia o desempenho global do processo, considerando toda a variabilidade observada ao longo do período analisado, por meio do desvio padrão populacional (σₚ).</p>
        <p>Quando existem <strong>limite superior (USL) e limite inferior (LSL)</strong>, o estudo é bilateral, e o Ppk é calculado como o menor valor entre:</p>
        <p><strong>Ppk = min [ (USL − x̄) / (3σₚ) , (x̄ − LSL) / (3σₚ) ]</strong></p>
        <p>Quando apenas o <strong>limite superior (USL)</strong> é informado, o estudo é unilateral. Nessa condição, o índice Ppk não é calculado pelo programa, pois não é possível avaliar o desempenho global do processo sem a definição completa da faixa de tolerância.</p>
        <p>Diferenças significativas entre <strong>Cpk e Ppk</strong> podem indicar variações de longo prazo ou instabilidade do processo.</p>
      </div>
    `,
    width: "80%", 
    padding: "1rem",
    showCloseButton: true,
    confirmButtonText: "Fechar",
    confirmButtonColor: '#0d6efd',
  });
}

function processoPp(){
Swal.fire({
    icon: "info",
    title: "Como o Pp é calculado ?",
    html: `
      <div style="height:320px; display: flex; align-itens: start; flex-direction: column;">
        <p>O índice Pp mede a <strong>capacidade potencial global do processo</strong>, considerando a variabilidade total observada ao longo do período analisado, representada pelo <strong>desvio padrão populacional (σₚ)</strong>.</p>
        <p>Neste programa, o índice Pp é calculado somente em <strong>estudos bilaterais</strong>, quando existem limite superior (USL) e limite inferior (LSL) definidos. Nessa condição, o Pp é obtido pela relação entre a faixa total de tolerância e seis desvios padrão do processo:</p>
        <p><strong>Pp = (USL − LSL) / (6σₚ)</strong></p>
        <p>Quando apenas o <strong>limite superior (USL)</strong> é informado no estudo das amostras, o processo é considerado <strong>unilateral</strong> e, nessa situação, o <strong>índice Pp não é calculado pelo programa</strong>, pois a ausência do limite inferior impede a avaliação completa da capacidade potencial do processo.</p>
        <p>Valores mais elevados de Pp indicam menor variabilidade global em relação à tolerância especificada.</p>
        
      </div>
    `,
    width: "80%", 
    padding: "1rem",
    showCloseButton: true,
    confirmButtonText: "Fechar",
    confirmButtonColor: '#0d6efd',
  });
}





