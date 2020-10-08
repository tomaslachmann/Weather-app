let cities;
const placeholder = document.querySelector("#input div");
const input = document.getElementById("searchInput");




const fetchCities = async () => {
    cities = await fetch('../city.json').then(
        res => res.json()
    )

}

const showCities = async (search_word) => {

    await fetchCities();
    console.log(cities);
    
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


