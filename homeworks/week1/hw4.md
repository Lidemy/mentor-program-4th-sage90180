## 為什麼要使用Git
Git 是一個可以幫你有效管理檔案的軟體，只要是用電腦使用者，可能就會遇到需要新增、編輯或修改檔案的情況，通常這時候我們可能就是開個資料夾，把檔案放進去，當檔案被修正時，就在檔名結尾按照順序給予編號，而這樣的「版本控制」過程，就可以透過 Git 更有效率及明確的管理，Git 可以清楚的記錄每個檔案修改資訊，是誰在什麼時候加進來，又是什麼時候被修改或刪除。

## 那要如何操作 Git 呢？
### 首先透過 Terminal 安裝 Git 步驟：
1. 安裝Homebrew：
    ```
    /bin/bash -c "$(curl -fsSLhttps://raw.githubusercontent.com/Homwbrew/install/master/instakk.sh)"

    # 可以透過 brew --version 指令確認有沒有安裝成功。
    ```
2. 安裝 Git　指令　
    ```
    brew install git

    # 可以透過 git --version 指令確認有沒有安裝成功。
    ```
3. 設定 Git 使用者名稱和信箱
    ```
    git config --global user.name "your name" 
    git config --global user.email "your email"

    # 可以透過 git config --list 指令確認資料。
    ```
### 開始操作 Git
- 修改檔案
    1. 在要版本控制的資料夾下 輸入 `git init` 指令，建立一個 Git 儲存庫
    2. 修改你要的檔案
    3. 不清楚狀態下都可以透過 `git status` 確認目前 Git 的狀態
    4. 把版本加入 Git `git add 檔名` 也可以用 `git add .` 全部加進去，此時只是放進暫存區而已
    5. `git commit -m "說明"` 正式發佈
    6. 檢視 commit 紀錄 `git log`
        
- 其它指令
    1. `git rm 檔名` 刪除檔案
    2. `git mv 檔名 新檔名` 更改檔名
    3. `touch .gitignore` 先建立檔案，再來把要忽略檔案加入 `vim .gitignore` 
    4. `git diff` 查看修改內容
        
- 兩人以上同時修改時
    1. `git branch 分支名` 創建新分支
    2. `git checkout 分支名` 切換分支
    3. `git branch -v` 查看分支狀態
    4. `git branch -d 分支名` 刪除 branch
    5. `git merge 名稱` 合併分支，不能在要被合併的分支下執行

[參考資料 - Git與GitHub介紹，軟體版本控制基本教學](https://tw.alphacamp.co/blog/git-github-version-control-guide)    