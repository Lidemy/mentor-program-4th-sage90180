## hw3：Hoisting
```js
                    // global EC => global VO { fn: func, a: undefined }  
var a = 1           // global EC => global VO { fn: func, a: 1 }  
function fn(){      // fn EC => fn AO { fn2: func, a: undedind }
  console.log(a)    // 因為 a 在函式內被再次宣告，會被 Hoisting 此時 a = undedind，印出 undedind
  var a = 5         // fn EC => fn AO { fn2: func, a: 5 }
  console.log(a)    // fn EC => fn AO { fn2: func, a: 5 } a = 5，印出 5
  a++               // fn EC => fn AO { fn2: func, a: 6 }
  var a             // fn EC => fn AO { fn2: func, a: 6 }
  fn2()             
  console.log(a)    // fn EC => fn AO { fn2: func, a: 20 } a = 20，印出 20
  function fn2(){   // fn2 EC => fn2 AO { }
    console.log(a)  // fn2 EC => fn2 AO { } 要找 a，但因為是空的，
                    // 所以往上一層 fn EC => fn AO { fn2: func, a: 6 } 找到 a = 6，印出 6
                    
    a = 20          // fn2 EC => fn2 AO { } 要找 a，但因為是空的，所以往上一層 fn AO 找，
                    // 找到 a 後把 a = 20 放進去，fn EC => fn AO { fn2: func, a: 20 }
                    
    b = 100         // fn2 EC => fn2 AO { } 要找 b，但因為是空的，
                    // 所以往上一層 fn AO 找，fn AO 也沒有再往上一層找 global VO，global VO 也沒有，
                    // 所以自動把 b 設為全域變數 global EC => global VO { fn: func, a: 1 , b: 100}  
  }
}
fn()                // 執行 fn()
console.log(a)      // global EC => global VO { fn: func, a: 1 , b: 100} a = 1，印出 1
a = 10              // global EC => global VO { fn: func, a: 10 , b: 100}
console.log(a)      // global EC => global VO { fn: func, a: 10 , b: 100} a = 10，印出 10
console.log(b)      // global EC => global VO { fn: func, a: 10 , b: 100} b = 100，印出 100
```
 輸出結果
``` js
undefined
5
6
20
1
10
100
```