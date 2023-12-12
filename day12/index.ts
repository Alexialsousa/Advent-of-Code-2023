import { readFileSync } from 'fs';


const file = readFileSync('day12/input.txt', 'utf-8');

function part1(){

    const lines = file.split('\n');
    let sum: number = 0;

    lines.forEach(line => {
        const numOfDamaged: number[] = line.split(' ')[1].trim().split(',').map((num) => parseInt(num));
        var validSymbols = ['#', '.'];
        const symbols: string[] = line.split(' ')[0].trim().split('');

        sum += generate_and_count(symbols, numOfDamaged, 0);
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

    if(index < newLine.length){
        for(let i = index; i < newLine.length; i++){
            if(newLine.charAt(i) === '#'){
                valid = false;
            }
        }
    }

    return valid;
}

function findFirstDamaged(line: string, index: number){
    for(let i = index; i < line.length; i++){
        if(line.charAt(i) === '#') return i;
    }
    return -1;
}

function part2(){

}

part1();
//part2();