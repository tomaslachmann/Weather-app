const lokace = (url) => {
   return location.toString().includes(url);
}


const mobile = () => {
    lokace("index") == true ? window.location.replace("indexMobile.html") 
    : lokace("predpoved") ? window.location.replace("predpovedM.html")
    : lokace("dalsidny") ? window.location.replace("dalsidnyM.html") : "nic";
   
}

const web = () => {
    lokace("indexMobile") == true ? window.location.replace("index.html") 
    : lokace("predpovedM") ? window.location.replace("predpoved.html")
    : lokace("dalsidnyM") ? window.location.replace("dalsidny.html") : "nic";
    return
}


/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == true ? mobile() : web()