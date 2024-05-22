const apiGamesUrl = 'https://v1.basketball.api-sports.io/games';
const headersGames = {
    "x-rapidapi-host": "v1.basketball.api-sports.io",
    "x-rapidapi-key": "4be0e1d4ac77f2333d6389eb46a69398"
};
const params = { date: '2019-11-23' };
const maxGamesToShow = 50;

async function fetchGames() {
    try {
        const response = await axios.get(apiGamesUrl, { headers: headersGames, params: params });
        let games = response.data.response;
        games = games.slice(0, maxGamesToShow);
        console.log(games);
        displayGames(games);
    } catch(error) {
        console.error('Error al obtener los datos:', error);
    }
}

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
    gamesContainer.innerHTML = gamesHTML;
}

fetchGames();