<?php

$databasePath = '../LeagueOfLegends.db';

$db = new SQLite3($databasePath);

if (!$db) {
    die("Failed to open database.");
}

$query = 'SELECT Player.name, Rank.name FROM Player, Rank WHERE Player.rank_id = Rank.id';

$result = $db->query($query);

if (!$result) {
    die("Error in query execution.");
}

$data = array();
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $data['player'][] = $row;
}

$db->close();

echo json_encode($data);