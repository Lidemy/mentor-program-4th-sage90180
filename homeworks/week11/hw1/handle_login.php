<?php
  session_start();
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if(empty($username) || empty($password)) {
    // print_r($conn->errno) ;
    // 錯誤碼：1064
    header('Location: index.php?errCode='.$conn->errno);
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "SELECT * FROM sage_users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();

  if($result->num_rows === 0){
    // 帳號錯誤
    header('Location: index.php?errCode=1');
    exit();
  } 

  // 比對密碼
  $row = $result->fetch_assoc();
  if(password_verify($password, $row['password'])){
    $_SESSION['username'] = $username;
    header('Location: index.php');
  }else{
      header('Location: index.php?errCode=1');
  }



?>