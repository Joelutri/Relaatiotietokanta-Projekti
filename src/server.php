<?php

$db = new SQLite3('../LeagueOfLegends.db');

$app = new \Slim\App();

$app->add(function ($request, $response, $next) {
    $response = $response->withHeader('Access-Control-Allow-Origin', '*');
    return $next($request, $response);
});

$app->get('/data', function ($request, $response, $args) use ($db) {
    $data = array();

    $playerQuery = 'SELECT Player.name, Rank.name AS rank_name FROM Player JOIN Rank ON Player.rank_id = Rank.id';
    $playerResult = $db->query($playerQuery);
    while ($row = $playerResult->fetchArray(SQLITE3_ASSOC)) {
        $data['player'][] = $row;
    }

    return $response->withJson($data);
});

$app->run();