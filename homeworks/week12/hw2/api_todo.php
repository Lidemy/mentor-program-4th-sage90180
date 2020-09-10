<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  
    if (!empty($_GET['id'])) {
      $id_number = $_GET['id'];
    }else{
      header('Location: index.php');
    }
    

    $sql = "SELECT * FROM sage_todos WHERE id_number = ?";
    $stmt = $conn->prepare($sql);
    $stmt -> bind_param('s', $id_number);
    $result = $stmt->execute();
    $result = $stmt->get_result();


    if($result->num_rows === 0) {
      $json = array (
        "ok" => false,
        "message" => "錯誤ID"
      );

      $responese = json_encode($json);
      echo $responese ;
      die();
    }

    $todos = array();

    while($row = $result->fetch_assoc()) {
      array_push($todos, array(
        "content" => $row["content"]
      ));
    }

    $json = array (
      "ok" => true,
      "todos" => $todos
    );
    $responese = json_encode($json);
    echo $responese ;
?>