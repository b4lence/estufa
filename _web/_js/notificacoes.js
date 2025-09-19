const open = document.getElementById('open')
const modal_container = document.getElementById('modal_container')
const modal_content = document.getElementById('modal-content')
const close = document.getElementById('close')

open.addEventListener('click', () => {
  modal_container.classList.add('show');
  modal_content.innerHTML = '';
  criarNotificacao();
});
close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

async function criarNotificacao() {
  if (!await callDados() || Object.keys(await callDados()).length == 0) {
    return;
  }
  const objDados = await callDados();

  if (!await callPlanta(objDados[0].planta) || Object.keys(await callPlanta(objDados[0].planta)).length == 0) {
    return;
  }
  const objPlanta = await callPlanta(objDados[0].planta);

  // TEMPERATURA
  if (objDados[0].temperatura < objPlanta[0].temperatura - 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura muito baixa (' + parseFloat(objDados[0].temperatura) + '°C) </p> </div>';
  } else if (objDados[0].temperatura < objPlanta[0].temperatura - 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura baixa (' + parseFloat(objDados[0].temperatura) + '°C) </p> </div>';
  } else if (objDados[0].temperatura > objPlanta[0].temperatura + 5) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura muito alta (' + parseFloat(objDados[0].temperatura) + '°C) </p> </div>';
  } else if (objDados[0].temperatura > objPlanta[0].temperatura + 3) {
    modal_content.innerHTML += '<div class="notificacao"> <p> Temperatura alta (' + parseFloat(objDados[0].temperatura) + '°C) </p> </div>';
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

  if (modal_content.innerHTML == '') {
    modal_content.innerHTML += '<p style="text-align: center; margin-top: 100px; color: rgb(145, 145, 145);">Nada de novo por aqui</p>';
  }
}
