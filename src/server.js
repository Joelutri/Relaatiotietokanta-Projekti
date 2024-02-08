const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const app = express()
const port = 8080
const cors = require('cors');
app.use((cors()))

// this is a top-level await 
const db = new sqlite3.Database('../LeagueOfLegends.db');
app.get('/data', (req, res) => {
  const data = {};
  db.all('SELECT * FROM Player', (err, rows) => {
    if (err) {throw err;}
 
  data.player = rows;
  
  res.json(data)
}) 
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});