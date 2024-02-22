document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/data')
      .then(response => response.json())
      .then(data => {

        const dataListElement = document.getElementById('data-list');

        data.player.forEach(Player => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `<h3>${Player.name}</h3><p>${Player.rank_name}</p>`;
        
            listItem.addEventListener('click', () => {
                window.location.href = `games.html?name=${encodeURIComponent(Player.name)}&rank=${encodeURIComponent(Player.rank_name)}`;
            });
        
                    
            dataListElement.appendChild(listItem);
        });

       
      })
      .catch(error => console.error("Error: ", error));
});
