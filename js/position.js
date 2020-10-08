const posButton = document.querySelector('#position');
function najitPolohu() {

  
    let latitude;
    let longitude;
    
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
      search(latitude, longitude);
    }
    async function search(lat, lon) {
        const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=cz&units=metric&appid=d185cc724a1b03e7aecc2dfe6d7b4daa`)
        .then(response => response.json())
        .then(data => {console.log(data);});
    }
  
    function error() {
      console.log('Nepodařilo se zjistit vaši polohu');
    }
  
    if(!navigator.geolocation) {
      console.log('Geolokace není podporována vašim prohlížečem');
    } else {
      console.log('Hledám…');
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  
  }
  
  posButton.addEventListener('click', najitPolohu);