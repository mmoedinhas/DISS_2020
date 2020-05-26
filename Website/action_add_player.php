<?php
  include_once('database/db_diss2020.php');

  $rcp_id = $_POST['rcp_id'];
  $ing_name = $_POST['ing_name'];
  $ing_quantity = $_POST['ing_quantity'];

  addIngredient($rcp_id, $ing_name, $ing_quantity);

  header('Location: view_recipe.php?rcp_id=' . $rcp_id);
?>