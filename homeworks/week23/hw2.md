## 為什麼我們需要 Redux？
Redux 能幫助我們管理 state，在較為複雜的專案中 state 可能散落在不同頁面中，有時候就會遇到多個頁面或是元件需要共用同一份資料，一旦修改其中一份資料，其他頁面也需要同步修改更新，而為了保持資料的一致性，透過 Redux 把 state 資料集中再一起，修改更新都在同一個地方，讓我們能更有效率的管理及維護。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
Redux 可以幫助我們把全部元件資料集中存放在一起，當元件需要用到某些資料時再從中取得。
主要由 Action 、 Reducer 、 Store 組成。  
* Action - 是 store 唯一的資訊來源，藉由 store.dispatch() 來把資料傳遞到 store。
* Reducer - 負責處理，用來接收當前的 state 與 action，並在需要的時候可以更新 state 的狀態。
* Store - 儲存 state 狀態的地方，改變 state 的唯一的方式是發出一個 action

以存錢為例：   
1. 定義 Action - 
  假設今天想要存入 10 元，按下按鈕後會發出一個 type 為 'DEPOSIT' 金額為 10 的請求。
  ``` js
  store.dispatch({
    type: 'DEPOSIT',
    amount: 10
})
  ```
2. 定義 Reducer - 
  而 Reducer 會根據 state 內的初始金額及接收到的 type 做出相對應處理。
``` js
function reducer(state = 0, action) {
  switch(action.type) {
    // type 為 'DEPOSIT'，回傳當前的金額加上存入的金額
    case 'DEPOSIT':
      return state + action.mount
  }
}
```
3. 建立 Store
透過 createStore 將定義好的 Reducer 傳入作為第一個參數來建立 Store
``` js
const store = createStore(reducer)
```
  
[參考資料](https://max80713.medium.com/redux-%E7%B0%A1%E4%BB%8B-%E4%B8%8A-%E4%BD%BF%E7%94%A8-redux-%E5%AF%A6%E4%BD%9C%E5%AD%98%E9%8C%A2%E7%AD%92%E5%8A%9F%E8%83%BD-dd761d8a62e8)

## 該怎麼把 React 跟 Redux 串起來？
可以透過官方提供的 React-Redux 套件來整合 React 和 Redux。  
而 React-Redux 有兩種版本 Hooks 及 Connect，Hooks 方法是利用 useSelector 從 Store 中將 Component 需要的 State 取出，再利用 useDispatch 操作 Reducer。  
Connect 則是利用 connext( ) 函式，而函式中會有兩個參數，第一個參數 mapStateToProps 透過他可以獲取 store 資料，另一個 mapDispatchToProps 可以獲取 dispatch 將 action 傳給 reducer ，
