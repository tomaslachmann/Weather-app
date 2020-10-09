const createContent = (data, min, max, ahoj, dataWeather, tempMax, tempMin, chartDataMax, chartDataMin, d) => {
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
    ahoj == "hourly" ? hodinove(data, min, max) 
    : denne(data, min, max);
  
  const table = newEl('table',{ class: 'table'},'');
  const temp_min = newEl('table',{class: 'tableLeft'},'');
  const temp_max = newEl('table',{class:'tableRight'},'');
  document.querySelector(".foreCastBody .left").appendChild(table);
  document.querySelector(".foreCastBody .right .leftBody").appendChild(temp_min);
  document.querySelector(".foreCastBody .right .rightBody").appendChild(temp_max);
  
  for (let i = 0; i < dataWeather.length; i++){
  
      let node = newEl('tr',{class: 'hodiny'},newEl('td',{},newEl('span',{id: 'hodiny'},`${secToDate(dataWeather[i].dt, d, "short")}`,),newEl('span',{},newEl('img',{class:"raindrop",src: "raindrop.svg"},''),`${Math.round(dataWeather[i].pop * 100)}%`),newEl('img',{ src: `http://openweathermap.org/img/w/${dataWeather[i].weather[0].icon}.png`,alt: "Weather icon"},),),);
      table.appendChild(node);
   
      let tr_min = newEl('tr',{},newEl('td',{}, `${Math.round(tempMin[i])}°C`), '');
      let tr_max = newEl('tr',{},newEl('td',{}, `${Math.round(tempMax[i])}°C`), '');
      temp_min.appendChild(tr_min);
      temp_max.appendChild(tr_max);
  }
    chartBody(chartDataMax, chartDataMin);
    checkImage(images, n, cityName);
  }