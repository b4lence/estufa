import { callDados, callPlanta, callUsuario } from "./callAPI.js";

const temperatura = 0;
const temperaturaIdeal = 1;
const umidadeSolo = 2;
const umidadeAr = 3;
const umidadeIdeal = 4;
const data = 5;
const reservatorio = 6;

let dados = [[], [], [], [], [], [], []];

let mes = "";
let ano = "";

let dataComeco = '';
let dataFim = '';

document.addEventListener('DOMContentLoaded', function () {
  const monthYear = document.getElementById('month-year');
  const daysContainer = document.getElementById('days');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  let currentDate = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    ano = year.toString();
    mes = (month + 1).toString().padStart(2, '0');

    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = '';

    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const adjustedFirstDay = firstDay === 0 ? 7 : firstDay;
    for (let i = adjustedFirstDay - 1; i > 0; i--) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add('fade');

      let mesAnterior = month === 0 ? 11 : month - 1;
      let anoAnterior = month === 0 ? year - 1 : year;
      dayDiv.dataset.mes = (mesAnterior + 1).toString().padStart(2, '0');
      dayDiv.dataset.ano = anoAnterior.toString();

      dayDiv.addEventListener('click', function () {
        selectDate(dayDiv);
      });
      daysContainer.appendChild(dayDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;

      dayDiv.dataset.mes = (month + 1).toString().padStart(2, '0');
      dayDiv.dataset.ano = year.toString();

      dayDiv.addEventListener('click', function () {
        selectDate(dayDiv);
      });
      daysContainer.appendChild(dayDiv);
    }

    const totalDisplayed = daysContainer.children.length;
    const nextDays = 42 - totalDisplayed;
    for (let i = 1; i <= nextDays; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;
      dayDiv.classList.add('fade');

      let mesProximo = month === 11 ? 0 : month + 1;
      let anoProximo = month === 11 ? year + 1 : year;
      dayDiv.dataset.mes = (mesProximo + 1).toString().padStart(2, '0');
      dayDiv.dataset.ano = anoProximo.toString();

      dayDiv.addEventListener('click', function () {
        selectDate(dayDiv);
      });
      daysContainer.appendChild(dayDiv);
    }
  }

  function selectDate(dayDiv) {
    const diaSelecionado = dayDiv.textContent.padStart(2, '0');
    const dataSelecionada = new Date(`${dayDiv.dataset.ano}-${dayDiv.dataset.mes}-${diaSelecionado}`);

    if (!dataComeco || (dataComeco && dataFim)) {
      dataComeco = dataSelecionada;
      dataFim = null;
      clearSelection();
      limparDados();
      dayDiv.classList.add('selected');
    }
    else if (!dataFim) {
      if (dataSelecionada.getTime() === dataComeco.getTime()) {
        dataFim = dataComeco;
      } else if (dataSelecionada > dataComeco) {
        dataFim = dataSelecionada;
      } else {
        dataFim = dataComeco;
        dataComeco = dataSelecionada;
      }
      highlightRange();
    }
    console.log(new Date(dataComeco).toISOString().slice(0, 10));
    console.log(new Date(dataFim).toISOString().slice(0, 10));
    if (dataFim === null){
      preencherGrafico(new Date(dataComeco).toISOString().slice(0, 10), new Date(dataComeco).toISOString().slice(0, 10));
    } else {
      preencherGrafico(new Date(dataComeco).toISOString().slice(0, 10), new Date(dataFim).toISOString().slice(0, 10));
    }
  }

  function clearSelection() {
    const dias = document.querySelectorAll('.days div');
    dias.forEach(d => d.classList.remove('selected'));
  }

  function highlightRange() {
    if (!dataComeco || !dataFim) return;

    const dias = document.querySelectorAll('.days div');
    dias.forEach(dayDiv => {
      const diaTexto = dayDiv.textContent.padStart(2, '0');
      const dataAtual = new Date(`${dayDiv.dataset.ano}-${dayDiv.dataset.mes}-${diaTexto}`);
      if (dataAtual >= dataComeco && dataAtual <= dataFim) {
        dayDiv.classList.add('selected');
      }
    });
  }

  prevButton.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextButton.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});


