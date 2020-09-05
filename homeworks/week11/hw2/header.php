<nav class="navbar">
  <div class="wrapper navbar__wrapper">
    <div class="navbar__site-name">
      <a href='index.php'>Sage's Blog</a>
    </div>
    <ul class="navbar__list">
      <div>
        <li><a href="articles.php">文章列表</a></li>
        <li><a href="category.php">分類專區</a></li>
        <li><a href="about.php">關於我</a></li>
      </div>
      <div>
      <!-- 用 username 判斷 登入 / 登出 選單 -->
        <?php if(empty($username)) { ?>
          <li><a href="login.php">登入</a></li>
        <?php } else { ?>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="edit.php">新增文章</a></li>
          <li><a href="handle_logout.php">登出</a></li>
        <?php } ?>
      </div>
    </ul>
  </div>
</nav>