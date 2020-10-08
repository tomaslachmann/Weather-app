let cities;
let search_word = '';
const placeholder = document.querySelector("#input div");
const input = document.getElementById("searchInput");




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

       console.log(filtered.name, filtered.coords, filtered.country);
    
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


