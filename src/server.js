const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const app = express()
const port = 8080
const cors = require('cors');
app.use((cors()))

const db = new sqlite3.Database('../LeagueOfLegends.db');
app.get('/data', (req, res) => {
  const data = {};

  // Query for Player data
  db.all('SELECT Player.name AS player, Rank.name AS rank_name, KDA.kills AS kills, KDA.deaths AS deaths, KDA.assists AS assists, Champion.name AS champ, Skin.name AS skin FROM Player JOIN Rank ON Player.rank_id = Rank.id JOIN Player ON Rank.player_id = Player.id JOIN Champion ON KDA.champion_id = Champion.id' 
  , (err, rows) => {
    if (err) {
      throw err;
    }
    data.player = rows;
    res.json(data);

  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});