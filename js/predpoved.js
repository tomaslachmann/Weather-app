
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

}
