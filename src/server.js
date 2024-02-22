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
  db.all('SELECT Player.name, Rank.name AS rank_name FROM Player JOIN Rank ON Player.rank_id = Rank.id'
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