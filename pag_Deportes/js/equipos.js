const url = window.location.href

let apitAllTeamsUrl
let headersAllTeams

if(url.includes('futbol')){
    apitAllTeamsUrl = 'https://v3.football.api-sports.io/standings';
    headersAllTeams = {
        "x-rapidapi-host": "v1.basketball.api-sports.io",
        "x-rapidapi-key": "4be0e1d4ac77f2333d6389eb46a69398"
    };
} else if(url.includes('basquet')){
    apitAllTeamsUrl = 'https://v1.basketball.api-sports.io/standings';
    headersAllTeams = {
        "x-rapidapi-host": "v1.basketball.api-sports.io",
        "x-rapidapi-key": "4be0e1d4ac77f2333d6389eb46a69398"
    };
}

// Define la función toggleInfo en el ámbito global
function toggleInfo(index) {
    console.log(index);
    const teamData = document.getElementById(`team_data_${index}`);
    //agrego y saco clase para añadir transision
    if(teamData.classList.contains("teams_data-off")){
        teamData.classList.remove("teams_data-off")
        teamData.classList.add("teams_data-on")
    } else {
        teamData.classList.remove("teams_data-on")
        teamData.classList.add("teams_data-off")
    }
}

function displayAllteams(teams, leagueInfo) {
    const teamsContainer = document.getElementById('teams_containner');
    let teamsHTML = '<h2 class="titulo">Equipos</h2>';
    //----------------------------------MUESTRA FUTBOL-------------------------------------------
    if(url.includes('futbol')){
        console.log('teams', teams);
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
                <div class="teams_data-off" id="team_data_${index}" >
                    <div class="info_team_container">
                        <div class="torneo_data">
                            <div class="info_and_logo">
                                <p>Torneo en el que participa: <span> ${team.name} </span></p>
                                <img src="${team.logo}" alt="" class="logo">
                            </div>
                            <p>Posicion: ${teamData.rank}</p>
                            <p>Temporada: ${leagueInfo.season}</p>
                            <div class="info_and_logo">
                                <p>${leagueInfo.name}</p>
                            </div>
                        </div>
                        <div class="partidos_data"> 
                            <p>Partidos jugados: ${teamData.all.played}</p>
                            <p>Ganados: ${teamData.all.win}</p>
                            <p>Empatados: ${teamData.all.draw}</p>
                            <p>Perdidos: ${teamData.all.lose}</p>
                            <p>Puntos: ${teamData.points}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            teamsHTML += teamHTML;
        });
    //----------------------------------MUESTRA BASQUET-------------------------------------------
    } else if (url.includes('basquet')){
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
                    <div class="teams_data-off" id="team_data_${index}" >
                        <div class="info_team_container">
                            <div class="torneo_data">
                                <div class="info_and_logo">
                                    <p>Torneo en el que participa: <span> ${team.league.name} </span></p>
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
    }
    teamsContainer.innerHTML = teamsHTML;

    // Asigna el evento onclick a los botones después de haber generado el HTML
    teams.forEach((team, index) => {
        document.getElementById(`boton_info_${index}`).onclick = () => toggleInfo(index);
    });
}

async function fetchAllTeams() {
    let league
    let season
    if(url.includes('futbol')){
        league = '39';
        season = '2019';
    } else if(url.includes('basquet')){
        league = '18';
        season = '2019-2020';
    }

    try {
        const response = await axios.get(apitAllTeamsUrl, { headers: headersAllTeams, params: { league: league, season: season } });
        const data = response.data;

        if(url.includes('futbol')){
            if (data.results > 0) {
                // Corrige la estructura para extraer correctamente los equipos
                const leagueInfo = data.response[0].league;
                const teams = leagueInfo.standings[0];
                displayAllteams(teams, leagueInfo);
            } else {
                console.error('No teams data found in the response');
            }
        } else if(url.includes('basquet')){
            if (data.results > 0) {
                const teams = data.response[0];
                displayAllteams(teams);
            } else {
                console.error('No teams data found in the response');
            }
        }

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

fetchAllTeams();