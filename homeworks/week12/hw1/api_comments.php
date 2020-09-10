<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(
    empty($_GET['site_key'])
    ) {
      $json = array (
        "ok" => false,
        "message" => "請輸入來源內容"
      );

      $responese = json_encode($json);
      echo $responese ;
      die();
    }

    $site_key = $_GET['site_key'];
    $limit = $_GET['limit'];

    $sql = 
      "SELECT * FROM sage_discussions WHERE site_key = ? ".
      (empty($_GET['before'])? '':'and id < ?').
      " ORDER BY id DESC LIMIT ?";
    $stmt = $conn->prepare($sql);
    if (empty($_GET['before'])) {
      $stmt -> bind_param('si', $site_key,$limit);
    } else {
      $stmt -> bind_param('sii', $site_key, $_GET['before'],$limit);
    }
    $result = $stmt->execute();

    if(!$result) {
      $json = array (
        "ok" => false,
        "message" => "錯誤"
      );

      $responese = json_encode($json);
      echo $responese ;
      die();
    }

    $result = $stmt->get_result();
    $discussions = array();

    while($row = $result->fetch_assoc()) {
      array_push($discussions, array(
        "id" => $row["id"],
        "nickname" => $row["nickname"],
        "content" => $row["content"],
        "created_at" => $row["created_at"]
      ));
    }

    $json = array (
      "ok" => true,
      "discussions" => $discussions
    );
    $responese = json_encode($json);
    echo $responese ;
?>