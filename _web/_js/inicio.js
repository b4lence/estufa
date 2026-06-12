import { callPlanta, callUsuario, callDados } from './callAPI.js';

const list = document.getElementById('optionsList');
const image = document.getElementById('planta_img');

const tempIcon = document.getElementById('iconTemperatura');
const tempText = document.getElementById('spanTemperatura');
const arIcon = document.getElementById('iconUmidadeAr');
const arText = document.getElementById('spanUmidadeAr');
const soloIcon = document.getElementById('iconUmidadeSolo');
const soloText = document.getElementById('spanUmidadeSolo');
const reservIcon = document.getElementById('iconNivelReservatorio');
const reservText = document.getElementById('spanNivelReservatorio');

async function plantOptions() {
    const objPlanta = await callPlanta();
    if (Object.keys(await objPlanta).length == 0) {
        return;
    }

    for (let i in objPlanta) {
        list.innerHTML += "<option value=\"" + objPlanta[i].nome + "\"></option>";
    }
}

async function getImagePlanta() {
    const objUsuario = await callUsuario();
    if (Object.keys(objUsuario).length == 0) {
        return;
    }

    const objPlanta = await callPlanta(objUsuario[0].planta);
    if (Object.keys(objPlanta).length == 0) {
        return;
    }

    image.setAttribute('src', "_assets/_img-plants/" + objPlanta[0].foto);
}

async function fillData() {
    const objDados = await callDados();
    if (Object.keys(await objDados).length == 0) {
        return;
    }

    tempText.innerHTML = parseFloat(objDados[0].temperatura) + "°C";
    arText.innerHTML = parseFloat(objDados[0].umidade_ar) + "%";
    soloText.innerHTML = parseFloat(objDados[0].umidade_solo) + "%";
    reservText.innerHTML = parseFloat(objDados[0].reservatorio) + "%";
    
    document.getElementById("esquerdaCima").addEventListener('mouseover', () => {
        tempText.style.display = 'block';
        tempIcon.style.display = 'none';
    });
    document.getElementById("esquerdaCima").addEventListener('mouseout', () => {
        tempText.style.display = 'none';
        tempIcon.style.display = 'block';
    });

    document.getElementById("esquerdaBaixo").addEventListener('mouseover', () => {
        arText.style.display = 'block';
        arIcon.style.display = 'none';
    });
    document.getElementById("esquerdaBaixo").addEventListener('mouseout', () => {
        arText.style.display = 'none';
        arIcon.style.display = 'block';
    });

    document.getElementById("direitaCima").addEventListener('mouseover', () => {
        soloText.style.display = 'block';
        soloIcon.style.display = 'none';
    });
    document.getElementById("direitaCima").addEventListener('mouseout', () => {
        soloText.style.display = 'none';
        soloIcon.style.display = 'block';
    });

    document.getElementById("direitaBaixo").addEventListener('mouseover', () => {
        reservText.style.display = 'block';
        reservIcon.style.display = 'none';
    });
    document.getElementById("direitaBaixo").addEventListener('mouseout', () => {
        reservText.style.display = 'none';
        reservIcon.style.display = 'block';
    });
}
fillData();
getImagePlanta();
plantOptions();
