<?php
  session_start();
  require_once('conn.php');
  $role = NULL;

  // 管理者可以更改 暱稱 跟 使用者狀態
  $nickname = NULL;
  if(!empty($_POST['role'])){
    $role=$_POST['role'];
  }
  if(!empty($_POST['nickname'])){
    $nickname=$_POST['nickname'];
  }
  $id = $_POST['id'];

  if($role){
    $sql = "UPDATE sage_users SET role = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $role, $id);
    $result = $stmt->execute();
  }
  if($nickname){
    $sql = "UPDATE sage_users SET nickname = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $nickname, $id);
    $result = $stmt->execute();
  }

  header('Location: admin.php')
?>