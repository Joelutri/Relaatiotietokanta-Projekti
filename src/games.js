document.addEventListener('DOMContentLoaded', () => {
    // Retrieve player details from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('name');
    const playerRank = urlParams.get('rank');

    // Update the HTML with the retrieved details
    document.getElementById('player-name').textContent = `Player Name: ${playerName}`;
    document.getElementById('rank').textContent = `Rank: ${playerRank}`;
    document.getElementById('games').textContent = `Rank: ${''}`;

});