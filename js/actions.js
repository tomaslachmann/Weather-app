
 const mobileActions = () => {
    children.forEach((el) => {
        el.addEventListener('touchstart', (e) => {
            e.target.innerHTML == "dnes" ? window.location.replace("predpovedM.html")
          : e.target.innerHTML == "zítra" ? window.location.replace("zitraM.html")
          : window.location.replace("dalsidnyM.html")  
        });
        
      });
 }
 const webActions = () =>{

const after = document.querySelector('.activeDot');
const parentHead = document.querySelector(".foreCastHead");
const children = [...parentHead.children];

children.forEach((el) => {
  el.addEventListener('mouseover', (e) => {
    children.forEach((btn) => {
      btn.classList.remove('active');
    })
    e.target.classList.add('active');
    const middle = e.target.offsetLeft + e.target.offsetWidth / 2 - 5;
    after.style.left = middle + 'px';
    
  });
  
});

children.forEach((el) => {
  el.addEventListener('click', (e) => {
      e.target.innerHTML == "dnes" ? window.location.replace("predpoved.html")
    : e.target.innerHTML == "zítra" ? window.location.replace("zitra.html")
    : window.location.replace("dalsidny.html")  
  });
  
});
const dotActive = (day) => {
parentHead.addEventListener('mouseleave', (e) => {
  children.forEach((btn) => {
    btn.classList.remove('active');
  })
  children[day].classList.add('active');
  const middle =children[day].offsetLeft + children[day].offsetWidth / 2 - 5;
  after.style.left = middle + 'px';
});
}

dotActive(activeDot);

const slider = document.querySelector('.places');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
 
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  
});
slider.addEventListener('mouseup', () => {
  isDown = false;
 
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * .8;
  slider.scrollLeft = scrollLeft - walk;
});

 }

 /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false ? webActions : mobileActions
 