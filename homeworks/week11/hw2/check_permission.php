<?php
  if(empty($_SESSION['username'])) {
    header('Location: login.php');
    exit;
  }else{
    $username = $_SESSION['username'];
  }
?>