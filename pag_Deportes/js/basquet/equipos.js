

const apitAllTeamsUrl = 'https://v1.basketball.api-sports.io/standings';
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

function displayAllteams(teams) {
    const teamsContainer = document.getElementById('teams_containner');
    let teamsHTML = '<h2 class="titulo">Equipos</h2>';
    teams.forEach((team, index) => {
        let teamHTML = `
            <div class="content">
                <div class="teams">
                    <img src="${team.team.logo}" alt="" class="team_logo">
                    <p class="team_info">${team.team.name}</p>
                    <p class="team_info">${team.league.name}</p>
                    <p class="team_info">${team.league.season}</p>
                    <button class="boton_info" id="boton_info_${index}">+info</button>
                </div>
                <div class="teams_data" id="team_data_${index}" style="display: none;">
                    <div class="name_and_logo">
                        <img src="${team.team.logo}" alt="" class="team_logo">
                    </div>
                    <p class="team_name">Nombre: ${team.team.name}</p>
                    <div class="info_team_container">
                        <div class="torneo_data">
                            <div class="info_and_logo">
                                <p>Torneo en el que participa: ${team.league.name}</p>
                                <img src="${team.league.logo}" alt="" class="logo">
                            </div>
                            <p>Posicion: ${team.position}</p>
                            <p>Temporada: ${team.league.season}</p>
                            <div class="info_and_logo">
                                <p>${team.country.name}</p>
                                <img src="${team.country.flag}" alt="" class="logo">
                            </div>
                        </div>
                        <div class="partidos_data"> 
                            <p>Partidos jugados: ${team.games.played}</p>
                            <p>Ganados: ${team.games.win.total}</p>
                            <p>Perdidos: ${team.games.lose.total}</p>
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
    const league = '18';
    const season = '2019-2020';

    try {
        const response = await axios.get(apitAllTeamsUrl, { headers: headersAllTeams, params: { league: league, season: season } });
        const data = response.data;

        console.log('API Response:', data);

        if (data.results > 0) {
            const teams = data.response[0];
            console.log('Teams Data:', teams);
            displayAllteams(teams);
        } else {
            console.error('No teams data found in the response');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

fetchAllTeams();
