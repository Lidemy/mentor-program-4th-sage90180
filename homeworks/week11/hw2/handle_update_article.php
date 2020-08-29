<?php
  session_start();
  require_once('conn.php');
  $page = $_POST['page'];
  $types = $_POST['types'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  $id = $_GET['id'];

  if(empty($types) || empty($title) || empty($content)){
    header('Location: update_article.php?id='.$id);
    die('輸入錯誤');
  }

   // SQL Injection
  $sql = 'UPDATE sage_articles SET category_id = ?, title = ?, content = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssi', $types, $title, $content, $id);
  $result = $stmt->execute();

  // 判斷是否成功
  if(!$result) {
    die($conn->error);
  }

  header('Location: '.$page);
?>