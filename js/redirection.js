const checkSec = (url) => {
    let url1 = window.location.href.split("/");
    const url2 = url1[url1.length - 1];
    return url == url2 ? true : false
}

const checkFirst = () => {
    let lokSplit = window.location.href.split("/");
    const final = lokSplit[lokSplit.length - 1].split(".")[0];
    const finalWord = final.slice(-1);
    return finalWord === "M" ? true : false
}
const mobile = () => {
    let lokSplit = window.location.href.split("/");
    const fullUrl = lokSplit[lokSplit.length - 1].split('.')[0] + "M.html";
    checkFirst() == true ? "nic" : window.location.replace(fullUrl)
}

const web = () => {
    let lokSplit = window.location.href.split("/");
    let fullUrl = lokSplit[lokSplit.length - 1].split('.')[0];
    checkSec(fullUrl) == false && checkFirst() == true ? window.location.replace(fullUrl.slice(0, -1) + ".html") : false
}

const checkMobile = () => {
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == true ? mobile() : web()
}

checkMobile();

