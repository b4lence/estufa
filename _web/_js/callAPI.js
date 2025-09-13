async function callPlanta(id) {
    const resp = await fetch('http://localhost/_web/_php/_api/pegarPlanta.php?planta=' + id);

    if (resp.status !== 200) {
        return false;
    }

    return await resp.json();
}
async function callDados(dataComeco, dataFim) {
    let respDados;
    if (dataComeco === undefined || dataFim === undefined) {
        respDados = await fetch('http://localhost/_web/_php/_api/pegarDados.php');
    } else {
        respDados = await fetch('http://localhost/_web/_php/_api/pegarDados.php?dataComeco=' + dataComeco + '&dataFim=' + dataFim);
    }

    if (respDados.status !== 200) {
        return false;
    }

    return await respDados.json();
}