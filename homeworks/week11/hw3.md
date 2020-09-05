## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
* 加密是一對一關係，可以解密，當對方知道了所使用演算法時就能回推密碼。  

* 雜湊是多對一關係，無法還原，是不可逆推的，相同字串所產生結果都會相同，但不同字串可成產生相同雜湊值，是透過驗證機制與資料庫比對來判定結果，因此其不可還原特性，較適合用來儲存密碼。

## `include`、`require`、`include_once`、`require_once` 的差別
* include 函式會將指定的檔案讀入並且執行裡面的程式，如果遇到錯誤會提示錯誤並繼續執行。
* require 函式會將目標檔案的內容讀入，遇到錯誤時也會提示錯誤但會終止程式的執行。

* 而`include_once() 及 require_once` 多了 `_once` 其意義代表著，函式會先檢查目標檔案的內容是不是在之前就已經匯入過了，如果是的話，便不會再次重複匯入同樣的內容。

[參考文章-深入理解require與require_once與include以及include_once的區別](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/239900/)
## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 的攻擊原理，是透過使用者輸入的內容夾帶 SQL 指令，再利用字串拼接方式，改變原生字串語意，進而竊取資料庫內容。

解決方法：利用 Mysql 內建機制 prepared statement 做字串拼接，把惡意指令解讀成字串。

##  請說明 XSS 的攻擊原理以及防範方法
XSS 全名為 Cross-site Scripting，其執行原理是把使用者輸入的文字當成程式碼執行，例如在輸入欄內輸入 `<script>alert('hello')</script>`，而網頁就會執行 alert 效果。

解決方法：利用 php 內建函式 htmlspecialchars( ) ，把文字經過處理在顯示，而為了避免有漏洞任何使用者能自由輸入地方都應當加入函式跳脫。
## 請說明 CSRF 的攻擊原理以及防範方法
CSRF 全名是 Cross Site Request Forgery，跨站請求偽造，大部分的網站應用都是採用 cookie 或 session 的方式進行登入驗證，而 CSRF 就是透過這樣驗證機制，偽造出使用者本人發出的 request ，進而達到攻擊目的

解決方法：
* 加上圖形驗證碼、簡訊驗證碼

* 加上 CSRF Token  
CSRF Token，由 server 產生，並且加密存在 session 中的，其他人無法仿造，只有透過 server 給使用者，並在一定時間內更換，當使用者想做任事件時，server 便會請求提供 CSRF Token，如果不能提供，那server就不予理會。  
但攻擊可也可能透過 cross origin 的 request 獲取到 CSRF Token。

* Double Submit Cookie  
伺服器端產生一個 token 存放在 cookie 中，server 再比對 cookie 內的 CSRF token 與 form 內是否符合，就知道是不是使用者發的了。  
但攻擊者如果掌握了你底下任何一個 subdomain，就可以偽造 cookie。

* SameSite cookie  
在 Cookie 中加入 SameSite，這時 cookie 只有在同網域的生效，任何跨站請求時，都無法從中取得 Cookie。


[參考文章-讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)