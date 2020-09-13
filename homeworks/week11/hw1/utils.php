<?php 
  require_once('conn.php');

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getUserFromUsername($username){
    // function 內用變數要使用 gobal
    global $conn;
    $sql = sprintf("SELECT * FROM sage_users WHERE username = '%s'", $username);
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

  function getCommentFromId($id){
    // function 內用變數要使用 gobal
    global $conn;
    $sql = sprintf("SELECT * FROM sage_comments WHERE id = '%s'", $id);
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }
?>