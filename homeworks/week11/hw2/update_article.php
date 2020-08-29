<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $id = $_GET['id'];

  $sql = 'SELECT * FROM sage_articles WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('ERROR' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
        <form action="handle_update_article.php?id=<?php echo $id ?>" method="POST">
          <div class="edit-post__title">
            編輯文章：
          </div>
          <div class="edit-post__input-wrapper">
            <label for="">分類：</label>
              <?php  
                $sql = 'SELECT * FROM sage_categories WHERE is_deleted IS NULL ORDER BY id DESC';
                $result_types = $conn->query($sql);
              ?>
            <select name="types">
              <?php while($row_types = $result_types->fetch_assoc()){ ?>
                <option value="<?php echo escape($row_types['id']) ?>" 
                  <?php echo $row_types['id']==$row['category_id']? 'selected':''; ?>>
                  <?php echo escape($row_types['types']) ?>
                </option>
              <?php } ?>
            </select>
          </div>
          <div class="edit-post__input-wrapper">
            <label for="">標題：</label>
            <input class="edit-post__input" type="text" name="title" value="<?php echo $row['title'] ?>" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" name="content" type="text" class="edit-post__content">
              <?php echo $row['content'] ?>
            </textarea>
          </div>
          <div class="edit-post__btn-wrapper">
              <button type= 'submit' class="edit-post__btn">送出</button>
          </div>
          <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER'] ?>">
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>