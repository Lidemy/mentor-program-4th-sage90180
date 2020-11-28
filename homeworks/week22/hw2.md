## 請列出 React 內建的所有 hook，並大概講解功能是什麼
* useState  
  `const [state, setState] = useState(initialState)`  
  設定 state 的值，並透過 setState function 接收新的 state 並更新。  
  在首次 render 時，回傳的 state 的值會跟設定在 useState(initialState) 地方的值一樣。  

* useEffect  
  useEffect 的預設行為是在每次完成 render 後觸發，但如果不想每次都改變話，可以透過第二參數告知，當 dependencies 改變時，我才要再重新執行 function 裡的動作。

* useContext   
  可以解決 prop drilling 問題，避免傳遞 props 時，每一層的 component 都要個別寫上 props，只要父層 component 提供 props，底下的 component 都可以使用。

* useReducer  
  與 useEffect 類似，但可以做出更複雜的行為，將定義好的 initialState 和 reducer 帶入，在根據不同的 dispatch 更新 state。
* useCallback  
  用法和 useEffect 有點像，在第二個參數傳入 dependencies，當那些 dependencies 沒有變時，那這個第一個參數裡的 function 不會改變。
* useMemo  
  讓 React 記住 function 的回傳值，useMemo 只會在 dependencies 改變時才重新計算記憶位置，這樣就不會在每次重新渲染時都執行一次元件的 function。
* useRef  
  建立並回傳一個帶有 current 屬性的物件，渲染後不被影響，扔然可以取得同一個物件，並取出內部的值來用。
* useImperativeHandle  
  將 children component 的某些函式透過 ref 的方式 開放給 parent 呼叫
* useLayoutEffect  
  在畫面渲染前想執行的事，寫進去裡面就對了
* useDebugValue  
  用來在 React DevTools 中顯示自訂義 hook 的標籤

[資料來源 - React 官網](https://zh-hant.reactjs.org/docs/hooks-reference.html)
## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
 React component 生命週期，大致上可以分為：Mounting、Updateing、Unmounting 三個階段
 * `Mounting` - 當一個 component 的 instance 被建立且加入 DOM 中時，其生命週期將會依照下列的順序呼叫這些方法：
    * constructor() - 初始化，會在 component 建立時之前就被呼叫。
    * static getDerivedStateFromProps() - 會在一個 component 被 render 前被呼叫，不管是在首次 mount 時或後續的更新時。
    * render() - 渲染畫面
    * componentDidMoun() - 在一個 component 被 constructor() 執行，且執行 render() 之後會馬上被呼叫。
 * `Updateing` - 當 prop 或 state 有變化時，就會產生更新。當一個 component 被重新 render 時，其生命週期將會依照下列的順序呼叫這些方法：
    * static getDerivedStateFromProps() - 會在一個 component 被 render 前被呼叫，不管是在首次 mount 時或後續的更新時。
    * shouldComponentUpdate() - 會回傳一個 Boolean，會在接收到新的 props 或 state 時被呼叫。
    * render() - 渲染畫面
    * getSnapshotBeforeUpdate() - 會在最近一次 render 的 output 被提交給 DOM 時被呼叫。
    * componentDidUpdate() - 會在更新後馬上被呼叫，但這個方法並不會在初次 render 時被呼叫。
 * `Unmounting` - 當一個 component 被從 DOM 中移除時，這個方法將會被呼叫：
   * componentWillUnmount() - component 被移除時，就會呼叫這個 function
  
[資料來源 - React 官網](https://zh-hant.reactjs.org/docs/react-component.html#constructor) 
[資料來源 - React Lifecycle ](https://www.w3schools.com/react/react_lifecycle.asp)
## 請問 class component 與 function component 的差別是什麼？
* Class component
    * 要使用 state 必須定義一個 state 物件，而要修改 state 必須透過 setState 這個內建函式，當 state 的函式當作 props 傳下去，必須要另外定義一個函式把 setState 包在裡面再傳給子元件。
    * 有 this
    * 每次都可以拿到最新的 this.props，因為this隨時都在變化。


* Function component
    * 一個 state 定義一個變數與一個涵式，可透過涵式直接操控。
    * 可以用 arrow function 宣告或是一般的 function
    * 沒有 this
    * 編譯更快，程式碼簡潔

[參考文章 - 函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)
## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
controlled 的 state 是由 React控制，而 uncontrolled 是由 DOM 處理，而不是 React 元件。

controlled 以 input 為例：
``` js
// 先導入 useState
import React, { useState } from 'react';

// 建立 value ， 再藉由 setValue 操作 ， ()內設定初始值
const [ value , setValue ] = useState('')

// setValue 會把輸入的內容更新到 React 內的資料狀態
const handleChange = (e) => {
  setValue(e.target.value);
};

// 設定 input 的 value = value，onChange 內執行 handleChange
<inpuet 
  value={value} 
  onChange={handleChange} 
/>

```