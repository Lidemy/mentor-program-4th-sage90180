## hw2：Event Loop + Scope
``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
輸出結果：
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
1. 迴圈開始放入 Call Stack ，宣告變數 i ， i = 0，判斷是否小於 5，執行`console.log('i: ' + i)`印出 `i: 0`，執行完後移除
2. `setTimeout()` 放到 Webapis 執行，過了至少 0 * 1000 ms 後，`() => {console.log(i)}` 被放到 Callback Queue 待命。
3. i + 1，進入下個迴圈
4. i = 1，判斷是否小於 5，執行`console.log('i: ' + i)`，印出 `i: 1`，執行完後移除
5. `setTimeout()` 放到 Webapis 執行，過了至少 1 * 1000 ms 後，`() => {console.log(i)}` 被放到 Callback Queue 待命。
6. i + 1，進入下個迴圈
7. i = 2，判斷是否小於 5，執行`console.log('i: ' + i)`，印出 `i: 2`，執行完後移除
8. `setTimeout()` 放到 Webapis 執行，過了至少 2 * 1000 ms 後，`() => {console.log(i)}` 被放到 Callback Queue 待命。
9. i + 1，進入下個迴圈
10. i = 3，判斷是否小於 5，執行`console.log('i: ' + i)`，印出 `i: 3`，執行完後移除
11. `setTimeout()` 放到 Webapis 執行，過了至少 3 * 1000 ms 後，`() => {console.log(i)}` 被放到 Callback Queue 待命。
12. i + 1，進入下個迴圈
13. i = 4，判斷是否小於 5，執行`console.log('i: ' + i)`，印出 `i: 4`，執行完後移除
14. `setTimeout()` 放到 Webapis 執行，過了至少 4 * 1000 ms 後，`() => {console.log(i)}` 被放到 Callback Queue 待命。
15. i + 1，進入下個迴圈
16. i = 5，，判斷是否小於 5，不成立，跳出迴圈
17. 開始執行 Callback Queue 裡的任務
18. 此時變數 i = 5，`function` 執行完換 `console.log(i)`放入 Call Stack 執行，印出 `5`，執行完後移除
19. 第二個`function` 執行完換 `console.log(i)`放入 Call Stack 執行，印出 `5`，執行完後移除
20. 第三個`function` 執行完換 `console.log(i)`放入 Call Stack 執行，印出 `5`，執行完後移除
21. 第四個`function` 執行完換 `console.log(i)`放入 Call Stack 執行，印出 `5`，執行完後移除
22. 第五個`function` 執行完換 `console.log(i)`放入 Call Stack 執行，印出 `5`，執行完後移除
8. call stack 再度清空，程式執行結束。

