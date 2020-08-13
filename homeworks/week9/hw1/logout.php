<?php
  require_once('conn.php');
  // 刪除token
  $token = $_COOKIE['token'];
  $sql = sprintf("DELETE FROM sage_tokens WHERE token = '%s'", $token);
  $conn->query($sql);
  setcookie("token","",time()-3600);
  setcookie('nickname',"",time()-3600);
  header("Location: index.php")
?>