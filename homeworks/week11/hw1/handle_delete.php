<?php
  session_start();
  require_once('conn.php');

  $id = $_GET['id'];
  $role = $_GET['role'];
  $username = $_SESSION['username'];

  // 管理員刪除留言
  if($role === 'ADMIN') {
    $sql = "UPDATE sage_comments SET is_deleted = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$id);
    $result=$stmt->execute();
  }

  // 普通會員刪除留言
  $sql = "UPDATE sage_comments SET is_deleted = 1 WHERE id = ? and username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is',$id , $username);
  $result=$stmt->execute();
  if(!$result){
    die($conn->error);
  }
  header('Location: index.php');
?>