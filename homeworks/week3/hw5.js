/* eslint-disable no-param-reassign */
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

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

rl.on('close', () => {
  solve(lines);
});
