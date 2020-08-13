<?php
  require_once('conn.php');


  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  if(empty($nickname) || empty($content)) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "INSERT INTO sage_comments(nickname, content) VALUES(?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $content);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>


