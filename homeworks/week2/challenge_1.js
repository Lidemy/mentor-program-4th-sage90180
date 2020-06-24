// 思路：
// 中間數當基準，判斷大小，往左或往右找
// 找到最後中間數就是解答

function search(arr, n) {
    let start = 0
    let end = arr.length - 1
    let middle
    while (start <= end) {
        middle = Math.floor((start + end) / 2)
        if (arr[middle] === n) {
            return middle
        } else if (arr[middle] > n) {
            end = middle - 1
        } else {
            start = middle + 1
        }
    }
    return -1
}

console.log("[1, 2, 3, 10, 14, 39, 41, 42, 50]")
console.log("search：1 index："+ search([1, 2, 3, 10, 14, 39, 41, 42, 50], 1))
console.log("search：4 index："+ search([1, 2, 3, 10, 14, 39, 41, 42, 50], 4))
console.log("search：14 index："+ search([1, 2, 3, 10, 14, 39, 41, 42, 50], 14))
console.log("search：42 index："+ search([1, 2, 3, 10, 14, 39, 41, 42, 50], 42))