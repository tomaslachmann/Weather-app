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
    
    chartHeader(chances);
    }