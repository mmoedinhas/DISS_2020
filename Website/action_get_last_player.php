<?php

include_once('database/db_diss2020.php');

$lastPlayer = getLastPlayer();

if (gettype($lastPlayer) == "string") {
    echo json_encode(['code' => 500, 'msg' => $lastPlayer]);
    exit();
}

if (empty($lastPlayer)) {
    echo json_encode(['code' => 200, 'isDefault' => true]);
    exit();
}

echo json_encode(['code' => 200, 'isDefault' => $lastPlayer['p_default_first'] === 'false']);