const dataUmidade = {
  labels: dados['dia'],
  datasets: [
    {
      label: 'Umidade - solo (%)',
      data: dados[umidadeSolo],
      backgroundColor: 'rgba(43, 189, 83, 0.5)',
      borderColor: 'rgb(43, 189, 83)',
      borderWidth: 2,
      tension: 0.1
    },
    {
      label: 'Umidade - ar (%)',
      data: dados[umidadeAr],
      backgroundColor: 'rgba(64, 135, 83, 0.5)',
      borderColor: 'rgb(64, 135, 83)',
      borderWidth: 2,
      tension: 0.1
    },
    {
      label: 'Umidade Ideal (%)',
      data: dados[umidadeIdeal],
      borderColor: 'gray',
      borderWidth: 1,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false,
      tension: 0
    }
  ]
};
const configUmidade = {
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
          display: true,
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        },
        grid: {
          display: true
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        }
      },
      title: {
        font: {
          size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
        }
      }
    }
  }
}
const dataReservatorio = {
  labels: ['Nível - Reservatório (%)', 'Vazio'],
  datasets: [{
    label: 'Porcentagem',
    data: [dados[reservatorio], 100 - dados[reservatorio]],
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
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          filter: function (item) {
            return item.text !== 'Vazio';
          },
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
        }
      }
    }
  }
};
const dataTemp = {
  labels: dados['dia'],
  datasets: [
    {
      label: 'Temperatura (Celsius)',
      data: dados[temperatura],
      backgroundColor: 'rgba(43, 189, 83, 0.5)',
      borderColor: 'rgb(43, 189, 83)',
      borderWidth: 2,
      tension: 0.1
    },  
    {
      label: 'Temperatura (Celsius)',
      data: dados[temperaturaIdeal],
      borderColor: 'gray',
      borderWidth: 1,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false,
      tension: 0
    }
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
          display: true,
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        },
        grid: {
          display: true
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
          }
        }
      },
      title: {
        font: {
          size: parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.8
        }
      }
    }
  }
}

const graficoReservatorio = new Chart(
  document.getElementById('graficoReservatorio'),
  configReservatorio
);
const graficoUmidade = new Chart(
  document.getElementById('graficoUmidade'),
  configUmidade
);
const graficoTemp = new Chart(
  document.getElementById('graficoTemp'),
  configTemp
);

function atualizarGraficos() {
  graficoTemp.data.labels = dados[data];
  graficoTemp.data.datasets[0].data = dados[temperatura];
  graficoTemp.data.datasets[1].data = dados[temperaturaIdeal];
  graficoTemp.update();

  graficoUmidade.data.labels = dados[data];
  graficoUmidade.data.datasets[0].data = dados[umidadeAr];
  graficoUmidade.data.datasets[1].data = dados[umidadeSolo];
  graficoUmidade.data.datasets[2].data = dados[umidadeIdeal];
  graficoUmidade.update();

  graficoReservatorio.data.datasets[0].data = [dados[reservatorio], 100 - dados[reservatorio]];
  graficoReservatorio.update();
}

function limparDados() {
  for (let i = 0; i < dados.length - 1; i++) {
    if (i === reservatorio) {
      continue;
    }
    dados[i] = [];
  }
  dados[reservatorio] = 0;
}

async function preencherGrafico(dataComeco, dataFim) {
  const objDados = await callDados(dataComeco, dataFim);
  if (!objDados || (Object.keys(objDados).length == 0)) {
    limparDados();
    atualizarGraficos();
    return;
  }

  const objPlanta = await callPlanta(objDados[0].planta);
  if (!objPlanta || Object.keys(objPlanta).length == 0) {
    limparDados();
    atualizarGraficos();
    return;
  }

  for (let i in objDados) {
    dados[temperatura].push(parseFloat(objDados[i].temperatura));
    dados[temperaturaIdeal].push(parseFloat(objPlanta[0].temperatura));


    dados[umidadeAr].push(parseFloat(objDados[i].umidade_ar));
    dados[umidadeSolo].push(parseFloat(objDados[i].umidade_solo));
    dados[umidadeIdeal].push(objPlanta[0].umidade_solo);

    dados[data].push(objDados[i].data.toString());

    dados[reservatorio] = parseInt(objDados[i].reservatorio);
  }

  atualizarGraficos();
  limparDados();
}
