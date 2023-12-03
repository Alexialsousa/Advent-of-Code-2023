import { readFileSync } from 'fs';

function part1() {
  const file = readFileSync('day1/input.txt', 'utf-8');
  function findFirstDigit(line: string): string {
    var digit = line.match(/\d/);
    if (digit === null) {
      return '0';
    }
    return digit.toString();
  }

  let sum: number = 0;

  file.split('\n').forEach((line) => {
    const first: string = findFirstDigit(line);
    const reverseLine: string = line.split('').reverse().join('');
    const last: string = findFirstDigit(reverseLine);
    const lineNumberAsString: string = first + last;
    sum += parseInt(lineNumberAsString);
  });

  console.log('Part1: ' + sum);
}

function part2() {
  const file = readFileSync('day1/input.txt', 'utf-8');
  
  const numberMapping = new Map();
  numberMapping.set('one', 'o1e');
  numberMapping.set('two', 't2o');
  numberMapping.set('three', 't3e');
  numberMapping.set('four', 'f4r');
  numberMapping.set('five', 'f5e');
  numberMapping.set('six', 's6x');
  numberMapping.set('seven', 's7n');
  numberMapping.set('eight', 'e8t');
  numberMapping.set('nine', 'n9e');
  
  let sum2: number = 0;
  
  function findFirstDigit(line: string): string {
      var digit = line.match(/\d/);
      if (digit === null) {
        return '0';
      }
      return digit.toString();
  }
  
  file.split('\n').forEach((line) => {
    numberMapping.forEach((key, value) => {
      do {
          line = line.replace(value, key).trim();
      } while (line.includes(value));
  });
  
    const first: string = findFirstDigit(line);
    const reverseLine: string = line.split('').reverse().join('');
    const last: string = findFirstDigit(reverseLine);
    const lineNumberAsString: string = first + last;
    sum2 += parseInt(lineNumberAsString);
  });
  
  
  console.log('Part2: ' + sum2);
}

// part1();
part2();