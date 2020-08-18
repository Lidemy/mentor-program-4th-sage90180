<?php
require_once('./conn.php');

$nickname = $_POST['nickname'];
$content = $_POST['content'];
$id = $_POST['id'];

if(empty($nickname) || empty($content)){
  header('Location: update.php');
  die('資料不齊全');
}

// SQL Injection
$sql = "UPDATE sage_comments SET nickname = ?, content = ? WHERE id =".$id;
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $content);
$result = $stmt->execute();

if($result){
  header('Location: ./index.php');
}else{
  echo 'failed'.$conn->error;
}

?>