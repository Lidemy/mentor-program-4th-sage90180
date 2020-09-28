## 十一到十五週心得
## week11
資訊安全週，本身就一個很粗心人，加上寫作業時也都沒跟著老師一起做，導致時常漏東漏西的，這次也利用 15 週複習時間，把之前錯誤都訂正過，之前一直逃避這問題，因為覺得好不容易把 php 部分都上完了，就不想再打開面對XD 但這次訂正作業時，依循之前記憶去修改，覺之前上的那些東西無形之中慢慢內化了，有種我大約知道是怎麼一回事，也知道如何修正了的感覺，開心~

[15 週作業 hw1](http://mentor-program.co/mtr04group5/sage/week11/hw1/index.php)  
[Merged 回覆](https://github.com/Lidemy/mentor-program-4th-sage90180/pull/11)
#### Hw1 - Error 1：修改暱稱時，有安全性問題喔，我可以更改任何人的暱稱 
[github](https://github.com/Lidemy/mentor-program-4th-sage90180/blob/069915e45d01652c0e4da287195cfe2827482334/homeworks/week11/hw1/handle_update_nickname.php)
* 原始碼：
```php
  <?php 
  require_once('conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];

  if(empty($nickname)){
    header('Location: index.php?errCode=2');
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "UPDATE sage_users SET nickname = ? WHERE username = ?";
```
* 修改後：後來改成抓 session 裡的 username，這樣就能確保只能存有紀錄的帳號。
```php
  <?php 
  session_start();
  require_once('conn.php');

  $nickname = $_POST['nickname'];
  $username = $_SESSION['username'];

  if(empty($nickname)){
    header('Location: index.php?errCode=2');
    die('資料不齊全');
  }

  // SQL Injection
  $sql = "UPDATE sage_users SET nickname = ? WHERE username = ?";
```
#### Hw1 - Error 2：編輯權限，不只管理員喔，現在任何知道這個 php 檔案的人都可以更改任何人的 role 
[github](https://github.com/Lidemy/mentor-program-4th-sage90180/blob/069915e45d01652c0e4da287195cfe2827482334/homeworks/week11/hw1/handle_update_role.php)
* 原始碼：
``` php
<?php
  session_start();
  require_once('conn.php');
  $role = NULL;

  // 管理者可以更改 暱稱 跟 使用者狀態
  $nickname = NULL;
  if(!empty($_POST['role'])){
    $role=$_POST['role'];
  }
  if(!empty($_POST['nickname'])){
    $nickname=$_POST['nickname'];
  }
```
* 修改後：除了前端頁面要判斷登入者角色，進入後端時應該也要判斷是否為管理者，避免被惡意修改。 
``` php
<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $role = NULL;

  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $role = $user['role'];
  }

  if($role !== 'ADMIN') {
    header('Location: index.php');
    exit();
  }
```

#### Hw1 - Error 3：編輯留言時，執行完之後沒有離開，所以程式碼會繼續執行，也就是說，管理員在編輯留言時，其實會做兩次，一次是這個，一次是下面普通會員編輯留言。 
[github](https://github.com/Lidemy/mentor-program-4th-sage90180/blob/069915e45d01652c0e4da287195cfe2827482334/homeworks/week11/hw1/handle_update_comment.php)
* 原始碼：
``` php
  // 管理員編輯留言
  if($role === 'ADMIN') {
    $sql = "UPDATE sage_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $content, $id);
    $result = $stmt->execute();
  }

  // 普通會員編輯留言
  $sql = "UPDATE sage_comments SET content = ? WHERE id = ? and username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $content, $id , $username);
  $result = $stmt->execute();

  if(!$result) {
    die($comm->error);
  }
  header('Location: index.php')
```
* 修改後：這邊忘了導回前端頁面，後來加上錯誤處理並導回頁面。
``` php
<?php
  // 管理員編輯留言
  if($role === 'ADMIN') {
    $sql = "UPDATE sage_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $content, $id);
    $result = $stmt->execute();
    if(!$result) {
      die($comm->error);
    }
    header('Location: index.php');
  }
```
#### Hw2 - Error 1：沒有 username 也能夠發表文章，不合理，應該要檢查 username 是否為空
* 原始碼：
``` php
<?php
  session_start();
  require_once('conn.php');
  $username = $_SESSION['username'];
  $category_id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  if(empty($category_id) || empty($title) || empty($content)){
    header('Location: edit.php');
    die('輸入錯誤');
  }
```
* 修改後：
應該驗證 session 內有沒有 username，如果沒有導回頁面。
``` php
<?php
  session_start();
  require_once('conn.php');
  $username = $_SESSION['username'];
  $category_id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  if(empty($username) || empty($category_id) || empty($title) || empty($content)){
    header('Location: edit.php');
    die('輸入錯誤');
  }
```

#### Hw2 - Error 2：任何人都可以新增分類喔，沒做權限檢查
* 原始碼：
``` php
<?php
  require_once('conn.php');

  $types = $_POST['types'];

  if(empty($types)){
    header('Location admin.php');
    die('輸入錯誤');
  }

  $sql = "INSERT INTO sage_categories(types) VALUES (?)";
```
* 修改後：
又是驗證漏洞，要確認是不是使用者本人再來修改。
``` php
<?php
  session_start();
  require_once('conn.php');

  $types = $_POST['types'];
  $username = $_SESSION['username'];

  if(empty($types)){
    header('Location admin.php');
    die('輸入錯誤');
  }

  $sql = "INSERT INTO sage_categories(types,username) VALUES (?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss',$types,$username);
  $result = $stmt->execute();

```

## week12
這週簡答題部分回答錯誤，當時寫： SPA所有事件都是在「同一個頁面」上所發生的，網址都不會改變，但 Huli 說：其實網址不一定不會改變，有可能網址改變但還是在同個頁面。  
之後看了 MDN 上的解釋，還有其他文章，去了解 history.pushState() 可以完全不切換頁面、刷新頁面下，只單純操作 javascript，在同一頁面處理列表頁與明細頁，並且使用者使用瀏覽歷程切換，也不會造成刷新，而且能夠觸發變頁歷程事件，透過他的歷程事件，使用javascript 讀參數方式，來顯示該歷程所要顯示的資料。   
[MDN-操控瀏覽器歷史紀錄](https://developer.mozilla.org/zh-TW/docs/Web/API/History_API)  
[瀏覽器的時光機—歷史堆疊、 pushState 與 replaceState API](https://medium.com/@moojing/%E7%80%8F%E8%A6%BD%E5%99%A8%E7%9A%84%E6%99%82%E5%85%89%E6%A9%9F-pushstate-replacestate-api-fa1d909c82b0)  
[利用pushState, popState和location.hash等方法自己實現一個小型路由](https://www.itread01.com/content/1547494381.html)

## week13 / week14
先承認這兩週大多得過且過，有些雖然有影片教學，實際操作後還是滿頭問號，感覺就是需要多練習，再看 15 週影片還有第四期官網導覽，了解這些工具在實際專案中應用，更覺前端深似海XD 學也學不完。  
部署網站時也是，跟著指令一個一個 key 上去，回過神已經完成部署，但問題也接踵而來，針對問題一個個上網搜尋解答，最後成功放上留言板時，有替自己小小驕傲一下。  

## 總結
在前後端糾纏的這幾週裡，作品一次又一次進化，也可以明顯找到自己的偏愛，比起無法看到實際成果的後端，自己更偏愛前端多些，不管是畫面或者是互動性，都能獲得即時回饋，反觀那些無從下手的 debugger，php 真的不是我的菜，在 14 週那些被我開 1.5 倍速聽的影片草草帶過，但為了完整作品，有其必要性，就好比設計師，創意和美感並不足以完成一個好的作品，還必須有其他的知識和領域去整合完成，所以就先記著這些模糊概念繼續往前，到時再見招拆招囉~