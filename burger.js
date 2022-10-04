const burg = document.querySelector('.burger');
const header = document.querySelector('.header')

burg.addEventListener('click',() => {
    if(burg.classList.contains('active')){
        burg.classList.remove('active')
        header.classList.remove('active')
    }else{
        burg.classList.add('active')
        header.classList.add('active')
    }
})