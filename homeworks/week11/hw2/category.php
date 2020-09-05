<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

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
      <?php foreach($categories_result as $row) { ?>
        <div class="category_list">
            [<?php print_r($row['types']); ?>]
        </div> 
        <?php
            $sql = "SELECT * FROM sage_articles WHERE is_deleted IS NULL AND category_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i',$row['id']);
            $result = $stmt->execute();
            $result = $stmt->get_result();
        ?>
        <?php while($row = $result->fetch_assoc()){ ?>
            <div class="admin-post">
              <a href="blog.php?id=<?php echo escape($row['id']) ?>">
                <div class="admin-post__title"><?php echo escape($row['title']) ?></div>
              </a>
              <div class="admin-post__info">
                <div class="admin-post__created-at"><?php echo date('Y-m-d',time($row['created_at'])) ?></div>
              </div>
            </div>
        <?php } ?>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>

