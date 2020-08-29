<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;

    // 使用者
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    
    $stmt = $conn->prepare(
      "SELECT ".
      "A.id, A.username, A.title, A.content, A.is_deleted, A.category_id, ".
      "A.created_at, B.types FROM sage_articles AS A ".
      "LEFT JOIN sage_categories AS B ON A.category_id = B.id ".
      "WHERE A.is_deleted IS NULL AND username = ? ORDER BY A.id DESC"
    );
    
    $stmt->bind_param('s',$username);
    $result = $stmt->execute();
    if (!$result) {
      die('ERROR' . $conn->error);
    }
    $result = $stmt->get_result();


    // 訪客
  }else {
    $sql = "SELECT A.id, A.username, A.title, A.content, A.is_deleted, ".
    "A.category_id, A.created_at, B.types ".
    "FROM sage_articles AS A LEFT JOIN sage_categories AS B ".
    "ON A.category_id = B.id WHERE A.is_deleted IS NULL ".
    "ORDER BY A.id DESC LIMIT 5";

    $result = $conn->query($sql);
    if (!$result) {
      die('ERROR' . $conn->error);
    }
  }
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
      <?php while($row=$result->fetch_assoc()){ ?>
        <article class="post">
          <div class="index post__header">
            <div class="post__header-text">
              [<?php echo escape($row['types']) ?>] <?php echo escape($row['title']) ?>
            </div>
            <div class="post__actions">
              <?php if(!empty($_SESSION['username'])){ ?>
                <a class="post__action" href="update_article.php?id=<?php echo escape($row['id']) ?>">編輯</a>
              <?php } ?>
            </div>
          </div>
          <div class="post__info">
            <?php echo escape($row['created_at']) ?>
          </div>
          <div class="index post__content">
            <?php echo escape($row['content']); ?>
          </div>
          <a class="btn-read-more" href="blog.php?id=<?php echo escape($row['id']) ?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>