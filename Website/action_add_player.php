<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
  /* 
     Up to you which header to send, some prefer 404 even if 
     the files does exist for security
  */
  include_once('./templates/error.php');
  die();
}

include_once('database/db_diss2020.php');

if (($return = addPlayer($_POST)) != 'success') {
  echo json_encode(['code' => 500, 'msg' => $return]);
  exit();
}

echo json_encode(['code' => 200]);
