<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handling preflight request
    header('Content-Type: application/json');
    echo json_encode(array('message' => 'Preflight request received.'));
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handling actual POST request
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['newRank'])) { // Checks whether the newRank key is set in the incoming data
        $newRank = $data['newRank'];
        $databasePath = '../LeagueOfLegends.db';
        $db = new SQLite3($databasePath);

        if (!$db) {
            die(json_encode(array('error' => 'Failed to open database.')));
        }

        $insertRankStmt = $db->prepare("INSERT INTO Rank (name) VALUES (:rankName)");
        $insertRankStmt->bindValue(':rankName', $newRank, SQLITE3_TEXT);

        $result = $insertRankStmt->execute();

        if ($result) {
            echo json_encode(array('message' => 'Rank '.$newRank.' added successfully.'));
        } else {
            echo json_encode(array('error' => 'Error adding rank.'));
        }

        $db->close();
    } elseif (isset($data['newPlayer']) && isset($data['rankName'])) {
        $newPlayer = $data['newPlayer'];
        $rankName = $data['rankName'];
        $gamesPlayed = mt_rand(0, 5000);
        
        $databasePath = '../LeagueOfLegends.db';
        $db = new SQLite3($databasePath);

        if (!$db) {
            die(json_encode(array('error' => 'Failed to open database.')));
        }

        $getRankIdStmt = $db->prepare("SELECT id FROM Rank WHERE name = :rankName");
        $getRankIdStmt->bindValue(':rankName', $rankName, SQLITE3_TEXT);
        $resultRankId = $getRankIdStmt->execute();
        $row = $resultRankId->fetchArray(SQLITE3_ASSOC);
        
        if (!$row) {
            echo json_encode(array('error' => 'Rank not found.'));
            $db->close();
        } else {
            $rankId = $row['id'];

            $insertPlayerStmt = $db->prepare("INSERT INTO Player (name, rank_id, games) VALUES (:playerName, :rankId, :gamesPlayed)");
            $insertPlayerStmt->bindValue(':playerName', $newPlayer, SQLITE3_TEXT);
            $insertPlayerStmt->bindValue(':rankId', $rankId, SQLITE3_INTEGER);
            $insertPlayerStmt->bindValue(':gamesPlayed', $gamesPlayed, SQLITE3_INTEGER);

            $resultPlayer = $insertPlayerStmt->execute();

            if ($resultPlayer) {
                echo json_encode(array('message' => 'Player '.$newPlayer.' added successfully.'));
            } else {
                echo json_encode(array('error' => 'Error adding player.'));
            }

            $db->close();
        }
    } elseif (isset($data['championName']) && isset($data['playerName']) && isset($data['skinName'])) {
        $championName = $data['championName'];
        $playerName = $data['playerName'];
        $skinName = $data['skinName'];
        $kills = mt_rand(0, 30);
        $deaths = mt_rand(0, 25);
        $assists = mt_rand(0, 35);

        $databasePath = '../LeagueOfLegends.db';
        $db = new SQLite3($databasePath);

        if (!$db) {
            die(json_encode(array('error' => 'Failed to open database.')));
        }

        $getChampionId = $db->prepare("SELECT id FROM Champion WHERE name = :championName");
        $getChampionId->bindValue(':championName', $championName, SQLITE3_TEXT);
        $resultChampionId = $getChampionId->execute();
        $champRow = $resultChampionId->fetchArray(SQLITE3_ASSOC);

        $getPlayerId = $db->prepare("SELECT id FROM Player WHERE name = :playerName");
        $getPlayerId->bindValue(':playerName', $playerName, SQLITE3_TEXT);
        $resultPlayerId = $getPlayerId->execute();
        $playerRow = $resultPlayerId->fetchArray(SQLITE3_ASSOC);

        $getSkinId = $db->prepare("SELECT id FROM Skin WHERE name = :skinName");
        $getSkinId->bindValue(':skinName', $skinName, SQLITE3_TEXT);
        $resultSkinId = $getSkinId->execute();
        $skinRow = $resultSkinId->fetchArray(SQLITE3_ASSOC);

        if (!$champRow || !$playerRow || !$skinRow) {
            echo json_encode(array('error' => 'Champion, player, or skin not found.'));
            $db->close();
        } else {
            $insertKDAStmt = $db->prepare("INSERT INTO KDA (champion_id, player_id, skin_id, kills, deaths, assists) VALUES (:championId, :playerId, :skinId, :kills, :deaths, :assists)");
            $insertKDAStmt->bindValue(':championId', $champRow['id'], SQLITE3_INTEGER);
            $insertKDAStmt->bindValue(':playerId', $playerRow['id'], SQLITE3_INTEGER);
            $insertKDAStmt->bindValue(':skinId', $skinRow['id'], SQLITE3_INTEGER);
            $insertKDAStmt->bindValue(':kills', $kills, SQLITE3_INTEGER);
            $insertKDAStmt->bindValue(':deaths', $deaths, SQLITE3_INTEGER);
            $insertKDAStmt->bindValue(':assists', $assists, SQLITE3_INTEGER);

            $resultKDA = $insertKDAStmt->execute();

            if ($resultKDA) {
                echo json_encode(array('message' => 'KDA added successfully.'));
            } else {
                echo json_encode(array('error' => 'Error adding KDA.'));
            }

            $db->close();
        } 
        
    } elseif (isset($data['newChampion'])) {
        $newChampion = $data['newChampion'];
        
        $databasePath = '../LeagueOfLegends.db';
        $db = new SQLite3($databasePath);

        if (!$db) {
            die(json_encode(array('error' => 'Failed to open database.')));
        }

        $insertChampionStmt = $db->prepare("INSERT INTO Champion (name) VALUES (:championName)");
        $insertChampionStmt->bindValue(':championName', $newChampion, SQLITE3_TEXT);

        $resultChampion = $insertChampionStmt->execute();

        if ($resultChampion) {
            echo json_encode(array('message' => 'Champion '.$newChampion.' added successfully.'));
        } else {
            echo json_encode(array('error' => 'Error adding champion.'));
        }

        $db->close();
    } elseif (isset($data['newSkin'])) {
        $newSkin = $data['newSkin'];
        
        $databasePath = '../LeagueOfLegends.db';
        $db = new SQLite3($databasePath);

        if (!$db) {
            die(json_encode(array('error' => 'Failed to open database.')));
        }

        $insertSkinStmt = $db->prepare("INSERT INTO Skin (name) VALUES (:SkinName)");
        $insertSkinStmt->bindValue(':SkinName', $newSkin, SQLITE3_TEXT);

        $resultSkin = $insertSkinStmt->execute();

        if ($resultSkin) {
            echo json_encode(array('message' => 'Skin ' . $newSkin . ' added successfully.'));
        } else {
            echo json_encode(array('error' => 'Error adding skin.'));
        }

        $db->close();
    } else {
        echo json_encode(array('error' => 'Invalid data received.'));
    } 
} else {
    echo json_encode(array('error' => 'Invalid request method.'));
}
?>
