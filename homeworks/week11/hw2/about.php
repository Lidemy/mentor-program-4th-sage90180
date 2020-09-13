<?php
  session_start();
  require_once('conn.php');
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
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
  <div class="login-wrapper">
    <h2>Hi, I'm Sage.</h2>
  </div>
</body>
</html>