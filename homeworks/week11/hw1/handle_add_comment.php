<?php
  session_start();
  require_once('conn.php');

  $cotent = $_POST['content'];
  $role = $_GET['role'];

  if($role === 'BANNED') {
    header('Location: index.php?errCode=3');
    die('資料不齊全');
  }

  if(empty($cotent)) {
    header('Location: index.php?errCode='.$conn->errno);
    die('資料不齊全');
  }

  $username = $_SESSION['username'];

  // SQL Injection
  $sql = "INSERT INTO sage_comments(username,content) VALUE (?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss',$username,$cotent);
  $result = $stmt->execute();

  // 判斷是否成功
  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php')


?>