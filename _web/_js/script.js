let arrayTemperatura = [];
let arrayUmidadeAr = [];
let arrayUmidadeSolo = [];
let arrayData = [];
let arrayHora = [];
let reservatorio = 0;

let dia = "";
let mes = "";
let ano = "";

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
    mes = (month + 1).toString();
    if (mes.length === 1) {
      mes = '0' + mes;
    }

    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = '';

    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const adjustedFirstDay = firstDay === 0 ? 7 : firstDay;
    for (let i = adjustedFirstDay - 1; i > 0; i--) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add('fade');

      dayDiv.addEventListener('click', function () {
        selectDate(dayDiv);
      });

      daysContainer.appendChild(dayDiv);
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;

      dayDiv.addEventListener('click', function () {
        selectDate(dayDiv);
      });

      daysContainer.appendChild(dayDiv);
    }

    // Dias do próximo mês
    const totalDisplayed = daysContainer.children.length;
    const nextDays = 42 - totalDisplayed;
    for (let i = 1; i <= nextDays; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;
      dayDiv.classList.add('fade');

      dayDiv.addEventListener('click', function () {
        selectDate(dayDiv);
      });

      daysContainer.appendChild(dayDiv);
    }
  }

  function selectDate(dayDiv) {
    const selected = daysContainer.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
    dayDiv.classList.add('selected');
    dia = daysContainer.querySelector('.selected').innerText;
    chamarApi([ano, mes, dia].join('-').toString(), [ano, mes, dia].join('-').toString());
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
const configUmidade = {
  type: 'line',
  data: dataUmidade,
  options: {
    responsive: true,
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

function atualizarGraficos(arrayData) {
  graficoTemp.data.labels = arrayData;
  graficoTemp.data.datasets[0].data = arrayTemperatura;
  graficoTemp.update();

  graficoUmidade.data.labels = arrayData;
  graficoUmidade.data.datasets[0].data = arrayUmidadeAr;
  graficoUmidade.data.datasets[1].data = arrayUmidadeSolo;
  graficoUmidade.update();

  graficoReservatorio.data.datasets[0].data = [reservatorio, 100 - reservatorio];
  graficoReservatorio.update();
}

async function chamarApi(dataComeco, dataFim) {
  const resp = await fetch('http://localhost/_web/_php/pegarDados.php?dataComeco=' + dataComeco + '&dataFim=' + dataFim);

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
  }
  atualizarGraficos(arrayData);

  arrayTemperatura = [];
  arrayUmidadeAr = [];
  arrayUmidadeSolo = [];
  arrayData = [];
  arrayHora = [];
  reservatorio = 0;
}
