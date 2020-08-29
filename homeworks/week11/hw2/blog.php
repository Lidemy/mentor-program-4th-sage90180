<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $id = $_GET['id'];

  $stmt = $conn->prepare(
    "SELECT ".
    "A.id, A.username, A.title, A.content, A.is_deleted, A.category_id, ".
    "A.created_at, B.types FROM sage_articles AS A ".
    "LEFT JOIN sage_categories AS B ON A.category_id = B.id WHERE A.id = ?"
  );
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
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div>[<?php echo escape($row['types']) ?>] <?php echo escape($row['title']) ?></div>
          <div class="post__actions">
            <a class="post__action" href="update_article.php?id=<?php echo $id ?>">編輯</a>
          </div>
        </div>
        <div class="post__info"><?php echo escape($row['created_at']) ?></div>
        <div class="post__content"><?php echo escape($row['content']) ?></div>
        <a class="btn-blog-back" href="index.php">上一頁</a>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>