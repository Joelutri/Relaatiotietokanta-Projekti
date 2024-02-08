document.addEventListener('DOMContentLoader', () => {
    fetch('http://lcoalhost:8080/data')
    .then(response => response.json ())
    .then(data => {
        const dataListElement = document.getElementById('data-list');
        data.Player.forEach(Player => {
            const listItem = document.createElement('li');
            listItem.textContent =
             `Name: ${Player.username},
              Games: ${Player.games}`;
            dataListElement.appendChild(listItem);
          });
    })
    .catch(error => console.error("Error: ", error))
})