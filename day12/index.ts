import { readFileSync } from 'fs';


const file = readFileSync('day12/input.txt', 'utf-8');

function part1(){

    const lines = file.split('\n');
    let sum: number = 0;

    lines.forEach(line => {
        
        const numOfDamaged: number[] = line.split(' ')[1].trim().split(',').map((num) => parseInt(num));
        const symbols: string[] = line.split(' ')[0].trim().split('');
        console.log('Starting line: ' + symbols.join(''));
        sum += generate_and_count(symbols, numOfDamaged, 0);
        console.log('Sum: ' + sum);
    });
    console.log(sum);
}

function generate_and_count(symbols: string[], numOfDamaged: number[], index: number): number {

    if (index === symbols.length) {
        const newLine = symbols.join('');
        if(isValidCombo(newLine, numOfDamaged)){
            return 1;
        } else {
            return 0;
        }
     }

     let count = 0;

     switch (symbols[index]) {
         case '?':
             let newSymbols = symbols.slice();
             newSymbols[index] = '#';
             count += generate_and_count(newSymbols, numOfDamaged, index + 1);
             
             newSymbols[index] = '.';
             count += generate_and_count(newSymbols, numOfDamaged, index + 1);

             break;
         default:
             count += generate_and_count(symbols, numOfDamaged, index + 1);
             break;
     }

     return count;
}

function isValidCombo(newLine: string, numbers: number[]): boolean {

    let valid: boolean = true;
    let index = 0;
    let count = 0;

    // check if at least numbers amount of # is present
    newLine.split('').forEach(symbol => {
        if(symbol === '#') count++;
    });

    // sum of all numbers in numbers
    let s = 0;
    numbers.forEach(num => {
        s += num;
    });

    if(count !== s) return false;

    numbers.forEach(num => {
        if (!valid) return;

           const i: number = findFirstDamaged(newLine, index);
           if(i === -1){
               valid = false;
               return;
           }

            // check that num amount of # appear next to each other in the line
            for(let j = i + 1; j < i+num; j++){
                if(newLine.charAt(j) != '#'){
                    valid = false;
                    return;
                }
            }

            // needs to be followed by . or end of line to be valid
            if(newLine.charAt(i + num) === '#'){
                valid = false;
                return;
            }
        
            index = i + num;
    });

    return valid;
}

function findFirstDamaged(line: string, index: number){
    for(let i = index; i < line.length; i++){
        if(line.charAt(i) === '#') return i;
    }
    return -1;
}

function part2(){
    const lines = file.split('\n');
    let sum: number = 0;

    lines.forEach(line => {
        const numOfDamagedPreExpansion: number[] = line.split(' ')[1].trim().split(',').map((num) => parseInt(num));
        const symbolsPreExpansion: string[] = line.split(' ')[0].trim().split('');

        // after expansion
        const numOfDamaged: number[] = [];
        const symbols: string[] = [];

        // for each number in numOfDamagedPreExpansion add it to numOfDamaged 5 times
        for(let i = 0; i < 5; i++){
            numOfDamagedPreExpansion.forEach(num => {
                numOfDamaged.push(num);
            });
        }


        // for each symbol in symbolsPreExpansion add it to symbols 5 times
        for(let i = 0; i < 5; i++){
            symbolsPreExpansion.forEach(symbol => {
                symbols.push(symbol);
            });
            if(i != 4) symbols.push('?');
        }


        console.log('Starting line: ' + symbols.join(''));
        sum += generate_and_count(symbols, numOfDamaged, 0);
        console.log('Sum: ' + sum);
    });
    console.log(sum);
}

part1();
//part2();