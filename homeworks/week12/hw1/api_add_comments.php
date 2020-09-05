<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');


  if(
    empty($_POST['content']) ||
    empty($_POST['nickname']) ||
    empty($_POST['site_key'])
    ) {
      $json = array (
        "ok" => false,
        "message" => "請輸入內容"
      );

      $responese = json_encode($json);
      echo $responese ;
      die();
    }

    $content = $_POST['content'];
    $nickname = $_POST['nickname'];
    $site_key = $_POST['site_key'];

    $sql = "INSERT INTO sage_discussions(content, nickname, site_key) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt -> bind_param('sss', $content, $nickname, $site_key);
    $result = $stmt->execute();

    if(!$result) {
      $json = array (
        "ok" => false,
        "message" => "新增失敗"
      );

      $responese = json_encode($json);
      echo $responese ;
      die();
    }
    $json = array (
      "ok" => true,
      "message" => "新增成功"
    );
    $responese = json_encode($json);
    echo $responese ;
?>