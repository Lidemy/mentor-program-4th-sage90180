<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');


if (
  empty($_POST['content'])
) {
  $json = array(
    "ok" => false,
    "message" => "請輸入內容"
  );

  $responese = json_encode($json);
  echo $responese;
  die();
}

$content = $_POST['content'];
$id_number = $_POST['id_number'];

$sql = "INSERT INTO sage_todos(content,id_number) VALUES (?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $content,$id_number);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    "ok" => false,
    "message" => "新增失敗"
  );

  $responese = json_encode($json);
  echo $responese;
  die();
}
$json = array(
  "ok" => true,
  "message" => "新增成功",
  "id" => $id_number
);
$responese = json_encode($json);
echo $responese;

?>