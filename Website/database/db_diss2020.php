<?php
include_once('database/connection.php');

function addPlayer($post)
{
    global $dbh;

    try {
        $stmt = $dbh->prepare('INSERT INTO player VALUES (NULL, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute(array(
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
        return'Error adding player: ' . $e->getMessage();
    }

    //   p_age TEXT NOT NULL,
    //   p_language TEXT NOT NULL,
    //   p_play_games TEXT NOT NULL,
    //   p_favorite_genre TEXT,
    //   p_important_narrative INTEGER,
    //   p_deq TEXT NOT NULL,
    //   p_affective_profile TEXT NOT NULL,
    //   p_logs_1 TEXT NOT NULL,
    //   p_logs_2 TEXT NOT NULL,
    //   p_game_exp_core_module_1 TEXT NOT NULL,
    //   p_game_exp_core_module_2 TEXT NOT NULL,
    //   p_game_exp_post_game_module_1 TEXT NOT NULL,
    //   p_game_exp_post_game_module_2 TEXT NOT NULL,
    //   p_open_answer_game_exp_1 TEXT,
    //   p_open_answer_game_exp_2 TEXT,
    //   p_main_character_opinion_1 TEXT,
    //   p_main_character_opinion_2 TEXT,
    //   p_version_liked_most INTEGER NOT NULL,
    //   p_open_answer_version_liked_most TEXT,
    //   p_version_reflected_most INTEGER NOT NULL,
    //   p_open_answer_version_reflected_most TEXT,
    //   p_games_like_this_in_the_future INTEGER NOT NULL,
    //   p_open_answer_games_like_this_in_the_future TEXT
}
