const url = location.protocol + '//localhost/_web/';
// const url = location.protocol + '//florasync.site/';

export async function callPlanta(id) {
    let resp;
    if (id === undefined) {
        resp = await fetch(url + '_php/_api/pegarPlanta.php');
    } else {
        resp = await fetch(url + '_php/_api/pegarPlanta.php?planta=' + id);
    }

    if (resp.status !== 200) {
        return false;
    }

    return await resp.json();
}
export async function callDados(dataComeco, dataFim) {
    let respDados;
    if (dataFim === undefined && dataComeco === undefined) {
        respDados = await fetch(url + '_php/_api/pegarDados.php');
    } else if (dataFim === undefined) {
        respDados = await fetch(url + '_php/_api/pegarDados.php?dataComeco=' + dataComeco);
    } else {
        respDados = await fetch(url + '_php/_api/pegarDados.php?dataComeco=' + dataComeco + '&dataFim=' + dataFim);
    }

    if (respDados.status !== 200) {
        return false;
    }

    return await respDados.json();
}
export async function callUsuario() {
    const resp = await fetch(url + '_php/_api/pegarUsuario.php');

    if (resp.status !== 200) {
        return false;
    }

    return await resp.json();
}