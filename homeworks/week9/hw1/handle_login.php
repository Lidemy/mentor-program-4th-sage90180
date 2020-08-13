<?php
  require_once('conn.php');
  require_once('utils.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if(empty($username) || empty($password)) {
    header('Location: index.php?errCode=4');
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "SELECT * FROM sage_users WHERE username=? AND password=? ";
  $stmt = $conn->prepare($sql);
  echo print_r($stmt);
  $stmt->bind_param('ss', $username, $password);
  $result = $stmt->execute();

  $result = $stmt->get_result();


  if (!$result) {
    die($conn->error);
  }
  if($result->num_rows){
    // 建立 token 並儲存
    $token = generateToken();
    $sql = sprintf("INSERT INTO sage_tokens(token, username) VALUES ('%s','%s')", $token, $username);
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }

    // 記憶餅乾
    $expire = time() + 3600 * 24 * 30;
    setcookie('token',$token,$expire);
    header('Location: index.php');
  }else{
    header('Location: index.php?errCode=5');
  }
?>


