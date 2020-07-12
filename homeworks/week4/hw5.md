### 請以自己的話解釋 API 是什麼
API 全名為 Application Programming Interface，中文叫應用程式介面。  
工程師能透過它快速取得資料。  
就好像是一台販賣機，而機器面板上的按鈕就是 API，按下就能獲取商品，而這樣情況下，產品就沒有客製化，只有面板上的選擇。

以販賣機為例，獲取資料過程就像：
* 今天想喝雪碧 => 我想要使用者資料
* 找到對應按鈕，按下 => 找到對應窗口，發出需求
* 拿到飲料 => 取得資料
* 想要飲料沒在飲料機上 => 資料沒有對外開放
### 請找出三個課程沒教的 HTTP status code 並簡單介紹
**451** Unavailable For Legal Reasons  
用戶端請求違法的資源，例如受政府審查的網頁。  

**415** Unsupported Media Type  
被請求資源的多媒體類型不被伺服器支援，因此該請求被拒絕。  

**505** HTTP Version Not Supported  
請求使用的 HTTP 版本不被伺服器支援。  

### 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL： https://api.allyoucaneat.tw
|說明|Method|Path|參數|範例|
|----|----|----|----|----|
|所有餐廳資料|GET|/restaurants|無|/restaurants|
|單一餐廳資料|GET|/restaurants/name|無|/restaurants/KFC|
|新增餐廳|POST|/restaurants|name:店名, phone:電話|/restaurants|
|刪除餐廳|DELETE|/restaurants/:id|無|/restaurants/10|
|更改餐廳|PATCH|/restaurants/:id|name:店名, phone:電話|/restaurants/10|

資料格式：JSON，以**所有餐廳資料**為例

```
[
    {
        "name": "肯德基",
        "phone": "12345678"
    },
    {
        "name": "麥當勞",
        "phone": "22345678"
    },
    {
        "name": "漢堡王",
        "phone": "32345678"
    },
    {
        "name": "摩斯漢堡",
        "phone": "42345678"
    },
    {
        "name": "頂呱呱",
        "phone": "52345678"
    },
    {
        "name": "丹丹漢堡",
        "phone": "62345678"
    }
]
```
