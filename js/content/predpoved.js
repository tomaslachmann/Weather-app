
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
  .then(data => {createContent(data, spliceMin, spliceMax, ahoj, dataWeather, tempMax, tempMin, chartDataMax, chartDataMin, h); createHeader(data, cityName, country, den, dataWeather, temperature, tempMax);})
}

foreCast(weather.lat, weather.lon);

const option = (data) => {
  let select = document.querySelector("select");
  const opt = newEl('option',{class:'ahoj'},data);
  select.appendChild(opt);
}




