const list = document.getElementById('optionsList');

async function plantOptions() {
    if (!await callPlanta() || Object.keys(await callPlanta()).length == 0) {
        return;
    }
    const objPlanta = await callPlanta();
    for(let i in objPlanta){
        list.innerHTML += "<option value=\"" + objPlanta[i].nome + "\"></option>";
    }
}
plantOptions();