let arrayTemperatura = [];
let arrayUmidadeAr = [];
let arrayUmidadeSolo = [];
let arrayData = [];
let arrayHora = [];
let reservatorio = 0;
let rpm = 0;
const mesAnoElemento = document.getElementById('mesAno');
const datasElemento = document.getElementById('datas');
const botaoAnteriorElemento = document.getElementById('botaoMesAnterior');
const botaoProximoElemento = document.getElementById('botaoProximo');
let dataAtual = new Date();

const atualizarCalendario = () => {
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();

  const primeiroDia = new Date 
}

function tabelaUmidade(){
  const dataUmidade = {
    labels: arrayData,
    datasets: [
      {
        label: 'Umidade - solo (%)',
        data: arrayUmidadeSolo,
        backgroundColor: 'rgba(43, 189, 83, 0.5)',
        borderColor: 'rgb(43, 189, 83)',
        borderWidth: 2,
        tension: 0.1
      },
      {
        label: 'Umidade - ar (%)',
        data: arrayUmidadeAr,
        backgroundColor: 'rgba(64, 135, 83, 0.5)',
        borderColor: 'rgb(64, 135, 83)',
        borderWidth: 2,
        tension: 0.1
      }
    ]
  };
  
  const config = {
    type: 'line',
    data: dataUmidade,
    options: {
      responsive: false,
      maintainAspectRatio: false,
      layout: {
        padding: {
          right: 35,
          left: 20
        }
      },
      scales: {
        x: {
          ticks: {
            display: true
          },
          grid: {
            display: true
          }
        },
        y: {
          beginAtZero: true,
        }
      }
    }
  };
  
  new Chart(
    document.getElementById('graficoUmidade'),
    config
  );
}

function tabelaReservatorio(){
  const dataReservatorio = {
    labels: ['Nível - Reservatório (%)', 'Vazio'],
    datasets: [{
      label: 'Porcentagem',
      data: [reservatorio, 100 - reservatorio],
      backgroundColor: [
        'rgb(20, 173, 132)',
        'rgb(229, 229, 229)'
      ],
      hoverOffset: 4
    }]
  };
  
  const configReservatorio = {
    type: 'doughnut',
    data: dataReservatorio,
    options: {
      plugins: {
        legend: {
          labels: {
            filter: function (item, chart) {
              return item.text !== 'Vazio';
            }
          }
        }
      }
    }
  };
  
  new Chart(
    document.getElementById('graficoReservatorio'),
    configReservatorio
  );
}

function tabelaTemperatura(){
  const dataTemp = {
    labels: arrayData,
    datasets: [
      {
        label: 'Temperatura (Graus Celsius)',
        data: arrayTemperatura,
        backgroundColor: 'rgba(43, 189, 83, 0.5)',
        borderColor: 'rgb(43, 189, 83)',
        borderWidth: 2,
        tension: 0.1
      },
    ]
  };
  const configTemp = {
    type: 'line',
    data: dataTemp,
    options: {
      responsive: false,
      maintainAspectRatio: false,
      layout: {
        padding: {
          right: 35,
          left: 20
        }
      },
      scales: {
        x: {
          ticks: {
            display: true
          },
          grid: {
            display: true
          }
        },
        y: {
          beginAtZero: true,
        }
      }
    }
  };
  
  new Chart(
    document.getElementById('graficoTemp'),
    configTemp
  );
}

function tabelaRPM(){
  const dataRPM = {
    labels: ['Rotações por minuto (RPM)', ''],
    datasets: [{
      label: 'Rotações por minuto (RPM)',
      data: [rpm, 1485 - rpm],
      backgroundColor: [
        'rgb(20, 173, 132)',
        'rgb(229, 229, 229)'
      ],
      hoverOffset: 4
    }]
  };
  
  const configRPM = {
    type: 'doughnut',
    data: dataRPM,
    options: {
      plugins: {
        legend: {
          labels: {
            filter: function (item, chart) {
              return item.text !== 'Stand By';
            }
          }
        }
      }
    }
  };
  
  new Chart(
    document.getElementById('graficoRPM'),
    configRPM
  );
}

async function chamarApi(dataComeco, dataFim) {
  const resp = await fetch('http://localhost/Dashboard-TCC/BACKEND/pegarDados.php?dataComeco=' + dataComeco + '&dataFim=' + dataFim);
  
  if (resp.status !== 200) {
    return;
  }

  const obj = await resp.json();
  for (let i in obj) {
    arrayTemperatura.push(parseFloat(obj[i].temperatura));
    arrayUmidadeAr.push(parseFloat(obj[i].umidade_ar));
    arrayUmidadeSolo.push(parseFloat(obj[i].umidade_solo));
    arrayData.push(obj[i].data.toString());
    arrayHora.push(obj[i].hora.toString());
    reservatorio = parseInt(obj[i].reservatorio);
    rpm = parseInt(obj[i].rpm);
  }
  tabelaRPM();
  tabelaReservatorio();
  tabelaTemperatura();
  tabelaUmidade();
}
chamarApi('2025-06-04', '2025-06-04');