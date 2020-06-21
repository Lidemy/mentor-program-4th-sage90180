  // 思路：
  // 算式要由個位數開始加減，確保每個數字都要被算到
  // 建立進位容器，只要有 11 或 10 要進位，而進位後要刪除
  // 只有算到最後一位才有可能同時三個 1，所以這時進位容器有 1 情況下要加回去 


  // debugger
  function add(a, b) {
      a = a.toString(2).split("").reverse()
      b = b.toString(2).split("").reverse()
      var length = length()
      var carry = []
      var newStr = []
      function length() {
          if (a.length > b.length) {
              return a.length
          } else {
              return b.length
          }
      }
      // 開始判斷，結果傳到 newStr
      // 這邊為了要迴圈用了 + 號 XD 但我想不到其他方法了

      for (var i = 0; i < length; i++) {
          // 把最嚴格的判斷放在最前面，避免判斷不完全
          if (a[i] == 1 && b[i] == 1 && carry[0] == 1) {
              newStr.push(1)
              // a、b 是 1 情況
          } else if (a[i] == 1 && b[i] == 1) {
              newStr.push(0)
              carry.push("1")
              // 進位有 1 加 a、b 其中一個是 1 情況，要進位加 1 但 同時也用掉進位，故省略
          } else if (carry.length > 0 && a[i] == 1 || carry.length > 0 && b[i] == 1) {
              newStr.push(0)
              // 進位有 1 加 a、b 是 0 情況
          } else if (carry.length > 0) {
              newStr.push(a[i] ^ b[i] ^ carry[0])
              carry.pop()
              // 上情況都不適用後，自動判斷 a、b、進位 是 0 或 1
          } else {
              newStr.push(a[i] ^ b[i] ^ carry[i])
          }
      }
      // 還有進位要加1
      if (carry.length > 0) {
          newStr.push(1)
      }
      // 把數字顛倒回來
      return parseInt(newStr.reverse().join(''), 2)
  }

  console.log("11 + 223456789 = " + add(11, 223456789))
  console.log("123 + 123 = " + add(123, 123))
  console.log("888 + 999 = " + add(888, 999))
  console.log("0 + 0 = " + add(0, 0))