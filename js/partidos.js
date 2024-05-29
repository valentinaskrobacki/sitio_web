const url = window.location.href

let apiGamesUrl
let headersGames

if(url.includes('futbol')){
    apiGamesUrl = 'https://v3.football.api-sports.io/fixtures';
    headersGames = {
        "x-rapidapi-host": "v1.basketball.api-sports.io",
        "x-rapidapi-key": "4be0e1d4ac77f2333d6389eb46a69398"
    };
} else if(url.includes('basquet')){
    apiGamesUrl = 'https://v1.basketball.api-sports.io/games';
    headersGames = {
        "x-rapidapi-host": "v1.basketball.api-sports.io",
        "x-rapidapi-key": "4be0e1d4ac77f2333d6389eb46a69398"
    };
}

// Define la función toggleInfo en el ámbito global
// function toggleInfo(index) {
//     console.log(index);
//     const teamData = document.getElementById(`team_data_${index}`);
//     //agrego y saco clase para añadir transision
//     if(teamData.classList.contains("teams_data-off")){
//         teamData.classList.remove("teams_data-off")
//         teamData.classList.add("teams_data-on")
//     } else {
//         teamData.classList.remove("teams_data-on")
//         teamData.classList.add("teams_data-off")
//     }
// }

const formatDate = (date) => {
    const fecha = new Date(date)
    return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
}
const finishedGame = (data) => {
    const finish = data.split(' ')
    return finish[finish.length - 1]
}


function displayGames(games) {
    const gamesContainer = document.getElementById('games_container');
    let gamesHTML = '<h2 class="title">PARTIDOS</h2>';

    if(url.includes('futbol')){
        games.forEach(game => {
            const gameHTML = `
                <div class = "team_info">
                    <div class="date_info">
                        <h3 class="info">${game.fixture.date}</h3>
                        <p class="info">Estado de juego: ${game.fixture.status.long}</p>
                        <p class="info">Liga: ${game.league.name}</p>
                    </div>
                    
                    <div class ="content">
                        <div class="teams_VS">
                            <img src="${game.teams.home.logo}" alt="" class="team_logo">
                            <p class="vs">VS</p>
                            <img src="${game.teams.away.logo}" alt="" class="team_logo">
                        </div>
                        <div class="data">
                            <p>Puntos:</p>
                            <p>${game.teams.home.name}: ${game.goals.home}</p>
                            <p>${game.teams.away.name}: ${game.goals.away}</p>
                        </div>
                    </div>
                </div>
            `;
            gamesHTML += gameHTML;
        });
    }else if (url.includes('basquet')){
        games.forEach(game => {
            const gameHTML = `
                <div class = "team_info">
                    <div class="date_info">
                        <h3 class="info">${formatDate(game.date)}</h3>
                        <p class="info">${finishedGame(game.status.long)}</p>
                        <p class="info">${game.league.name}</p>
                    </div>
                    <div class ="content">
                        <div class="teams_VS">
                            <img src="${game.teams.home.logo}" alt="" class="team_logo">
                            <p class="vs">VS</p>
                            <img src="${game.teams.away.logo}" alt="" class="team_logo">
                        </div>
                        <div class="data">
                            <p>${game.scores.home.total}</p>
                            <p>${game.scores.away.total}</p>
                        </div>
                    </div>
                    
                    
                </div>
            `;
            gamesHTML += gameHTML;
        });
    }
    gamesContainer.innerHTML = gamesHTML;    
}

async function fetchGames(){
    let params = {};
    const maxGamesToShow = 50;
    if(url.includes('futbol')){
        params = { live:'all'};
    } else if(url.includes('basquet')){
        params = { date: '2019-11-23' };
    }

    try {
        const response = await axios.get(apiGamesUrl, { headers: headersGames, params: params });
        let games = response.data.response;
        games = games.slice(0, maxGamesToShow);
        console.log(games);
        displayGames(games);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

fetchGames();