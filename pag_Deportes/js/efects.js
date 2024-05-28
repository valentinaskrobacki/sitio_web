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
