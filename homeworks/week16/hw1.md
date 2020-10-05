## hw1：Event Loop
``` js
console.log(1)        // 放入 Call Stack 並直接執行，印出 1，執行完後移除
setTimeout(() => {    // setTimeout() 放到 Webapis 執行，直到倒數完畢，
  console.log(2)      // () => { console.log(2) } 被放到 Callback Queue 待命
}, 0)
console.log(3)        // 放入 Call Stack 並直接執行，印出 3，執行完後移除
setTimeout(() => {    // setTimeout() 放到 Webapis 執行，直到倒數完畢，
  console.log(4)      // () => { console.log(4) } 被放到 Callback Queue 待命
}, 0)
console.log(5)        // 放入 Call Stack 並直接執行，印出 5，執行完後移除
                      // Call Stack 清空後，處理 Callback Queue 裡的任務
                      // 找到排最前面的 () => { console.log(2) } 放入 Call Stack 執行，
                      // 再執行 console.log(2)，印出 2，執行完後移除
                      // 接著 () => { console.log(4) } 放入 Call Stack 執行，
                      // 再執行 console.log(4)，印出 4，執行完後移除
                      // call stack 再度清空，程式執行結束。
```
輸出結果：
```
1
3
5
2
4
```