async function callPlanta(id) {
    let resp;
    if (id === undefined) {
        resp = await fetch('http://localhost/_web/_php/_api/pegarPlanta.php?planta=');
    } else {
        resp = await fetch('http://localhost/_web/_php/_api/pegarPlanta.php?planta=' + id);
    }

    if (resp.status !== 200) {
        return false;
    }

    return await resp.json();
}
async function callDados(dataComeco, dataFim) {
    let respDados;
    if (dataComeco === undefined) {
        respDados = await fetch('http://localhost/_web/_php/_api/pegarDados.php?dataComeco=&dataFim=');
    } else {
        respDados = await fetch('http://localhost/_web/_php/_api/pegarDados.php?dataComeco=' + dataComeco + '&dataFim=' + dataFim);
    }

    if (respDados.status !== 200) {
        return false;
    }

    return await respDados.json();
}