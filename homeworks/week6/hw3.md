### 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
* ```span```  
具有 inline 特性，方便小區塊修改，例如：文章中標註文字顏色、修改文字大小時，都可以把內容獨立出來。
* ```b```   
粗字體，字體自帶 bold 效果
* ```hr```   
分隔線，可透過 style 屬性更改樣式
``` css
hr {
    height: 1px;
    border: none;
    border-top: 1px dashed black
}
```

### 請問什麼是盒模型（box modal）
每個元素就像是個盒子，而這盒子除了本身的寬高，還包含 padding、border 及 margin 屬性，這些都會影響到整體寬高。  
例如:
``` css
.box {
    width: 100px;
    height: 100px;
    padding: 10px;
    margin: 5px;
    border: solid 5px black;
    background: blue
}
```
![](https://i.imgur.com/jy6KKV2.png)

### 請問 display: inline, block 跟 inline-block 的差別是什麼？
* ```block```  
直的排列，但會占滿一整行，可以設定 width 及 height。
* ```inline```  
橫的排列，無法設定 width 及 height，只顯示元素本身大小，但可以使用 padding 撐大。
* ```inline-block```  
橫的排列，結合 block 及 inline 特性，既可以並排又可以修改大小。

### 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* ```static```　  
是預設值，依照瀏覽器預設的配置自動排版在頁面上

* ```relative```　  
有點像是 static 進階版，可以設定 top、right、bottom 和 left 屬性，設定 relative 像是在一個排序隊伍中放了一張椅子佔有位置，就算跑走了位子還是在，後面元素無法插隊，也不會影響後面元素。

* ```absolute```　  
依照上層位置給予相對定位，如果沒有上層就是依照 body 定位，可以設定 top 、right、bottom 和 left 屬性，設定 absolute 後，就不算在隊伍中了，在他後面元素會直接遞補向前，移動的話也不會影響其它元素。

* ```fixed```　  
自我意識最強的一個排列方式，別人排隊但他可以自由移動，不會受到任何元素限制，可定位在視窗任何地方，捲動時也不會亂跑，設定屬性有 top、right、bottom 和 left 。