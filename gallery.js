let imgs= document.querySelectorAll(".images");
let load= document.querySelector(".footer");
let lightbox= document.querySelector(".lightbox");
let close= lightbox.querySelector(".close");
let prev= lightbox.querySelector(".prev");
let next= lightbox.querySelector(".next");
let footer= document.querySelector(".footer");
let search= document.querySelector("input");
let searchicon= document.querySelector(".search");
let err= document.querySelector(".notfound");
let curr= 0;
let step= 8;
let currind= 0;
let visibleImgs = Array.from(imgs); 

function showImages(imgs) {
    for(let i=curr; i< curr+step && i<imgs.length; i++) {
        imgs[i].style.display="block";
    }
    curr+=step;
    if(curr >= imgs.length) {
        load.style.display="none";
    }
}

showImages(visibleImgs);
load.addEventListener("click", ()=>{
    showImages(visibleImgs)
});

function attachLightboxListeners(){
  visibleImgs.forEach((div, idx) => {
    div.onclick = () => openLightbox(div, idx);
  });
}

attachLightboxListeners();

function openLightbox(img,index){
    let innerimg = img.querySelector("img");
    lightbox.querySelector('img').src= innerimg.src;
    lightbox.style.display="flex";
    currind= index;
}

close.addEventListener('click',()=>{
    lightbox.style.display="none";
});

document.addEventListener('keydown',(e)=>{
    if(e.key==="Escape"){
        lightbox.style.display="none";
    }
});

function nextnav(){
    if(curr>currind+1 && currind + 1 < visibleImgs.length){
        currind++;
        let nextimg= visibleImgs[currind];
        openLightbox(nextimg,currind);
    }
}

function prevnav(){
    if(currind!=0){
      currind--;
    }
    let previmg= visibleImgs[currind];
    openLightbox(previmg,currind);
}

next.addEventListener('click',nextnav);
document.addEventListener('keydown',(e)=>{
    if(lightbox.style.display=="flex"){
        if(e.key==="ArrowRight"){
            nextnav();
        }
    }
});
prev.addEventListener('click',prevnav);
document.addEventListener('keydown',(e)=>{
    if(lightbox.style.display=="flex"){
        if(e.key==="ArrowLeft"){
            prevnav();
        }
    }
});

function filtering(filter){ 
    curr=0;
    visibleImgs=[];
    for(img of imgs){
        img.style.display="none";
        if(filter=="all"||img.classList.contains(filter)){
            visibleImgs.push(img);
        }
    }
    if(visibleImgs.length===0){
        err.style.display= "block";
        load.style.display="none";
    }
    else{
        err.style.display = 'none';
        load.style.display = (visibleImgs.length > step) ? 'block' : 'none';
        showImages(visibleImgs);
        attachLightboxListeners();
    }
}

let category= document.getElementById("filter");
category.addEventListener('change',()=>{
    filtering(category.value);
    err.style.display= "none";
})

function searching(){
    let searchinp= search.value;
    filtering(searchinp);
    category.value= "default";
}

searchicon.addEventListener('click',searching);
search.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        searching();
    } 
});

