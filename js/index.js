
async function randomCity() 
{
  let response = await fetch(`city.json`);
  let data = await response.json()
  return data;
}
async function fetchRandomCity(lat, lon) 
{
  let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=cz&units=metric&exclude=minutely,alerts&appid=d185cc724a1b03e7aecc2dfe6d7b4daa`);
  let data = await response.json()
  return data;
}
randomCity()
.then(data => getRandomCity(data));


function getRandomCity(jsonData)
{
const values = Object.values(jsonData)

const randomValue = values[parseInt(Math.random() * values.length)]
localStorage.setItem("name", randomValue.name);
localStorage.setItem("country", randomValue.country);
fetchRandomCity(randomValue.coord.lat, randomValue.coord.lon)
.then(data => {console.log(data);createHeader(data, randomValue.name, randomValue.country);})
}

