const selW = (city) => {
    let sel = document.querySelector(".head select");
    let opts = document.querySelectorAll(".head select option");
  
    const selWidth = () => {
      let test = newEl('span',{}, sel.value);
      test.style.fontSize = sel.style.fontSize + 30 +"px";
      test.style.position = "absolute";
      document.querySelector(".landingPage").appendChild(test);
      sel.style.width = test.offsetWidth + "px";
      document.querySelector(".landingPage").removeChild(test);
    }
    opts.forEach(opt => {opt.value == city ? selWidth() : false});
    
    document.querySelector(".head select").addEventListener("change", function(e) {
      let data = newSave;
      for (let i = 0; i < data.length; ++i) {
      if(data[i].City == e.target.value){
        searchCity(data[i].Coords, data[i].City, data[i].country);
      }
     }
    });
  }
  
  const selectSort = (city) => {
    const sel = document.querySelector("select")
    for (let opt, i = 0; opt = sel.options[i]; i++) {
      
      if (opt.value == city) {
          sel.selectedIndex = i;
          break;
      }
  }
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