let cities;
let search_word = '';
let coords;
let name;
let country;
const placeholder = document.querySelector("#input div");
const input = document.getElementById("searchInput");


const searchCity = (coords, name, country) => {
    localStorage.setItem("coords", JSON.stringify(coords));
    localStorage.setItem("name", name);
    localStorage.setItem("country", country);
    window.location.replace("predpoved.html");
  }

const fetchCities = async () => {
    cities = await fetch('../city.json').then(
        res => res.json()
    )

}

const showCities = async (search_word) => {

    await fetchCities();

    const patt = new RegExp(`^${search_word}`, "i");

    const filtered = cities.filter(
        city => patt.exec(city.name.toLowerCase())
    )[0];
        
       placeholder.innerText = filtered.name + ", " + filtered.country;

       name = filtered.name;
        coords = filtered.coord;
        country = filtered.country;
    
}



input.addEventListener('input', (e) => {
    search_word = e.target.value;
    showCities(search_word);
    placeholder.classList.remove("hidden");
});
input.addEventListener("focusout", function(){
    setTimeout(function(){
        placeholder.classList.add("hidden");
    },1000)
})
placeholder.addEventListener("click",function(){
    searchCity(coords, name, country);
});

