寫這五題反覆修正幾次，過程中也不斷提醒自己：不會變用 const 會變用 let，把大問題拆成小問題，寫成可以重複利用的函式，最後在不知道是第幾次的 reject 後才順利通過 :D

## hw1：好多星星
偷懶直接用 repeat 內建函式 XD
```js
function solve(num) {
  const n = num[0];
  for (let i = 1; i <= n; i += 1) {
    console.log('*'.repeat(i));
  }
}
```

## hw2：水仙花數
思路：
利用迴圈讓每個字都被計算，
再把每個數字轉成字串就可以知道要乘多少次方，及各個位數的數字，
在使用迴圈計算數字乘上次方後的合，
最後再進行判斷是否為水仙花數。

遇到問題：
卡在要怎麼讓數字乘上正確的次方很久，後來看了 ALG101 才發現有 ** 這個功能。
``` js
function isNarcissistic(n) {
  const str = n.toString();
  const digit = str.length;
  let sum = 0;
  for (let i = 0; i < digit; i += 1) {
    sum += Number(str[i]) ** digit;
  }
  if (sum === n) {
    return true;
  }
  return false;
}

function solve(n) {
  const str = n[0].split(' ');
  for (let i = Number(str[0]); i <= Number(str[1]); i += 1) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}
```


## hw3：判斷質數
思路：
利用迴圈讓每個字都能被計算到，
判斷每個數字，從 2 開始，看看會不會被整除，不會除數就 +1 直到被除數前一位數。

遇到問題：
我就是那個把全部程式碼寫在一起的人，後來看了自我檢討，才把 function 獨立出來。
``` js
function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(num) {
  for (let i = 1; i < num.length; i += 1) {
    console.log(isPrime(Number(num[i])) ? 'Prime' : 'Composite');
  }
}

```
## hw4：判斷迴文
之前有練習過類似題目，這次就用新學到的內建函式套用XD，再加上不熟悉的三元判斷式。
```JS
function solve(line) {
  const str = line[0];
  console.log(str.split('').reverse().join('') === str ? 'True' : 'False');
}
```
## hw5：聯誼順序比大小
思路：
第一版 -> 相同條件先寫出來，再依照比大比小，再把要回傳的結果個別寫在比大或比小的判斷裡。
第二版 -> 相同條件先寫出來，用範例方式，如果是 -1 就顛倒 a b，再把數字拆成字串，利用迴圈一個一個比對數字大小。
第三版 -> 精簡成用字典序比對大小。

遇到問題：
一直無法 AC，然後看了 spectrum 上的討論，知道有 BigInt() 可以用，後來也順利 AC 了。
但在自我檢討中說盡量別用 BigInt()，所以又把答案修正一下，變成比對字串方式，但檢討中提到字典序，查了一下資料後，又再修正更精簡一點。

訂正時對於自我檢測中提到的，把 A B 對調這方法想了很久才想通，一直轉不過來，console.log()後才懂。


``` JS
function compare(a, b, j) {
  if (a === b) return 'DRAW';
  if (Number(j) === -1) {
    const t = a;
    a = b;
    b = t;
  }

  const strA = a.toString();
  const strB = b.toString();

  if (strA.length !== strB.length) {
    return strA.length > strB.length ? 'A' : 'B';
  }
  return a > b ? 'A' : 'B';
}

function solve(line) {
  const n = Number(line[0]);
  for (let i = 1; i <= n; i += 1) {
    const [a, b, j] = line[i].split(' ');
    console.log(compare(a, b, j));
  }
}
```
