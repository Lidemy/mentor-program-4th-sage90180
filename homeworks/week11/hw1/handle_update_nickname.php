<?php 
  require_once('conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];

  if(empty($nickname)){
    header('Location: index.php?errCode=2');
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "UPDATE sage_users SET nickname = ? WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();

  if(!$result) {
    header('Location: index.php?errCode='.$conn->errno);
    die($comm->error);
  }
  header('Location: index.php')
?>