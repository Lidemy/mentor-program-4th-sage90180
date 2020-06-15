## 交作業流程
1. 建立並切換 branch：`git checkout -b week1`
2. 在當週對應檔案夾內寫作業
3. commit 檔案： `git commit -am '註釋'`
4. push 到 githug： `git push origin week1`
5. githug 上請求 merge：
    * 點選 Pull requests 選單
    * Compare & pull request / New pull request
    * 確認合併檔案 base：master <- compare：week1
    * Creat pull request
6. 繳交：把 Pull requests 連結複製到學習系統繳交
7. 確定作業被批改後更新本地檔案： 
    * `git checkout master`
    * `git pull origin master`
8. 刪除 branch： `git branch -d week1 `
