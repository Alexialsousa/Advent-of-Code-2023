import { readFileSync } from 'fs';


const file = readFileSync('day14/input.txt', 'utf-8');

function part1(){

    const map: string[][] = file.split('\r\n').map(row => row.split(''));
    const positions: Map<number, number[]> = new Map(); // where row is key and value is array of indexes of 0s
    const length = map.length;
    let sum: number = 0;
    // go row by row and look at each column
    // if you find a 0, take its row and minus 1, make sure the new row has nothing in that index, continue until you find another 0 or a # (or end of map) then stay back
    // once 0 is moved, put its new row into positions map as key with its horizontal index in value

    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if(col === 'O'){

                let newRow = rowIndex - 1;
                while(newRow >= 0 && map[newRow][colIndex] === '.'){
                    newRow--;
                }
                if(map[newRow + 1][colIndex] !== 'O'){
                    map[newRow + 1][colIndex] = 'O';
                    map[rowIndex][colIndex] = '.';
                }

                positions.set(newRow + 1, positions.get(newRow + 1) ? [...positions.get(newRow + 1)!, colIndex] : [colIndex]);
            }
        });
    });

    

    positions.forEach((value, key) => {
        sum+=(length-key)*value.length;
    });

    console.log(sum);
}

part1();