<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $nickname = NULL;
  $role = NULL;
  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
    $role = $user['role'];
  }
  // 頁數
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_pear_page = 8;
  $offset = ($page - 1) * $items_pear_page;
  // 抓出 comments 資料
  $stmt = $conn->prepare(
    "SELECT " .
      "C.id AS id, C.content AS content, " .
      "C.created_at AS created_at, U.nickname AS nickname, " .
      "U.username AS username, " .
      "U.role AS role " .
      "FROM sage_comments AS C " .
      "LEFT JOIN sage_users AS U ON C.username = U.username " .
      "WHERE C.is_deleted IS NULL " .
      "ORDER BY C.id DESC " .
      "LIMIT ? OFFSET ? "
  );
  $stmt->bind_param('ii', $items_pear_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('ERROR' . $conn->error);
  }
  $result = $stmt->get_result();
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
    if ($_GET['errCode'] === '3') {
      $errMsg = $icon . '您已被限制留言';
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
    <div class="card_inner <?php echo $username? 'back' : '' ?><?php echo empty($_GET['status']) ? '' : 'back'; ?>">

      <!-- 登入面板 -->

      <div class="card_front card_login">
        <div class="card_header">
          登入
          <div class="card_btns">
            <a href="#" class="fas fa-user-astronaut"> 註冊</a>
          </div>
        </div>
        <div class="card_body">
          <form method="POST" action="handle_login.php">
            <div class="card_form_group">
              <label for="">帳 號</label><br>
              <input type="text" name="username">
            </div>
            <div class="card_form_group">
              <label for="">密 碼</label><br>
              <input type="password" name="password">
            </div>
            <div class="err_message"><?php echo empty($_GET['status']) ? $errMsg : ''; ?></div>
            <button class="card_submit_btn" type="submit" value="">
              <i class="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- 留言面板 -->

      <?php if ($username) { ?>
        <div class="card_back card_comment">
          <div class="card_header">
            Hello Board 2.0
            <div class="card_btns">
              <?php if($role === 'ADMIN') { ?>
                <a href="admin.php" class="fas fa-cog">管理</a>
              <?php } ?>
              <a href="handle_logout.php" class="fas fa-sign-out-alt">登出</a>
            </div>
          </div>
          <div class="card_nickname_area">
            <div class="name">你好！<span><?php echo escape($nickname) ?></span></div>
            <button class="edit_nickname_btn"><i class="fas fa-pencil-alt"></i></button>
          </div>
          <form class="edit_nickname_area" method="POST" action="./handle_update_nickname.php">
            修改暱稱
            <input type="text" name="nickname" value="<?php echo escape($nickname) ?>">
            <input type="hidden" name="username" value=<?php echo escape($username) ?>>
            <button class="edit_nickname_btn"><i class="fas fa-arrow-circle-right"></i></button>
          </form>
          <div class="card_body">
            <form class="comment_form" method="POST" action="handle_add_comment.php?role=<?php echo $role ?>">
              <textarea name="content" placeholder="你說我在聽..."></textarea>
              <div class="err_message"><?php echo empty($_GET['errCode']) ? '' : $errMsg; ?></div>
              <button class="card_submit_btn" type="submit" value="">
                <i class="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      <?php } ?>

      <!-- 註冊面板 -->

      <?php if (!$username) { ?>
        <div class="card_back card_register">
          <div class="card_header">
            註冊
            <div class="card_btns">
              <a href="#" class="fas fa-sign-in-alt"> 登入</a>
            </div>
          </div>
          <div class="card_body">
            <form method="POST" action="./handle_register.php">
              <div class="card_form_group">
                <label for="">暱 稱</label><br>
                <input type="text" name="nickname">
              </div>
              <div class="card_form_group">
                <label for="">帳 號</label><br>
                <input type="text" name="username">
              </div>
              <div class="card_form_group">
                <label for="">密 碼</label><br>
                <input type="password" name="password">
              </div>
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
        <div class="message <?php echo $row['nickname'] === $nickname ? 'reverse' : '' ?>">
          <div class="message_photo"><img src="./imgs/photo-0<?php echo rand(1, 9); ?>.png" alt=""></div>
          <div class="message_text_area">
            <div class="message_user_info">
              <div class="message_name"><?php echo escape($row['nickname']) ?></div>
              <span>(@<?php echo escape($row['username']) ?>)</span>
            </div>
            <div class="message_text"><?php echo escape($row['content']) ?></div>
            <div class="message_edit">
              <div class="message_date"><?php echo escape($row['created_at']) ?></div>
                <?php if($row['nickname'] === $nickname || $role === 'ADMIN') { ?>
                  <div class="message_btns">
                    <a href="update.php?id=<?php echo $row['id']; ?>&role=<?php echo $role ?>" class="fas fa-edit"></a>
                    <a href="handle_delete.php?id=<?php echo $row['id']; ?>&role=<?php echo $role ?>" class="fas fa-trash-alt"></a>
                  </div>
                <?php } ?>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>
  <div class="page">
    <?php
      $stmt = $conn->prepare('SELECT count(id) AS count FROM sage_comments WHERE is_deleted is NULL');
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $items_pear_page);
    ?>
    <div>總共有 <?php echo $count ?> 則留言，第 <span><?php echo $page ?> / <?php echo $total_page ?> 頁</span></div>
    <div class="pageinator">
      <?php if ($page != 1) { ?>
        <a class="first" href="index.php?page=1"><i class="fas fa-step-backward"></i>第一頁</a>
        <a class="previous" href="index.php?&page=<?php echo $page - 1 ?>"><i class="fas fa-caret-left"></i>上一頁</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a class="next" href="index.php?page=<?php echo $page + 1 ?>">下一頁<i class="fas fa-caret-right"></i></a>
        <a class="last" href="index.php?page=<?php echo $total_page ?>">最末頁<i class="fas fa-step-forward"></i></a>
      <?php } ?>
    </div>
  </div>
  
  <script src="./click.js"></script>
</body>

</html>