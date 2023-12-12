import { readFileSync } from 'fs';


const file = readFileSync('day12/input.txt', 'utf-8');

function part1(){

    const lines = file.split('\n');
    let sum: number = 0;

    lines.forEach(line => {
        const numOfDamaged: number[] = line.split(' ')[1].trim().split(',').map((num) => parseInt(num));
        var validSymbols = ['#', '.'];
        const symbols: string[] = line.split(' ')[0].trim().split('');
        const unknownsLength: number = symbols.filter((symbol) => symbol === '?').length;
        let winningsCount: number = 0;
        let perms: string[] = validSymbols;
        
        for(let i = 0; i < unknownsLength-1; i++){
            perms = perms.flatMap(d => validSymbols.map(v => d + v));
        }
        
        // replace every unknown with each permutation and check if it is valid
        perms.forEach(perm => {
            let tempLine = line;
            for(let i = 0; i < unknownsLength; i++){
                tempLine = tempLine.replace('?', perm.charAt(i));
            }
            if(isValidCombo(tempLine, numOfDamaged)){
                winningsCount++;
            }
        });
        sum += winningsCount;
    });
    console.log(sum);
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

//part1();