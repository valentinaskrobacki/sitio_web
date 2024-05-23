let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}
function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

//CONTACTO

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".imagenes .imagen");
    let currentImageIndex = 0;

    function changeImage() {
        images[currentImageIndex].classList.remove("imagen-activa");
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add("imagen-activa");
    }

    setInterval(changeImage, 3000); // Cambia la imagen cada 3 segundos
});

//MENSAJE EXITO

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    setTimeout(function() {
        var successMessage = document.getElementById('mensaje-exito');
        successMessage.style.display = 'block';

        document.getElementById('contactForm').reset();

        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 4000);
    }, 500); 
});