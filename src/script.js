document.addEventListener('DOMContentLoaded', () => {
    fetch('https://projectdatabase.azurewebsites.net/src/server.php')
        .then(response => response.json())
        .then(data => {
            const dataListElement = document.getElementById('data-list');

            data.players.forEach(player => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `
                    <h3 class="playerName">${player.player}</h3>
                    <h3 class="playerRank">${player.rank}</h3>
                `;

                listItem.addEventListener('click', () => {
                    const gamesDiv = document.createElement('div');
                    gamesDiv.className = "gamesDiv";
                    gamesDiv.innerHTML = `
                        <div class="gamesDiv">
                            <div class="usernameDiv"><h1 class="usernameTXT">${player.player}</h1></div>
                            <div class="rankDiv"><h1 class="rankTXT">Rank</h1><h1 class="rankvalueTXT"> ${player.rank}</h1></div>
                            <div class="matchesDiv"><h1 class="matchesTXT">Games Played:</h1><h1 class="matchesValue"> ${player.games}</h1></div>
                            <ul>
                            ${player.kda.map(kda => `
                            <div class="championBG">
                                <div class="championDiv"><h1 class="championTXT">Champion</h1><h1 class="championName">${kda.champion}</h1></div>
                                <div class="skinDiv"> <h1 class="skinTXT">Skin</h1><h1 class="skinName"> ${kda.skin}</h1></div>
                                <div class="KDA">
                                    <h1 class="KName">K</h1><h1 class="KDAValue"> ${kda.kills}</h1>
                                    <h1 class="DName">D</h1><h1 class="KDAValue"> ${kda.deaths}</h1>
                                    <h1 class="AName">A</h1><h1 class="KDAValue"> ${kda.assists}</h1>
                                </div>
                            </div>
                        `).join('')}
                        
                            </ul>
                        </div>
                    `;
                    games.appendChild(gamesDiv);
                    document.querySelector('.backButton').style.display = 'block';
                    document.querySelector('#games').style.zIndex = '11';
                });

                dataListElement.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error: ", error));
});

function buttonHandler(){
    document.querySelector('.gamesDiv').remove();
    document.querySelector('.backButton').style.display = 'none';
    document.querySelector('#games').style.zIndex = '9';
}
