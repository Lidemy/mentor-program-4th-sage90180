<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $stmt = $conn->prepare(
    "SELECT ".
      "A.id, A.username, A.title, A.content, A.is_deleted, ".
      "A.category_id, A.created_at, B.types FROM sage_articles AS A ".
      "LEFT JOIN sage_categories AS B ".
      "ON A.category_id = B.id WHERE A.is_deleted IS NULL ".
      "AND username = ? ORDER BY A.id DESC"
  );
  $stmt->bind_param('s',$username);
  $result = $stmt->execute();
  if (!$result) {
    die('ERROR' . $conn->error);
  }
  $result = $stmt->get_result();

  // 分類結果
  $sql = "SELECT * FROM sage_categories WHERE is_deleted IS NULL ORDER BY id DESC";
  $categories_result = $conn->query($sql);
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
      <div class="admin-posts">
        <div class="admin-categories">
          <form action="handle_add_category.php" method="POST">
            新增分類：
            <input type="text" name="types">
            <button type="submit">新增</button>
          </form>
          <form action="handle_delete_category.php" method="POST">
            刪除分類：
            <select name="id">
              <?php while($row = $categories_result->fetch_assoc()) { ?>
                <option value="<?php echo escape($row['id']) ?>"><?php echo escape($row['types']) ?></option>
              <?php } ?>
          </select>
            <button type="submit">刪除</button>
          </form>
        </div>
        <?php while($row = $result->fetch_assoc()) { ?>   
          <div class="admin-post">
            <div class="admin-post__title">
            [<?php echo escape($row['types']) ?>] <?php echo escape($row['title']) ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
              <?php echo escape($row['created_at']) ?>
              </div>
              <a class="admin-post__btn" href="update_article.php?id=<?php echo escape($row['id']) ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="handle_delete.php?id=<?php echo escape($row['id']) ?>">
                刪除
              </a>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>

