let imgs= document.querySelectorAll(".images");
let load= document.querySelector(".load");
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

function showImages(imgs) {
    for(let i=curr; i< curr+step && i<imgs.length; i++) {
        imgs[i].style.display="block";
    }
    curr+=step;
    if(curr >= imgs.length) {
        load.style.display="none";
    }
}

showImages(imgs);
load.addEventListener("click", ()=>{
    showImages(imgs)
});

for(let i=0;i<imgs.length;i++){
    imgs[i].addEventListener("click",()=>{
        openLightbox(imgs[i],i);
    });
}

function openLightbox(img,index){
    let innerimg = img.querySelector("img");
    lightbox.querySelector('img').src= innerimg.src;
    lightbox.style.display="flex";
    currind= index;
}

close.addEventListener('click',()=>{
    lightbox.style.display="none";
});

function nextnav(){
    if(curr>currind+1){
        currind++;
        let nextimg= imgs[currind];
        openLightbox(nextimg,currind);
    }
}

function prevnav(){
    if(currind!=0){
      currind--;
    }
    let nextimg= imgs[currind];
    openLightbox(nextimg,currind);
}

next.addEventListener('click',nextnav);
prev.addEventListener('click',prevnav);

function filtering(filter){
    for(let img of imgs){
        if(filter=="all"||img.classList.contains(filter)){
            img.style.display="flex";
            err.style.display= "none";
        }
        else{
            img.style.display="none";
            err.style.display= "block";
        }
        load.style.display="none";
    }
}

let category= document.getElementById("filter");
category.addEventListener('change',()=>{
    filtering(category.value);
    
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


