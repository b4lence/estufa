import { callPlanta, callUsuario } from './callAPI.js';

const plantDesc = document.getElementById("planta-atual")
const image = document.getElementById('img-usuario');
const username = document.getElementById('username');

async function getPlanta() {
    const objUsuario = await callUsuario();
    if (!objUsuario || Object.keys(objUsuario).length == 0) {
        return;
    }

    const objPlanta = await callPlanta(objUsuario[0].planta);
    if (!objPlanta || Object.keys(objPlanta).length == 0) {
        return;
    }

    plantDesc.innerText = objPlanta[0].nome;
}
async function getUserConfig() {
    const objUsuario = await callUsuario();
    if (!objUsuario || Object.keys(objUsuario).length == 0) {
        return;
    }
    
    image.setAttribute('src', "_assets/_img-userconfig/" + objUsuario[0].foto);
    username.innerHTML = objUsuario[0].nome;
}
getPlanta();
getUserConfig();