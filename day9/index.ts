import { readFileSync } from 'fs';


const file = readFileSync('day9/input.txt', 'utf-8');

function findNextLine(firstLine: number[]){
    let secondLine: number[] = [];
    for(let i = 0; i < firstLine.length-1; i++){
        secondLine.push(firstLine[i+1] - firstLine[i]);
    }
    return secondLine;

}

function part1(){

    const lines = file.split('\n');
    let firstLine: number[] = [];
    let map: Map<number, number[]>;
    let rowCount: number;
    let answer = 0;

    lines.forEach(line => {
        rowCount = 0;
        map = new Map();
        firstLine = line.split(' ').map(n => parseInt(n));
        map.set(rowCount++, firstLine);

        // fill in map
        while(!(firstLine.every(n => n == 0))){
            firstLine = findNextLine(firstLine);
            map.set(rowCount++, firstLine);
        }

        // fill in palceholders
        for (let i = rowCount-1 ; i > 0; i--){
            const lastLine: number[] = map.get(i)!;
            const lastNumOfLastLine: number = lastLine[lastLine.length-1];
            const secondLastLine: number[] = map.get(i-1)!;
            const newNum: number = secondLastLine[secondLastLine.length-1] + lastNumOfLastLine;
            map.get(i-1)!.push(newNum);
        }

        answer+= map.get(0)![map.get(0)!.length-1];
        
    });

    console.log('Answer: ', answer);

}

function part2(){

    const lines = file.split('\n');
    let firstLine: number[] = [];
    let map: Map<number, number[]>;
    let rowCount: number;
    let answer = 0;


    lines.forEach(line => {
        rowCount = 0;
        map = new Map();
        firstLine = line.split(' ').map(n => parseInt(n));
        map.set(rowCount++, firstLine);

        // fill in map
        while(!(firstLine.every(n => n == 0))){
            firstLine = findNextLine(firstLine);
            map.set(rowCount++, firstLine);
        }

        // fill in palceholders
        for (let i = rowCount-1 ; i > 0; i--){
            const lastLine: number[] = map.get(i)!;
            const firstNumOfLastLine: number = lastLine[0];
            const secondLastLine: number[] = map.get(i-1)!;
            const newNum: number = secondLastLine[0] - firstNumOfLastLine;
            map.get(i-1)!.unshift(newNum);
        }

        answer+= map.get(0)![0];
        
    });

    console.log('Answer: ', answer);

}


//part1();
part2();