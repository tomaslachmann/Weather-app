
const weather = JSON.parse(localStorage.getItem("coords"));

const foreCast = (lat, lon) =>
{
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=cz&units=metric&exclude=minutely,alerts&appid=d185cc724a1b03e7aecc2dfe6d7b4daa`)
  .then(resp => resp.json())
  .then(data => {console.log(data);createContent(data, 0, 24);})
}

foreCast(weather.lat, weather.lon);

const option = (data) => {
  let select = document.querySelector("select");
  const opt = newEl('option',{class:'ahoj'},data);
  select.appendChild(opt);
}

const secToDate = (data, t, l) => {
    let options = { weekday: l, month: l, day: 'numeric'};
    let time;

    const dt = new Date(data * 1000);
    const hodiny = (t, dt) => {
      const h = dt.toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'});
      time = h;
    }
    const dny = (t, dt) => {
      const d = new Intl.DateTimeFormat('cs-CZ', options).format(dt);
        time = d;
    }
    t == "h" ? hodiny(t, dt)
    : dny(t, dt)

    return time;
}

const createContent = (data, min, max) => {

const dataWeather = data.hourly.slice(min, max);

const table = newEl('table',{ class: 'table'},'');
const temp_min = newEl('table',{class: 'tableLeft'},'');
const temp_max = newEl('table',{class:'tableRight'},'');
document.querySelector(".foreCastBody .left").appendChild(table);
document.querySelector(".foreCastBody .right .leftBody").appendChild(temp_min);
document.querySelector(".foreCastBody .right .rightBody").appendChild(temp_max);

for (let i = 0; i < dataWeather.length; i++){

    let node = newEl('tr',{class: 'hodiny'},newEl('td',{},newEl('span',{id: 'hodiny'},`${secToDate(dataWeather[i].dt, "h", "short")}`,),newEl('span',{},newEl('img',{class:"raindrop",src: "raindrop.svg"},''),`${Math.round(dataWeather[i].pop * 100)}%`),newEl('img',{ src: `http://openweathermap.org/img/w/${dataWeather[i].weather[0].icon}.png`,alt: "Weather icon"},),),);
    table.appendChild(node);
 
    let tr_min = newEl('tr',{},newEl('td',{}, `${Math.round(dataWeather[i].feels_like)}°C`), '');
    let tr_max = newEl('tr',{},newEl('td',{}, `${Math.round(dataWeather[i].temp)}°C`), '');
    temp_min.appendChild(tr_min);
    temp_max.appendChild(tr_max);
}
const chartDataMax = dataWeather.map(function(e){
  return Math.round(e.temp);
});

const chartDataMin = dataWeather.map(function(e){
return Math.round(e.feels_like);
});

const chartNumberMax = (e) => {
  return Math.max.apply(null, e);
}


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
          max: chartNumberMax(chartDataMax),
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
      labels: chartDataMax,
      datasets: [{
          barPercentage: 0.5,
          barThickness: 10,
        label: '',
        data: chartDataMax,
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
      labels: chartDataMin,
      datasets: [{
          barPercentage: 0.5,
          barThickness: 10,
        label: '',
        data: chartDataMin,
        borderWidth: 0,
        backgroundColor: "#D1E4F8",
      }]
    },
    responsive: false,
    options:options
  });

}
