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
  if (Number(j) === 1) {
    // eslint-disable-next-line no-undef
    return BigInt(a) > BigInt(b) ? 'A' : 'B';
  }
  if (Number(j) === -1) {
    // eslint-disable-next-line no-undef
    return BigInt(a) > BigInt(b) ? 'B' : 'A';
  }
  return false;
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
