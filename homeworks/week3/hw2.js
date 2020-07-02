const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

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

rl.on('close', () => {
  solve(lines);
});
