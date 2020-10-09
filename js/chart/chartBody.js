
const chartNumberMax = (e) => {
    return Math.max.apply(null, e);
  }

const chartBody = (dataMax, dataMin) => {
const ctx = document.getElementById('chartMin').getContext('2d');
const ctx1 = document.getElementById("chartMax").getContext("2d");


const options = {legend: false,
  tooltips: {enabled: false,},
  cornerRadius: 20,
    title: {
      display: true,
      text: ''
    },
  maintainAspectRatio: false,
  scales: {
      xAxes: [{
        gridLines: {
            display: false,
            tickMarkLength: 0,
            drawTicks: false,
         },
         ticks: {
          max: chartNumberMax(dataMax),
          min: 0,
          display: false,
       },
         beginAtZero: true   
      }],
      yAxes: [{
        gridLines: {
            display: true,
            offsetGridLines: false,
            drawTicks: false,
            borderDash: [5],
            color:"#D1E4F8"
            
         },
       ticks: {
              display: false,
              beginAtZero: true,
            
       }
     }]
   }}
const maxChart = new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
      labels: dataMax,
      datasets: [{
          barPercentage: 0.5,
          barThickness: 10,
        label: '',
        data: dataMax,
        borderWidth: 0,
        backgroundColor: "#FA4400",
        radius: 5,
      }]
    },
    responsive: false,
    options:  options
  });
  
  const minChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: dataMin,
      datasets: [{
          barPercentage: 0.5,
          barThickness: 10,
        label: '',
        data: dataMin,
        borderWidth: 0,
        backgroundColor: "#D1E4F8",
      }]
    },
    responsive: false,
    options:options
  });
}