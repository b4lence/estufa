function ultimos7dias() {
    const labels = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(today.getDate() - i);
        labels.push(day.toLocaleDateString('pt-BR'));
    }

    return labels;
}

const labels = ultimos7dias();
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Umidade - solo (%)',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(43, 189, 83, 0.5)',
            borderColor: 'rgb(43, 189, 83)',
            borderWidth: 2,
            tension: 0.1
        },
        {
            label: 'Umidade - ar (%)',
            data: [45, 89, 30, 61, 46, 25, 60],
            backgroundColor: 'rgba(64, 135, 83, 0.5)',
            borderColor: 'rgb(64, 135, 83)',
            borderWidth: 2,
            tension: 0.1
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: false,
        maintainAspectRatio: false,
        layout: {
        padding: {
            right: 35,
            left:20
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

// Código para o gráfico de umidade do solo e do ar.

const valorReservatorio = 72;

const dataReservatorio = {
  labels: ['Nível - Reservatório (%)', 'Vazio'],
  datasets: [{
    label: 'Porcentagem',
    data: [valorReservatorio, 100 - valorReservatorio],
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
          filter: function(item, chart) {
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

// Código para o gráfico do nível do reservatório.

const labelsTemp = ultimos7dias();
const dataTemp = {
    labels: labelsTemp,
    datasets: [
        {
            label: 'Temperatura (Graus Celsius)',
            data: [25, 19, 30, 31, 26, 25, 20],
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
            left:20
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

// Código para o gráfico da temperatura.

const valorRPM = 615;

const dataRPM = {
  labels: ['Rotações por minuto (RPM)', 'Stand By'],
  datasets: [{
    label: 'Rotações por minuto (RPM)',
    data: [valorRPM, 1485 - valorRPM],
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
          filter: function(item, chart) {
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

// Código para o gráfico de RPM.  
