## 什麼是反向代理（Reverse proxy）？
一般發送 Request 是直接由 Client 至 Server  
Client -----> Server

而反向代理時，Client 發送的 Request 會經由代理伺服器再轉發至不同 Server，這樣就可以跑不同網頁，且都有各自的網址。  
Client -----> Reverse Proxy Server -----> 多個不同 Server

## 什麼是 ORM？

ORM(Object Relational Mapping)物件-關係對映，使用物件方式操作資料庫，操作物件時資料庫就會跟著改動。

## 什麼是 N+1 problem？
N+1 problem 是在 ORM 中會遇到的問題，以部落格為例：系統中有 5 個使用者，每個用戶各有 1 篇文章，當我們要顯示：文章標題及作者名時，每次循環都要查詢一次 user，最終執行 5 + 1 次，這樣如果使用者多了就會導致效率變低，因為每一次查詢都要進入資料庫搜尋，而這問題可以使用 include 關聯方式來解決。
