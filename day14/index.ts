import { readFileSync } from 'fs';


const file = readFileSync('day14/input.txt', 'utf-8');

function part1(){

    const map: string[][] = file.split('\r\n').map(row => row.split(''));

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
            }
        });
    });

    console.log(calculateLoad(map));
}

function part2(){
    const map: string[][] = file.split('\r\n').map(row => row.split(''));

    function moveNorth(m: string[][]): string[][]{
        m.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if(col === 'O'){
    
                    let newRow = rowIndex - 1;
                    while(newRow >= 0 && m[newRow][colIndex] === '.'){
                        newRow--;
                    }
                    
                    if(m[newRow + 1][colIndex] !== 'O'){
                        m[newRow + 1][colIndex] = 'O';
                        m[rowIndex][colIndex] = '.';
                    }
                }
            });
        });
        return m;
    }

    function moveWest(m: string[][]): string[][]{
        for(let col = 0; col < m[0].length; col++){
            for(let row = 0; row < m.length; row++){
                if(m[row][col] === 'O'){
                    let newCol = col - 1;
                    while(newCol >= 0 && m[row][newCol] === '.'){
                        newCol--;
                    }
                    if(m[row][newCol + 1] !== 'O'){
                        m[row][newCol + 1] = 'O';
                        m[row][col] = '.';
                    }
                }   
            }
        }
        return m;
    }

    function moveSouth(m: string[][]): string[][]{
        for(let row = m.length - 1; row >= 0; row--){
            map[row].forEach((col, colIndex) => {
                if(col === 'O'){
    
                    let newRow = row + 1;
                    while(newRow < m.length && m[newRow][colIndex] === '.'){
                        newRow++;
                    }
                   
                    if(m[newRow - 1][colIndex] !== 'O'){
                        m[newRow - 1][colIndex] = 'O';
                        m[row][colIndex] = '.';
                    }
                }
            });
        };
        return m;
    }

    function moveEast(m: string[][]): string[][]{
        for(let col = m[0].length - 1; col >= 0 ; col--){
            for(let row = 0; row < m.length; row++){
                if(m[row][col] === 'O'){
                    let newCol = col + 1;
                    while(newCol < m[0].length && m[row][newCol] === '.'){
                        newCol++;
                    }
                    if(m[row][newCol - 1] !== 'O'){
                        m[row][newCol - 1] = 'O';
                        m[row][col] = '.';
                    }
                }   
            }
        }
        return m;
    }
    let mapNorth: string[][] = [];
    let mapWest: string[][] = [];
    let mapSouth: string[][] = [];
    let mapEast: string[][] = map;

    for(let i = 0; i <= (119+22); i++){

        // starting at i = 119, every 22 steps the map will be the same!!
        // since (1 000 000 000 - 120) % 22 == 0 this works
        
        mapNorth = moveNorth(mapEast);
        mapWest = moveWest(mapNorth);
        mapSouth = moveSouth(mapWest);
        mapEast = moveEast(mapSouth);
    }

    console.log(calculateLoad(mapEast));

}

//part1();
part2();


function calculateLoad(map: string[][]){
    let sum = 0;
    map.forEach((row, rowIndex) => {
        let count = 0;
        row.forEach(col => {
            if(col === 'O') count++;
        });
        sum+=(map.length-rowIndex)*count;
    });
    return sum;
}