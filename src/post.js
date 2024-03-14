// --- All functions here are for posting new data for the db || website --- //

function addNewRank() {
    event.preventDefault();
    const newRank = prompt('New Rank');


    // Make POST request to add new rank
    fetch('https://projectdatabase.azurewebsites.net/src/post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newRank: newRank,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error("Error adding new rank: ", error));
} 
  

function addNewPlayer() {
    event.preventDefault();

    const newPlayer = document.getElementById('playerName').value;
    const rankName = document.getElementById('rankNameInput').value; 

    // Make POST request to add new player
    fetch('https://projectdatabase.azurewebsites.net/src/post.php?table=Player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rankName: rankName,
            newPlayer: newPlayer
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error("JS: Error adding new player: ", error));
}

function addNewGame() {
    event.preventDefault();

    const championName = document.getElementById('championNameInput').value;
    const playerName = document.getElementById('playerNameInput').value; 
    const skinName = document.getElementById('skinNameInput').value; 

    // Make POST request to add new game
    fetch('https://projectdatabase.azurewebsites.net/src/post.php?table=KDA', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            championName: championName,
            playerName: playerName,
            skinName: skinName
        }),
    })
    .then(response => response.json())
    .then(data => {
    console.log( data);
    })
    .catch(error => console.error("JS: Error making new game: ", error));
}

function addNewChampion() {
    event.preventDefault();

    const newChampion = prompt('New Champion');

    // Make POST request to add new champion
    fetch('https://projectdatabase.azurewebsites.net/src/post.php?table=Champion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newChampion: newChampion,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error("JS: Error making new skin: ", error));
}

function addNewSkin() {
    event.preventDefault();

    const newSkin = prompt('New Skin');

    // Make POST request to add new skin
    fetch('https://projectdatabase.azurewebsites.net/src/post.php?table=Skin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newSkin: newSkin,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
.catch(error => console.error("JS: Error making new skin: ", error));
}
function removeDiv() {
    window.location.reload();
}

function createPlayerScreen() {
    event.preventDefault();
    document.querySelector('#mainScreen').innerHTML = `
        <div class="topScreen">
        <button class ="backButtonPost" onClick="removeDiv()">Back</button>
            <h1>Create new player</h1>
            <div class="postDiv">
                <input class="postInput" id="playerName" placeholder="Player name" type="text">
                <input class="postInput" id="rankNameInput"  placeholder="Rank name" type="text" >
                <input class="postSubmit" id="newPlayer" onclick="addNewPlayer()" type="submit" value="send" >
            </div>
        </div
    `
}