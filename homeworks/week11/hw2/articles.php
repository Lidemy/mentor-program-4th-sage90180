<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $stmt = $conn->prepare(
    "SELECT ".
    "A.id, A.username, A.title, A.content, A.is_deleted, ".
    "A.category_id, A.created_at, B.types FROM sage_articles AS A ".
    "LEFT JOIN sage_categories AS B ON A.category_id = B.id ".
    "WHERE A.is_deleted IS NULL ORDER BY A.id DESC"
  );
  $result = $stmt->execute();
  if (!$result) {
    die('ERROR' . $conn->error);
  }
  $result = $stmt->get_result();
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
        <?php while($row = $result->fetch_assoc()) { ?>   
          <div class="admin-post">
            <a href="blog.php?id=<?php echo $row['id'] ?>">
            <div class="admin-post__title">
              [<?php echo escape($row['types']) ?>] <?php echo escape($row['title']) ?>
            </div>
            </a>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
              <?php echo escape($row['created_at']) ?>
              </div>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>

