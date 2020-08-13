<?php
require_once('conn.php');


$username = NULL;
if (!empty($_COOKIE['token'])) {
  $token = $_COOKIE['token'];
  $sql = sprintf("SELECT username FROM sage_tokens WHERE token = '%s'", $token);
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $username = $row['username'];

  $sql = sprintf("SELECT nickname FROM sage_users WHERE username = '%s'", $username);
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
}

$stmt = $conn->prepare('SELECT * FROM sage_comments ORDER BY id DESC');
$result = $stmt->execute();

if (!$result) {
  die('Error' . $conn->error);
}
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>(๑•̀ㅂ•́)و✧ Hello Board ✧</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.0/css/all.css" integrity="sha384-aOkxzJ5uQz7WBObEZcHvV5JvRW3TUc2rNPA7pe3AwnsUohiw1Vj2Rgx2KSOkF5+h" crossorigin="anonymous">
</head>

<body>
  <div class="card_container" id="board">
    <div class="card_inner <?php echo empty($_GET['page']) ? "" : "back"; ?>">
      <div class="card_commens">
        <div class="card_header">Hello Board
          <div class="btns">
            <a href="logout.php" class="fas fa-sign-out-alt">登出</a>
          </div>
        </div>
        <div class="card_body">
          <form method="POST" action="./handle_add_comment.php">
            <div class="nickname">你好，<input name="nickname" class="nickname" type="text" value="<?php echo $nickname ?>" readonly>
              <?php
              if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                if ($code === '1') {
                  echo '<i class="fas fa-exclamation-triangle"><span>錯誤</span></i>';
                }
              }
              ?>
            </div>
            <textarea class="text_area" name="content" placeholder="你說我在聽..." rows="10"></textarea>
            <button class="submit_btn" type="submit" value="">
              <i class="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
      <?php if (!$username) { ?>
        <div class="card_commens login">
          <div class="card_header">登 入
            <div class="btns">
              <a href="#" class="fas fa-user-plus">註冊</a>
            </div>
          </div>
          <div class="card_body">
            <form method="POST" action="./handle_login.php">
              <div class="form_group">
                <label for="">帳 號</label><br>
                <input name="username" type="username">
              </div>
              <div class="form_group">
                <label for="">密 碼</label><br>
                <input name="password" type="password">
              </div>
              <?php
              if (!empty($_GET['errCode']) && $_GET['errCode'] > 3) {
                if ($_GET['errCode'] === '4') {
                  $errMsg = '錯誤：請輸入資料';
                } else if ($_GET['errCode'] === '5') {
                  $errMsg = '錯誤：帳號或密碼錯誤';
                }
                echo '<div class="warning warning_login">' . $errMsg . '</div>';
              }
              ?>
              <button class="submit_btn submit_btn_login" type="submit">
                <i class="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>

      <?php } ?>
      <div class="card_login">
        <div class="card_header">註 冊
          <div class="btns">
            <a href="#" class="fas fa-sign-in-alt">登入</a>
          </div>
        </div>
        <div class="card_body">
          <form method="POST" action="./handle_register.php">
            <div class="form_group">
              <label for="">暱 稱</label><br>
              <input type="text" name="nickname">
            </div>
            <div class="form_group">
              <label for="">帳 號</label><br>
              <input type="text" name="username">
            </div>
            <div class="form_group">
              <label for="">密 碼</label><br>
              <input type="password" name="password">
            </div>
            <?php
            if (!empty($_GET['errCode']) && $_GET['errCode'] <= '3') {
              if ($_GET['errCode'] === '2') {
                $errMsg = '錯誤：請輸入資料';
              } else if ($_GET['errCode'] === '3') {
                $errMsg = '錯誤：帳號已被註冊';
              }
              echo '<div class="warning">' . $errMsg . '</div>';
            }
            ?>

            <button class="submit_btn" type="submit" value="">
              <i class="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="message_area">
    <div class="messages">
      <?php
      while ($row = $result->fetch_assoc()) {
      ?>
        <div class="message <?php echo $row['nickname'] === $nickname ? "reverse" : ""; ?>">
          <div class="photo"><img src="./imgs/photo-0<?php echo rand(1, 9); ?>.png" alt=""></div>
          <div class="text_area">
            <div class="name"><?php echo htmlspecialchars($row['nickname']); ?></div>
            <div class="text"><?php echo htmlspecialchars($row['content']); ?></div>
            <div class="date"><?php echo htmlspecialchars($row['created_at']); ?></div>
            <div class="btns" style="display: <?php echo $row['nickname'] === $nickname ? "block" : ""; ?>;">
              <a href="update.php?id=<?php echo $row['id']; ?>" class="fas fa-edit"></a>
              <a href="handle_delete.php?id=<?php echo $row['id']; ?>" class="fas fa-trash-alt"></a>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>
</body>

<script>
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-user-plus')) {
      document.querySelector('.card_inner').classList.add('back')
      document.querySelector('.card_inner').classList.remove('front')
      document.querySelector('.warning_login').classList.add('hidden')
    }
    if (e.target.classList.contains('fa-sign-in-alt')) {
      document.querySelector('.card_inner').classList.add('front')
      document.querySelector('.card_inner').classList.remove('back')
    }
  })
</script>

</html>