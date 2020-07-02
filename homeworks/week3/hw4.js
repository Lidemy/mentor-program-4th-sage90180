const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(line) {
  const str = line[0];
  console.log(str.split('').reverse().join('') === str ? 'True' : 'False');
}

rl.on('close', () => {
  solve(lines);
});
