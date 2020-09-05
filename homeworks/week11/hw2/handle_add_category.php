<?php
  require_once('conn.php');

  $types = $_POST['types'];

  if(empty($types)){
    header('Location admin.php');
    die('輸入錯誤');
  }

  $sql = "INSERT INTO sage_categories(types) VALUES (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s',$types);
  $result = $stmt->execute();

  // 判斷是否成功
  if(!$result) {
    die($conn->error);
  }

  header('Location: admin.php')

?>