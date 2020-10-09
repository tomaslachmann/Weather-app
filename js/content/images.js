  

const getImages = (name) => {
  
    let params = {
      action: "query",
      prop: "extracts%7Cpageimages%7Crevisions",
      titles: name,
      format: "json",
      uselang: "cz",
      redirects: 1,
      formatversion: 2,
      exintro: 1,
      explaintext: 1,
      piprop: "thumbnail",
      pithumbsize: 300,
      rvprop: "timestamp"
  };
  let url = "https://en.wikipedia.org/w/api.php?origin=*"; 
  
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
  
  const card = newEl('div',{ class: 'card' },newEl('div',{ class: 'thumbnail' },newEl('img',{},''),''),newEl('span',{class: 'cityName'},name),'');
  
  document.querySelector(".places").appendChild(card);
  
  
    fetch(url)
      .then(function(response){return response.json();})
      .then(function(response) {
          let pages = response.query.pages;
          for (let page in pages) {
              card.children[0].children[0].src = pages[page].thumbnail.source;  
          }
      })
      .catch(function(error){console.log(error);});
      altSrc();
  }
  
  
  const altSrc = () => {
    const altImage = document.querySelectorAll('img');
    
    altImage.forEach((image) => {
       let src = image.src;
       src === '' ? image.src = 'altimage.png'
       : src === 'unknown' ? image.src = 'altimage.png' 
       : src == null ? image.src = 'altimage.png' : "doNothing"
    
    });
    }
  
  const imgHref = () => {
    const places = document.querySelectorAll(".card");
    places.forEach(el => el.addEventListener("click", (e) => {
        let savedPlaces = newSave;
          savedPlaces.map(el => {
            if(el.City == e.target.children[1].innerHTML)
            {
              searchCity(el.Coords, el.City, el.country);
            }
          });
         
        }
      )
    );
      }
  
    const checkImage = (images, n, city) => {
      const showImage = () => {
          addCity();
          option(city);
        }
      const showImages = (images) => {
        const promises = images.map(img =>{getImages(img.City); option(img.City);});
        Promise.all(promises).then(function() {
        addCity();
        imgHref();
        selW(city);
        selectSort(city);
      })
      option(city);
      }
      const domyslim = (images) => {
        getImages(images.City); 
        option(images.City);
        option(city);
        addCity();
      }
  
        images === null ? showImage()
        : n >= 2 ? showImages(images) 
        : domyslim(images)
    }
  