<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $nickname = NULL;
  $role = NULL;
  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $nickname = $user['nickname'];
    $role = $user['role'];
  }

  if($role !== 'ADMIN') {
    header('Location: index.php');
    exit();
  }

  $stmt = $conn->prepare(
    'SELECT * FROM sage_users ORDER BY role ASC'
  );
  $result = $stmt->execute();
  if(!$result){
    die('Error:'.$conn->error);
  }
  $result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php require_once('header.php') ?>
</head>

<body>
  <div class="admin_list_container">
    <div class="admin_list_header">
      後台管理
      <div class="admin_list_btns">
        <a href="index.php" class="fas fa-comment-alt"> 留言板</a>
        <a href="handle_logout.php" class="fas fa-sign-out-alt">登出</a>
      </div>
    </div>
    <div class="admin_list_body">
        <table>
          <tr>
            <th>#</th>
            <th>帳號</th>
            <th>暱稱</th>
            <th>權限</th>
            <th>創建日期</th>
          </tr>
        <?php while($row = $result->fetch_assoc()){ ?>
          <tr>
            <td><?php echo escape($row['id']); ?></td>
            <td><?php echo escape($row['username']); ?></td>
            <td>
              <form method="POST" action="handle_update_role.php">
                <input type="hidden" name="id" value="<?php echo escape($row['id']); ?>">
                <input type="text" name="nickname" value="<?php echo escape($row['nickname']); ?>">
                <button class="edit_nickname_btn">修改</button>
              </form>
            </td>
            <td>
              <form method="POST" action="handle_update_role.php">
                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                <select name="role">
                  <option <?php echo $row['role'] == "NORMAL"? 'selected':'' ?> value="NORMAL">普通會員</option>
                  <option <?php echo $row['role'] == "ADMIN"? 'selected':'' ?> value="ADMIN">管理者</option>
                  <option <?php echo $row['role'] == "BANNED"? 'selected':'' ?> value="BANNED">停權中</option>
                </select>
                <button class="edit_nickname_btn">修改</button>
              </form>
            </td>
            <td><?php echo date('Y-m-d',time($row['created_at'])); ?></td>
          </tr>
      <?php } ?>
        </table>
    </div>
  </div>

  <script src="./click.js"></script>
</body>

</html>