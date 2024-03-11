<?php

header("Access-Control-Allow-Origin: *");
$databasePath = '../LeagueOfLegends.db';

$db = new SQLite3($databasePath);

if (!$db) {
    die(json_encode(array('error' => 'Failed to open database.')));
}

$query = 'SELECT Player.id, Player.name AS player, Rank.name AS rank, Player.games FROM Player JOIN Rank ON Player.rank_id = Rank.id';

$result = $db->query($query);

if (!$result) {
    die(json_encode(array('error' => 'Error in player query execution: ' . $db->lastErrorMsg())));
}

$data = array();
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $playerId = $row['id'];

    // Fetch KDA data
    $kdaQuery = "SELECT Champion.name, KDA.kills, KDA.deaths, KDA.assists, Skin.name AS skin
                 FROM KDA
                 JOIN Champion ON KDA.champion_id = Champion.id
                 LEFT JOIN Skin ON KDA.skin_id = Skin.id
                 WHERE KDA.player_id = $playerId";

    $kdaResult = $db->query($kdaQuery);

    if (!$kdaResult) {
        die(json_encode(array('error' => 'Error in KDA query: ' . $db->lastErrorMsg())));
    }

    $kdaData = array();
    while ($kdaRow = $kdaResult->fetchArray(SQLITE3_ASSOC)) {
        $champion = $kdaRow['name'];
        $kdaData[] = array(
            'champion' => $champion,
            'kills' => $kdaRow['kills'],
            'deaths' => $kdaRow['deaths'],
            'assists' => $kdaRow['assists'],
            'skin' => $kdaRow['skin'] ?: 'default'
        );
    }
    
    $row['kda'] = $kdaData;    
    $data['players'][] = $row;
}

$db->close();

echo json_encode($data);
?>
