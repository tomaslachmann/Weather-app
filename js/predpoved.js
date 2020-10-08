
const weather = JSON.parse(localStorage.getItem("coords"));
const images = JSON.parse(localStorage.getItem("saved"));
const cityName = localStorage.getItem("name");
const country = localStorage.getItem("country");
let dataWeather;
let tempMax;
let tempMin;
let chartDataMax;
let chartDataMin;
let temperature;

const foreCast = (lat, lon) =>
{
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=cz&units=metric&exclude=minutely,alerts&appid=d185cc724a1b03e7aecc2dfe6d7b4daa`)
  .then(resp => resp.json())
  .then(data => {createContent(data, spliceMin, spliceMax, ahoj, dataWeather, tempMax, tempMin, chartDataMax, chartDataMin); createHeader(data, cityName, country, den, dataWeather, temperature, tempMax);})
}

foreCast(weather.lat, weather.lon);

const option = (data) => {
  let select = document.querySelector("select");
  const opt = newEl('option',{class:'ahoj'},data);
  select.appendChild(opt);
}

const selW = (city) => {
  let sel = document.querySelector(".head select");
  let opts = document.querySelectorAll(".head select option");

  const selWidth = () => {
    let test = newEl('span',{}, sel.value);
    test.style.fontSize = sel.style.fontSize + 30 +"px";
    test.style.position = "absolute";
    document.querySelector(".landingPage").appendChild(test);
    sel.style.width = test.offsetWidth + "px";
    document.querySelector(".landingPage").removeChild(test);
  }
  opts.forEach(opt => {opt.value == city ? selWidth() : "nic"});
  
  document.querySelector(".head select").addEventListener("change", function(e) {
    let data = newSave;
    for (let i = 0; i < data.length; ++i) {
    if(data[i].City == e.target.value){
      searchCity(data[i].Coords, data[i].City, data[i].country);
    }
   }
  });
}

const selectSort = (city) => {
  const sel = document.querySelector("select")
  for (let opt, i = 0; opt = sel.options[i]; i++) {
    
    if (opt.value == city) {
        sel.selectedIndex = i;
        break;
    }
}
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


const getImages = (name) => {
  
  let params = {
    action: "query",
    prop: "extracts%7Cpageimages%7Crevisions",
    titles: name,
    format: "json",
    uselang: "cz",
    redirects: 1,
    formatversion: 2,
    exintro: 1,
    explaintext: 1,
    piprop: "thumbnail",
    pithumbsize: 300,
    rvprop: "timestamp"
};
let url = "https://en.wikipedia.org/w/api.php?origin=*"; 

Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

const card = newEl('div',{ class: 'card' },newEl('div',{ class: 'thumbnail' },newEl('img',{},''),''),newEl('span',{class: 'cityName'},name),'');

document.querySelector(".places").appendChild(card);


  fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        let pages = response.query.pages;
        for (let page in pages) {
            card.children[0].children[0].src = pages[page].thumbnail.source;  
        }
    })
    .catch(function(error){console.log(error);});
    altSrc();
}


const altSrc = () => {
  const altImage = document.querySelectorAll('img');
  
  altImage.forEach((image) => {
     let src = image.src;
     src === '' ? image.src = 'altimage.png'
     : src === 'unknown' ? image.src = 'altimage.png' 
     : src == null ? image.src = 'altimage.png' : "doNothing"
  
  });
  }

const imgHref = () => {
  const places = document.querySelectorAll(".card");
  places.forEach(el => el.addEventListener("click", (e) => {
      let savedPlaces = newSave;
        savedPlaces.map(el => {
          if(el.City == e.target.children[1].innerHTML)
          {
            searchCity(el.Coords, el.City, el.country);
          }
        });
       
      }
    )
  );
    }

  const checkImage = (images, n, city) => {
    const showImage = () => {
        addCity();
        option(city);
      }
    const showImages = (images) => {
      const promises = images.map(img =>{getImages(img.City); option(img.City);});
      Promise.all(promises).then(function() {
      addCity();
      imgHref();
      selW(city);
      selectSort(city);
    })
    option(city);
    }
    const domyslim = (images) => {
      getImages(images.City); 
      option(images.City);
      option(city);
      addCity();
    }

      images === null ? showImage()
      : n >= 2 ? showImages(images) 
      : domyslim(images)
  }

const createHeader = (data, city, country, day, dataWeather, temperature, tempMax) => {
 
  const dnes = () =>{
    dataWeather = data.current;
    temperature = dataWeather.temp;
    tempMax = dataWeather.feels_like;
  }
  const zitra = () => {
    dataWeather = data.daily[1];
    temperature = dataWeather.temp.max;
    tempMax = dataWeather.feels_like.day;
  }
  
  day == "dnes" ? dnes() : zitra();


  document.querySelector(".rightHeader img").src = `http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png`;
  newText(".rightHeader div p", secToDate(dataWeather.dt, "d", "short"));
  newText(".right h1", Math.round(temperature));
  newText(".city", city + ", " + country);
  newText("#feelsLike", "pocitově " + Math.round(tempMax)+ "°C");
  newText("#sunSet", secToDate(dataWeather.sunset, "h", "short"));
  
  const chances = data.hourly.slice(0, 6);
  
  const chance = chances.map(function(e){
    return Math.round(e.temp)
  })
  const label = chances.map(function(e){
    return secToDate(e.dt, "h");
  })
  function chartNumberMax(e){
    return Math.max.apply(null, e);
  }
  
  const options = {legend: false,
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
  const ctx = document.getElementById('myChart2').getContext('2d');
  const myChart = new Chart(ctx, {
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
      options: options
  });
  }

const createContent = (data, min, max, ahoj, dataWeather, tempMax, tempMin, chartDataMax, chartDataMin) => {

  const hodinove = () => {
    dataWeather = data.hourly.slice(min, max);
    tempMax = dataWeather.map(function(e){
      return e.temp;
    });
    tempMin = dataWeather.map(function(e){
      return e.feels_like;
    });
    chartDataMax = dataWeather.map(function(e){
      return Math.round(e.temp);
  });
  chartDataMin = dataWeather.map(function(e){
    return Math.round(e.feels_like);
  });
  }

  const denne = () => {
    dataWeather = data.daily.slice(min,max)
    tempMax = dataWeather.map(function(e){
      return e.temp.max;
    });
    tempMin = dataWeather.map(function(e){
      return e.feels_like.day;
    });
    chartDataMax = dataWeather.map(function(e){
      return Math.round(e.temp.max);
  });
  chartDataMin = dataWeather.map(function(e){
    return Math.round(e.feels_like.day);
  });
  }

  ahoj == "hourly" ? hodinove() 
  : denne();


const table = newEl('table',{ class: 'table'},'');
const temp_min = newEl('table',{class: 'tableLeft'},'');
const temp_max = newEl('table',{class:'tableRight'},'');
document.querySelector(".foreCastBody .left").appendChild(table);
document.querySelector(".foreCastBody .right .leftBody").appendChild(temp_min);
document.querySelector(".foreCastBody .right .rightBody").appendChild(temp_max);

for (let i = 0; i < dataWeather.length; i++){

    let node = newEl('tr',{class: 'hodiny'},newEl('td',{},newEl('span',{id: 'hodiny'},`${secToDate(dataWeather[i].dt, "h", "short")}`,),newEl('span',{},newEl('img',{class:"raindrop",src: "raindrop.svg"},''),`${Math.round(dataWeather[i].pop * 100)}%`),newEl('img',{ src: `http://openweathermap.org/img/w/${dataWeather[i].weather[0].icon}.png`,alt: "Weather icon"},),),);
    table.appendChild(node);
 
    let tr_min = newEl('tr',{},newEl('td',{}, `${Math.round(tempMin[i])}°C`), '');
    let tr_max = newEl('tr',{},newEl('td',{}, `${Math.round(tempMax[i])}°C`), '');
    temp_min.appendChild(tr_min);
    temp_max.appendChild(tr_max);
}

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
  checkImage(images, n, cityName);
}
