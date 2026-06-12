import { callPlanta, callDados } from './callAPI.js';

const open = document.getElementById('open')
const modal_container = document.getElementById('modal_container')
const contador = document.getElementById('contador');
const modal_content = document.getElementById('modal-content')
const close = document.getElementById('close')
const unidade = sessionStorage.getItem('unidade');

open.addEventListener('click', () => {
  modal_container.classList.add('show');
  criarNotificacao();
});
close.addEventListener('click', () => {
  modal_content.innerHTML = '';
  modal_container.classList.remove('show');
});
async function alertaNotificacao() {
  let alerta = 0;
  const objDados = await callDados();
  if (!objDados || Object.keys(objDados).length == 0) {
    return;
  }

  const objPlanta = await callPlanta(objDados[0].planta);
  if (!objPlanta || Object.keys(objPlanta).length == 0) {
    return;
  }

  if (unidade == "°F") {
    objDados[0].temperatura = objDados[0].temperatura * 1.8 + 32;
    objPlanta[0].temperatura = objPlanta[0].temperatura * 1.8 + 32;
  }

  // TEMPERATURA
  if (objDados[0].temperatura < objPlanta[0].temperatura - 5 || objDados[0].temperatura < objPlanta[0].temperatura - 3 || objDados[0].temperatura > objPlanta[0].temperatura + 5 || objDados[0].temperatura > objPlanta[0].temperatura + 3) {
    alerta = 1;
  }

  // UMIDADE DO AR
  if (objDados[0].umidade_ar < objPlanta[0].umidade_ar - 5 || objDados[0].umidade_ar > objPlanta[0].umidade_ar + 3 || objDados[0].umidade_ar > objPlanta[0].umidade_ar + 5 || objDados[0].umidade_ar < objPlanta[0].umidade_ar - 3) {
    alerta = 1;
  }

  // UMIDADE DO SOLO
  if (objDados[0].umidade_solo < objPlanta[0].umidade_solo - 5 || objDados[0].umidade_solo > objPlanta[0].umidade_solo + 3 || objDados[0].umidade_solo > objPlanta[0].umidade_solo + 5 || objDados[0].umidade_solo < objPlanta[0].umidade_solo - 3) {
    alerta = 1;
  }

  // RESERVATORIO
  if (objDados[0].reservatorio < 20 || objDados[0].reservatorio < 50) {
    alerta = 1;
  }

  if (alerta == 1) {
    contador.innerHTML = "!";
  } else {
    contador.innerHTML = "";
  }
}

async function criarNotificacao() {
  let sufix = "°C";
  const objDados = await callDados();
  if (!objDados || Object.keys(objDados).length == 0) {
    modal_content.innerHTML += '<p style="text-align: center; margin-top: 100px; color: rgb(145, 145, 145);">Nenhuma notificação</p>';
    return;
  }

  const objPlanta = await callPlanta(objDados[0].planta);
  if (!objPlanta || Object.keys(objPlanta).length == 0) {
    modal_content.innerHTML += '<p style="text-align: center; margin-top: 100px; color: rgb(145, 145, 145);">Nenhuma notificação</p>';
    return;
  }

  if (unidade == "°F") {
    objDados[0].temperatura = objDados[0].temperatura * 1.8 + 32;
    objPlanta[0].temperatura = objPlanta[0].temperatura * 1.8 + 32;
    sufix = "°F";
  }

  // TEMPERATURA
  if (objDados[0].temperatura < objPlanta[0].temperatura - 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura muito baixa (' + parseFloat(objDados[0].temperatura) + sufix + ') </p> </div>';
  } else if (objDados[0].temperatura < objPlanta[0].temperatura - 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura baixa (' + parseFloat(objDados[0].temperatura) + sufix + ') </p> </div>';
  } else if (objDados[0].temperatura > objPlanta[0].temperatura + 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura muito alta (' + parseFloat(objDados[0].temperatura) + sufix + ') </p> </div>';
  } else if (objDados[0].temperatura > objPlanta[0].temperatura + 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura alta (' + parseFloat(objDados[0].temperatura) + sufix + ') </p> </div>';
  }

  // UMIDADE DO AR
  if (objDados[0].umidade_ar < objPlanta[0].umidade_ar - 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do ar muito baixa (' + parseFloat(objDados[0].umidade_ar) + '%) </p> </div>';
  } else if (objDados[0].umidade_ar < objPlanta[0].umidade_ar - 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do ar baixa (' + parseFloat(objDados[0].umidade_ar) + '%) </p> </div>';
  } else if (objDados[0].umidade_ar > objPlanta[0].umidade_ar + 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do ar muito alta (' + parseFloat(objDados[0].umidade_ar) + '%) </p> </div>';
  } else if (objDados[0].umidade_ar > objPlanta[0].umidade_ar + 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do ar alta (' + parseFloat(objDados[0].umidade_ar) + '%) </p> </div>';
  }

  // UMIDADE DO SOLO
  if (objDados[0].umidade_solo < objPlanta[0].umidade_solo - 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do solo em muito baixa (' + parseFloat(objDados[0].umidade_solo) + '%) </p> </div>';
  } else if (objDados[0].umidade_solo < objPlanta[0].umidade_solo - 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do solo baixa (' + parseFloat(objDados[0].umidade_solo) + '%) </p> </div>';
  } else if (objDados[0].umidade_solo > objPlanta[0].umidade_solo + 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do solo muito alta (' + parseFloat(objDados[0].umidade_solo) + '%) </p> </div>';
  } else if (objDados[0].umidade_solo > objPlanta[0].umidade_solo + 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Umidade do solo alta (' + parseFloat(objDados[0].umidade_solo) + '%) </p> </div>';
  }

  // RESERVATORIO
  if (objDados[0].reservatorio < 20) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Nível de água do reservatório em estado crítico (' + parseFloat(objDados[0].reservatorio) + '%) </p> </div>';
  } else if (objDados[0].reservatorio < 50) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Nível de água do reservatório baixo (' + parseFloat(objDados[0].reservatorio) + '%) </p> </div>';
  }
}
alertaNotificacao();