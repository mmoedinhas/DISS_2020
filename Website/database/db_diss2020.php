<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
    /* 
       Up to you which header to send, some prefer 404 even if 
       the files does exist for security
    */
    header('HTTP/1.0 403 Forbidden', TRUE, 404);

    /* choose the appropriate page to redirect users */
    die(header('location: ../index.php'));
}

include_once('database/connection.php');

function addPlayer($post)
{
    global $dbh;

    try {
        $stmt = $dbh->prepare('INSERT INTO player VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute(array(
            $post['defaultFirst'],
            $post['age'], $post['language'], $post['play_games'],
            $post['favorite_games'] ?? null, $post['important_narrative'] ?? null, $post['deq'],
            $post['playerProfile'], $post['play_session_1_logs'], $post['play_session_2_logs'],
            $post['game_exp_core_module_1'], $post['game_exp_core_module_2'],
            $post['game_exp_post_game_module_1'], $post['game_exp_post_game_module_2'],
            $post['open_answer_game_exp_1'] ?? null, $post['open_answer_game_exp_2'] ?? null,
            $post['main_character_opinion_1'] ?? null, $post['main_character_opinion_2'] ?? null,
            $post['version_liked_most'], $post['open_answer_version_liked_most'] ?? null,
            $post['version_reflected_most'], $post['open_answer_version_reflected_most'] ?? null,
            $post['games_like_this_in_the_future'], $post['open_answer_games_like_this_in_the_future'] ?? null
        ));

        return 'success';
    } catch (PDOException $e) {
        return 'Error adding player: ' . $e->getMessage();
    }
}

function getLastPlayer()
{
    global $dbh;

    try {
        $stmt = $dbh->prepare('SELECT * FROM player ORDER BY p_id DESC LIMIT 1');
        $stmt->execute();
        return $stmt->fetch();
    } catch (PDOException $e) {
        return 'Error fetching player: ' . $e->getMessage();
    }
}
