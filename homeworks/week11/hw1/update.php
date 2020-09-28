<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }
  
  $id = $_GET['id'];
  $role = NULL;

  // 抓出特定 user 資料
  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $content = getCommentFromId($id)['content'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
    $role = $user['role'];
  }

  // 抓出 comments 資料
  $result = $conn->query(
    "SELECT ".
      "C.id AS id, C.content AS content, ".
      "C.created_at AS created_at, U.nickname AS nickname, ".
      "U.username AS username ".
      "FROM sage_comments AS C ". 
      "LEFT JOIN sage_users AS U ON C.username = U.username ".
      "ORDER BY C.id DESC");
  if (!$result) {
    die('ERROR' . $conn->error);
}

  // 錯誤訊息顯示
  $errMsg = '';
  if (!empty($_GET['errCode'])) {
    $icon = '<i class="fas fa-exclamation-triangle"></i> ';
    if ($_GET['errCode'] === '1064') {
      $errMsg = $icon . '請輸入資料';
    }
    if ($_GET['errCode'] === '1062') {
      $errMsg = $icon . '使用者重複';
    }
    if ($_GET['errCode'] === '1') {
      $errMsg = $icon . '帳號密碼錯誤';
    }
    if ($_GET['errCode'] === '2') {
      $errMsg = $icon . '請輸入暱稱';
    }
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php require_once('header.php') ?>
</head>

<body>
  <div class="card_container">
    <div class="card_inner <?php echo $username? 'back' : '' ?>">

      <!-- XXXXXXXXXXXX -->
      <div class="card_front card_comment">
        <div class="card_header">
        Hello Board 2.0
          <div class="card_btns">
          <a href="handle_logout.php" class="fas fa-sign-out-alt">登出</a>
          </div>
        </div>
        <div class="card_nickname_area">
            <div class="name">你好！<span>輸入更改內容：</span></div>
          </div>
        <div class="card_body">
          <form class="comment_form" method="POST" action="handle_update_comment.php">
            <input type="hidden" name="nickname" value="">
            <textarea name="content" ></textarea>
            <div class="err_message"></div>
            <input type="hidden" name="id" value="<?php echo $id ?>">
            <button class="card_submit_btn" type="submit" value="">
              <i class="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
      <!-- XXXXXXXXXXX  -->
      <!-- 上面不要看 -->


      <!-- 留言面板_修改 -->
      <?php if ($username) { ?>
        <div class="card_back card_comment">
          <div class="card_header">
              編輯留言
              <div class="card_btns">
              <a href="index.php" class="fas fa-reply">上一頁</a>
            </div>
          </div>
          <div class="card_nickname_area">
            <div class="name">請輸入更改內容：<span></span></div>
          </div>
          <div class="card_body">
            <form class="comment_form" method="POST" action="handle_update_comment.php?id=<?php echo $id ?>&role=<?php echo $role ?>">
              <textarea name="content" ><?php echo escape($content) ?></textarea>
              <div class="err_message"><?php echo empty($_GET['status']) ? '' : $errMsg; ?></div>
              <button class="card_submit_btn" type="submit" value="">
                <i class="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>

  <!-- 留言顯示區 -->

  <div class="message_container">
    <div class="messages">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <?php if($row['nickname'] === $nickname || $role === 'ADMIN') { ?>
        <div class="message reverse">
          <div class="message_photo"><img src="./imgs/photo-0<?php echo rand(1, 9); ?>.png" alt=""></div>
          <div class="message_text_area">
            <div class="message_user_info">
              <div class="message_name"><?php echo escape($row['nickname']) ?> </div>
              <span>(@<?php echo escape($row['username']) ?>)</span>
            </div>
            <div class="message_text"><?php echo escape($row['content']) ?></div>
            <div class="message_edit">
              <div class="message_date"><?php echo escape($row['created_at']) ?></div>
              <div class="message_btns">
                <a href="update.php?id=<?php echo $row['id']; ?>&role=<?php echo $role ?>" class="fas fa-edit"></a>
                <a href="handle_delete.php?id=<?php echo $row['id']; ?>&role=<?php echo $role ?>" class="fas fa-trash-alt"></a>
              </div>
            </div>
          </div>
        </div>
        <?php } ?>
      <?php } ?>
    </div>
  </div>

  <script src="./click.js"></script>
</body>

</html>