## hw4：What is this?
```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner            
const hello = obj.inner.hello
obj.inner.hello()             // => obj.inner.hello.call(obj.inner) 
                              // 是 obj.inner 呼叫 hello 的，所以 this.value 印出來是 2

obj2.hello()                  // => obj2.hello.call(obj2) 是 obj2 呼叫 hello 的，
                              // 而 obj2 = obj.inner，所以 this.value 印出來是 2
                              
hello()                       // 沒有本身就叫 hello 的 function 因此印出 undefined
```
輸出結果
```
2
2
undefined
```