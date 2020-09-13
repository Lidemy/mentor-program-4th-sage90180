<?php
  session_start();
  require_once('conn.php');
  $username = $_SESSION['username'];
  $category_id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  if(empty($category_id) || empty($title) || empty($content)){
    header('Location: edit.php');
    die('輸入錯誤');
  }

  // SQL Injection
  $sql = "INSERT INTO sage_articles(username, category_id, title, content) VALUES (?,?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('siss',$username,$category_id,$title,$content);
  $result = $stmt->execute();

  // 判斷是否成功
  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php')
?>