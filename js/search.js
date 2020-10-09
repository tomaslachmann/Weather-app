let cities;
let search_word = '';
let filterCoords;
let filterName;
let filterCountry;
const placeholder = document.querySelector("#input div");
const input = document.getElementById("searchInput");
let n = localStorage.getItem('counter');

const count = (n) => {

    const toNull = (n) => {
        n = 0;
        countN(n);
        }
    const countN = (n) => {
        n++
        localStorage.setItem("counter", n)
        console.log(n);
    }
    n !== null ? countN(n) : toNull(n)

 return n
}

const searchCity = (coords, name, country) => {
    const webS = () => {
        location.toString().includes("index") === true ? window.location.replace("predpoved.html")
        : location.reload()
    }
    const mS = () => {
        location.toString().includes("index") === true ? window.location.replace("predpovedM.html")
        : location.reload()
    }
    localStorage.setItem("coords", JSON.stringify(coords));
    localStorage.setItem("name", name);
    localStorage.setItem("country", country);
    checkFirst() == true ? mS() : webS();
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

       filterName = filtered.name;
        filterCoords = filtered.coord;
        filterCountry = filtered.country;
    
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
    searchCity(filterCoords, filterName, filterCountry);
});

