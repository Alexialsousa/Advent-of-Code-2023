import { readFileSync } from 'fs';

const file = readFileSync('day1/input.txt', 'utf-8');
let sum: number = 0;

function findFirstDigit(line: string): string {
  var digit = line.match(/\d/);
  if (digit === null) {
    return '0';
  }
  return digit.toString();
}

file.split('\n').forEach((line) => {
  const first: string = findFirstDigit(line);
  const reverseLine: string = line.split('').reverse().join('');
  const last: string = findFirstDigit(reverseLine);
  const lineNumberAsString: string = first + last;
  sum += parseInt(lineNumberAsString);
});

console.log(sum);
