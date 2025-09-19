const plantDesc = document.getElementById("planta-atual")

async function getPlanta() {
    const objDados = await callDados();
    const objPlanta = await callPlanta(objDados[0].planta);
    plantDesc.innerText = objPlanta[0].nome;
}

getPlanta();