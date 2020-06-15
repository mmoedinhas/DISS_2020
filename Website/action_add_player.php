<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
  include_once('./templates/error.php');
  exit();
}

include_once('database/db_diss2020.php');

$partial = $_POST['partial'] ?? false;

if ($partial) {
  if (($return = addPlayerPartial($_POST)) != 'success') {
    echo json_encode(['code' => 500, 'msg' => $return]);
    exit();
  }
} else {
  if (($return = addPlayer($_POST)) != 'success') {
    echo json_encode(['code' => 500, 'msg' => $return]);
    exit();
  }
}

echo json_encode(['code' => 200]);
