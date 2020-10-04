<?php
  session_start();
  require_once('conn.php');
  
  $id = $_GET['id'];
  $role = $_GET['role'];
  $content = $_POST['content'];
  $username = $_SESSION['username'];

  if(empty($content)){
    die('資料不齊全');
  }

  // 管理員編輯留言
  if($role === 'ADMIN') {
    $sql = "UPDATE sage_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $content, $id);
    $result = $stmt->execute();
    if(!$result) {
      die($comm->error);
    }
    header('Location: index.php');
  }
  
  // 普通會員編輯留言
  $sql = "UPDATE sage_comments SET content = ? WHERE id = ? and username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $content, $id , $username);
  $result = $stmt->execute();

  if(!$result) {
    die($comm->error);
  }
  header('Location: index.php')

  
?>