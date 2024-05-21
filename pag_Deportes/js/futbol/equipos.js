

const apitAllTeamsUrl = 'https://v3.football.api-sports.io/standings';
const headersAllTeams = {
    "x-rapidapi-host": "v1.basketball.api-sports.io",
    "x-rapidapi-key": "4be0e1d4ac77f2333d6389eb46a69398"
};

// Define la función toggleInfo en el ámbito global
function toggleInfo(index) {
    const teamData = document.getElementById(`team_data_${index}`);
    if (teamData.style.display === 'none' || teamData.style.display === '') {
        teamData.style.display = 'block';
    } else {
        teamData.style.display = 'none';
    }
}

function displayAllteams(leagueInfo, teams) {
    const teamsContainer = document.getElementById('teams_containner');
    let teamsHTML = '<h2 class="titulo">Equipos</h2>';
    teams.forEach((teamData, index) => {
        let team = teamData.team; // Accede a la propiedad `team`
        let teamHTML = `
        <div class="content">
            <div class="teams">
                <img src="${team.logo}" alt="" class="team_logo">
                <p class="team_info">${team.name}</p>
                <p class="team_info">${leagueInfo.name}</p>
                <p class="team_info">${leagueInfo.season}</p>
                <button class="boton_info" id="boton_info_${index}">+info</button>
            </div>
            <div class="teams_data" id="team_data_${index}" style="display: none;">
                <div class="name_and_logo">
                    <img src="${team.logo}" alt="" class="team_logo">
                </div>
                <p class="team_name">Nombre: ${team.name}</p>
                <div class="info_team_container">
                    <div class="torneo_data">
                        <div class="info_and_logo">
                            <p>Torneo en el que participa: ${leagueInfo.name}</p>
                            <img src="${leagueInfo.logo}" alt="" class="logo">
                        </div>
                        <p>Posición: ${teamData.rank}</p>
                        <p>Temporada: ${leagueInfo.season}</p>
                    </div>
                    <div class="partidos_data"> 
                        <p>Partidos jugados: ${teamData.all.played}</p>
                        <p>Ganados: ${teamData.all.win}</p>
                        <p>Empatados: ${teamData.all.draw}</p>
                        <p>Perdidos: ${teamData.all.lose}</p>
                        <p>Goles: ${teamData.all.goals.for}</p>
                        <p>Puntos: ${teamData.points}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        teamsHTML += teamHTML;
    });
    teamsContainer.innerHTML = teamsHTML;

    // Asigna el evento onclick a los botones después de haber generado el HTML
    teams.forEach((team, index) => {
        document.getElementById(`boton_info_${index}`).onclick = () => toggleInfo(index);
    });
}


async function fetchAllTeams() {
    const league = '39';
    const season = '2019';

    try {
        const response = await axios.get(apitAllTeamsUrl, { headers: headersAllTeams, params: { league: league, season: season } });
        const data = response.data;

        console.log('API Response:', data);

        if (data.results > 0) {
            // Corrige la estructura para extraer correctamente los equipos
            const leagueInfo = data.response[0].league;
            const teams = leagueInfo.standings[0];
            displayAllteams(leagueInfo, teams);
        } else {
            console.error('No teams data found in the response');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

fetchAllTeams();