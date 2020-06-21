function join(arr, concatStr) {
    var newStr = arr[0]
    for (var i = 1; i < arr.length; i++) {
        newStr += concatStr + arr[i]
    }
    return newStr
}

function repeat(str, times) {
    var newStr = ''
    for (var i = 0; i < times; i++) {
        newStr += str
    }
    return newStr
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));