


const saved = {
   City: cityName,
   Coords: JSON.parse(localStorage.getItem("coords")),
   country: country
};


let newSave = JSON.parse(localStorage.getItem("saved"));

  const find_value_in_obj = (arr_obj,value) => {
      return !arr_obj.some(itm => itm.City == value);
   }


   const Save = (data, check, n) => {
      let findVal;
      check === null ? findVal : n == 1 ? findVal : findVal = find_value_in_obj(check, data.City)
   
      const firstSave = (data) => {
         localStorage.setItem("saved", JSON.stringify(data));
          count(n);
          location.reload();
          return
      }
      const secSave = (data) => {
         localStorage.setItem("saved", JSON.stringify([data, check]));
         count(n);
         location.reload();
         return
      }
      const newSave = (check, data) => {
         check.push(data);
         localStorage.setItem("saved", JSON.stringify(check));
          count(n);
          location.reload();
          return
      }
     

    check == null ? firstSave(data) 
    : n == 1 && check.City != data.City ? secSave(data) 
    : findVal == true ? newSave(check, data)  
    : console.log("mesto je jiz obsazene")

    }
    

const addCity = () => {
   const addCityEl = newEl('div',{class:"addCity", id:"thumbnail"}, "")
   document.querySelector(".places").appendChild(addCityEl);
addCityEl.addEventListener("click", function(){Save(saved, newSave, n)});
}


