<?php
include_once('database/db_diss2020.php');

if(($return = addPlayer($_POST)) != 'success') {
  echo json_encode(['code'=>500, 'msg'=>$return]);
  exit();
}

echo json_encode(['code'=>200]);