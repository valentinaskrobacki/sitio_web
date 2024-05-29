const allTeams = document.querySelectorAll('.all_teams');

allTeams.forEach(team => {
    team.addEventListener('mouseover', () => {
       
        allTeams.forEach(otherTeam => {
            if (otherTeam !== team) {
                otherTeam.classList.add('not_hover');
            }
        });
    });

    team.addEventListener('mouseout', () => {
        
        allTeams.forEach(otherTeam => {
            otherTeam.classList.remove('not_hover');
        });
    });
});


let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}
function seleccionar() {
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}