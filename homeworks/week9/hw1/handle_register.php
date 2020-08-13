<?php
require_once('conn.php');
require_once('utils.php');


$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = $_POST['password'];

if (empty($nickname) || empty($username) || empty($password)) {
  header('Location: index.php?errCode=2&page=back');
  die('資料不齊全');
}

// SQL Injection
$sql = "INSERT INTO sage_users(nickname, username, password) VALUES(?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $username, $password);
$result = $stmt->execute();
// $result = $stmt->get_result();


if (!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header('Location: index.php?errCode=3&page=back');
  }
  die($conn->error);
}


// 記憶餅乾
if ($result) {
  // 建立 token 並儲存
  $token = generateToken();
  $sql = sprintf("INSERT INTO sage_tokens(token, username) VALUES ('%s','%s')", $token, $username);
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  // 記憶餅乾
  $expire = time() + 3600 * 24 * 30;
  setcookie('token', $token, $expire);
  header('Location: index.php');
} else {
  $code = $conn->errno;
  if ($code === 1062) {
    header('Location: index.php?errCode=3&page=back');
  }
  die($conn->error);
}

?>
