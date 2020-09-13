<?php 
  session_start();
  require_once('conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  if (empty($nickname) || empty($username) || empty($password)) {
    // print_r($conn->errno) ;
    // 錯誤碼：1064
    header('Location: index.php?errCode='.$conn->errno.'&status=back');
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "INSERT INTO sage_users(username,nickname,password) VALUE (?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $nickname, $password);
  $result = $stmt->execute();

  // session
  if ($result) {
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    // 帳號 暱稱重複
    // print_r($conn->errno) ;
    // 錯誤碼：1062
    header('Location: index.php?errCode='.$conn->errno.'&status=back');
    die($conn->error);
  }

?>