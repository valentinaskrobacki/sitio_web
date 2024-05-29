const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const slide = document.getElementById('slide');
const slideContainer = document.getElementById('slide-container');

function checkInput(input, label) {
    if (input.value.trim() != "") {
        label.classList.add('active');
    } else {
        label.classList.remove('active');
    }
}

inputs.forEach((input, index) => {
    input.addEventListener('input', () => checkInput(input, labels[index]));
})


function onClick(e, value){
    e.preventDefault();
    
    if(value === 'next'){
        slide.classList.add('slide')
        slideContainer.style.cssText = 'height: 500px; transition: height 0.3s ease-in-out;';
        
    } else if(value === 'prev') {
        slide.classList.remove('slide')
        slideContainer.style.cssText = 'height: 300px; transition: height 0.3s ease-in-out;';
    }
}

next.addEventListener('click', (e) => onClick(e, 'next'));
prev.addEventListener('click', (e) => onClick(e, 'prev'));