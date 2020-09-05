<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $sql = 'SELECT * FROM sage_categories WHERE is_deleted IS NULL ORDER BY id DESC';
  $result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
  <?php require_once('head.php') ?>
</head>

<body>
  <?php require_once('header.php') ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_add_article.php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <label for="">分類：</label>
            <select name="id">
              <?php while($row = $result->fetch_assoc()) { ?>
                <option value="<?php echo escape($row['id']) ?>"><?php echo escape($row['types']) ?></option>
              <?php } ?>
            </select>
          </div>
          <div class="edit-post__input-wrapper">
            <label for="">標題：</label>
            <input class="edit-post__input" type="text" name="title" placeholder="請輸入文章標題" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" name="content" type="text" class="edit-post__content"></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
              <button type= 'submit' class="edit-post__btn">送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>