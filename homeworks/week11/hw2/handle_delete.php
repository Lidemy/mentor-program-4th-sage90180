<?php
  require_once('conn.php');
  $id = $_GET['id'];
  $sql = 'UPDATE sage_articles SET is_deleted = 1 WHERE id =?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if (!$result) {
    die('ERROR' . $conn->error);
  }
  header('Location: admin.php');
?>