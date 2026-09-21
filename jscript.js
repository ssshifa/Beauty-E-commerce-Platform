let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length -1;

next.onclick = function(){
    if(active + 1 > lengthItems){
        active = 0;
    }else{
        active = active + 1;
    }
    reloadSlider();
}
prev.onclick = function(){
    if(active - 1 < 0){
        active = lengthItems;
    }else{
        active = active -1;
    }
    reloadSlider();
}
let refreshSlider = setInterval(()=>{next.click()}, 5000);
function reloadSlider(){
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft +'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
    let refreshSlider = setInterval(()=>{next.click()}, 5000);
}
dots.forEach((li, key) =>{
    li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
})


const goUpButton = document.getElementById('goUp');


window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        goUpButton.style.display = "block";  // Show button
    } else {
        goUpButton.style.display = "none";   // Hide button when on top
    }
};


goUpButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


    var swiper = new Swiper('.mySwiper', {
        slidesPerView: 1, // Show 1 slide at a time
        spaceBetween: 10, // Space between slides
        navigation: {
            nextEl: '.next',
            prevEl: '.prev'
        },
        loop: true, // Infinite loop
        autoplay: {
            delay: 2500, // Autoplay every 2.5 seconds
        }
    });







