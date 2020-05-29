<?php

include_once('database/connection.php');

function addPlayer($post)
{
    global $dbh;

    try {
        $stmt = $dbh->prepare('INSERT INTO player VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute(array(
            $post['defaultFirst'] ?? null,
            $post['age'] ?? null, $post['language'] ?? null, $post['play_games'] ?? null,
            $post['favorite_games'] ?? null, $post['important_narrative'] ?? null, $post['deq'] ?? null,
            $post['playerProfile'] ??  null, $post['play_session_1_logs'] ?? null, $post['play_session_2_logs'] ?? null,
            $post['game_exp_core_module_1'] ?? null, $post['game_exp_core_module_2'] ?? null,
            $post['post_game_opinion_1'] ?? null, $post['post_game_opinion_2'] ?? null,
            $post['open_answer_game_exp_1'] ?? null, $post['open_answer_game_exp_2'] ?? null,
            $post['main_character_opinion_1'] ?? null, $post['main_character_opinion_2'] ?? null,
            $post['version_liked_most'] ?? null, $post['open_answer_version_liked_most'] ?? null,
            $post['version_reflected_most'] ?? null, $post['open_answer_version_reflected_most'] ?? null,
            $post['games_like_this_in_the_future'] ?? null, $post['open_answer_games_like_this_in_the_future'] ?? null
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
