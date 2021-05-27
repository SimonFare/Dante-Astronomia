let cs = document.getElementsByTagName('canvas');

function resize() {
    console.log('s')
    for(let i = 0; i < cs.length; i++) {
        cs[i].style.width = '25vw';
        cs[i].style.height = '25vw';
    }
}

setTimeout(() => {
    resize();
}, 1000);






let bgImage = document.getElementById("bgImage");

let floats = document.getElementsByClassName("float");
let secs = document.getElementsByClassName("section");

let slides = document.getElementsByClassName("slide");
let page_prev = document.getElementById("page_prev");
let page_next = document.getElementById("page_next");

function load(id) {

    switch(id) {
        case 1:
            for (let f of floats) {
                f.style.border = "5px solid rgb(250, 235, 215)";
            }
            for(let s of secs) {
                s.style.backgroundColor = "rgba(250, 235, 215, 0.8)";
                s.style.color = "black";
            }
            for(let s of slides) {
                s.style.backgroundColor = "rgba(250, 235, 215, 0.4)";
                s.style.color = "black";
            }
            page_prev.style.backgroundColor = "rgba(250, 235, 215, 0.8)";
            page_prev.style.color = "black";
            page_next.style.backgroundColor = "rgba(250, 235, 215, 0.8)";
            page_next.style.color = "black";
        break;

        case 3:
        case 6:
            for (let f of floats) {
                f.style.border = "5px solid rgb(32, 32, 32)";
            }
            for(let s of secs) {
                s.style.backgroundColor = "rgba(32, 32, 32, 0.8)";
                s.style.color = "antiquewhite";
            }
            for(let s of slides) {
                s.style.backgroundColor = "rgba(32, 32, 32, 0.4)";
                s.style.color = "antiquewhite";
            }
            page_prev.style.backgroundColor = "rgba(32, 32, 32, 0.8)";
            page_prev.style.color = "antiquewhite";
            page_next.style.backgroundColor = "rgba(32, 32, 32, 0.8)";
            page_next.style.color = "antiquewhite";
            break;
        
        default:
            id = 1;
            break;
    }

    bgImage.src = "img/PD" + id + ".jpg";

}

load(1);





let slideIndex = 1;
showSlides(slideIndex);

document.addEventListener('keyup', (event) => {
    if (event.key == "ArrowRight") {
        plusSlides(1);
    } else if (event.key == "ArrowLeft") {
        plusSlides(-1);
    }
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;

    if (n >= slides.length) { 
        slideIndex = slides.length;
        page_prev.style.display = "block";
        page_next.style.display = "none";
    } else if (n <= 1) { 
        slideIndex = 1;
        page_prev.style.display = "none";
        page_next.style.display = "block";
    } else {
        page_prev.style.display = "block";
        page_next.style.display = "block";
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";

}