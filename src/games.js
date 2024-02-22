document.addEventListener('DOMContentLoaded', () => {
    const urlPar = new URLSearchParams(window.location.search);
    const playerName = urlPar.get('name');
    const playerRank = urlPar.get('rank');

    document.getElementById('player-name').textContent = `Player Name: ${playerName}`;
    document.getElementById('rank').textContent = `Rank: ${playerRank}`;
    document.getElementById('games').textContent = `Rank: ${''}`;

});