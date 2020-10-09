const chartHeader = (data) => {
const chance = data.map(function(e){
    return Math.round(e.temp)
  })
  const label = data.map(function(e){
    return secToDate(e.dt, "h");
  })

  const optionChart = {legend: false,
    title:{
      display:true,
    },
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
              display: true,
              tickMarkLength: 0,
              drawTicks: false,
              borderDash: [5],
              color:"#201E4F",
              offsetGridLines: false
           },
           ticks: {
            max: chartNumberMax(chance),
            fontSize: 15,
                fontColor: "#FAFAFB",
            display: true,
            padding: 20,
         },
           beginAtZero: true   
        }],
        yAxes: [{
          gridLines: {
              display: false,
              drawTicks: false,
           },
         ticks: {
                display:true,
                beginAtZero: true,
                offsetGridLines:false,
                drawTicks: false,
                fontSize: 13,
                fontColor: "#FAFAFB",
                callback: function(value, index, values){
                  return value + '°C';
                }
              
         }
       }]
     }}
  const ctx3 = document.getElementById('myChart2').getContext('2d');
  const myChart = new Chart(ctx3, {
      type: 'bar',
      data: {
          labels: label,
          datasets: [{barPercentage: 0.5,
            barThickness: 20,
              data: chance,
              backgroundColor:["#FA4400","#302E62","#302E62","#302E62","#302E62","#302E62"],
              borderWidth: 1,
              
          }]
      },
      responsive: false,
      options: optionChart
  });
}