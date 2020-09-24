# hw2：伺服器與網站部署
整個部署過程主要是參考：[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)，真的是前人種樹後人乘涼 XD 從一開始的購買及設定 AWS EC2 遠端主機，到後面設定 LAMP 環境都沒太大問題，但要傳檔案時問題就開始接踵而來了。  
### 問題一： AWS 與 FileZilla 連線
原以為像登入 phpmyadmin 一樣的帳號密碼，但後來查到的需要加入金鑰匙，還有使用者要填 ubuntu

**解決方法：**    
1. 點編輯 -> 點設定，選SFTP，加入金鑰匙  
2. 點新增站台 -> 協定：選SFTP / 主機：輸入 IPv4 / 使用者：ubuntu  
3. 接下來就成功登入啦~放資料的話就到 /var/www/html  

[參考資料-透過FileZilla連線至AWS](https://medium.com/@fuisandy0608/%E9%80%8F%E9%81%8Efilezilla%E9%80%A3%E7%B7%9A%E8%87%B3aws-656e3b8aa9ef)

### 問題二：FileZilla 無法新增檔案
在 FileZilla 新增檔案，但一直傳失敗，後來重看教學發現最後有提到改變權限，因此輸入以下文字，就解決啦~

**解決方法：**    
登入主機後輸入`$ sudo chown ubuntu /var/www/html`

### 問題三：Mysql 資料匯入顯示錯誤
雖然成功把之前資料匯入我的資料庫，但一直出現 `count()：Parameter must be an array or an object that implements Countable`的錯誤訊息，後來利用這串關鍵字搜尋才找到解決方法。
  
**解決方法：**  
登入主機後輸入`sudo sed -i "s/|\s*\((count(\$analyzed_sql_results\['select_expr'\]\)/| (\1)/g" /usr/share/phpmyadmin/libraries/sql.lib.php`

[參考資料](https://stackoverflow.com/questions/48001569/phpmyadmin-count-parameter-must-be-an-array-or-an-object-that-implements-co)

### 問題四：Sequel Pro 無法登入
在登入頁時有提示 3306 port，我想應該就是這問題了，因此到 Security Group 內新增 3306 port 就解決了~

### 問題五：PHP 無法連接資料庫
雖然成功把資料備份過來了，但 PHP 不知道為什麼就是讀取到資料，看了學長姐文章提到是 Mysql 權限問題，最後跟著指示操作後也順利解決。  
 

**解決方法：**   
1. 登入主機後輸入`sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf`
2. 找到`bind-address = 127.0.0.1`並在前面加上 `#` 改成註解。
3. 接著輸入`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '這裡設定密碼';`(一開始一直以為是 phpmyadmin 登入密碼，但其實是要自己設定密碼，且要按照設定的密碼等級要求輸入。)


[參考資料](https://stackoverflow.com/questions/11223235/mysql-root-access-from-all-hosts)  
[參考資料-如何遠端連接虛擬主機上的 mySQL 資料庫](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/33)   

**解決這些問題，終於正常使用啦，但一路設定下來，發現英文太爛也個大問題，但這問題目前先無解 XD，另外每次登入指令好長一串，根本記不起來
這邊也是參考之前[學長姐文章](https://github.com/enter3017sky/mentor-program-2nd-blog/issues/31)，使用 SSH 設定簡化指令。**