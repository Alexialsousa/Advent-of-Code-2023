import { readFileSync } from 'fs';


const file = readFileSync('day11/input.txt', 'utf-8');

function generateExpansionArray(length: number): string[]{
    let expansion: string[] = [];
    for(let i = 0; i < length; i++){
        expansion.push('.');
    }
    return expansion;
}

function part1(){

    function getGalaxiesAfterExpansion(map: string[][]): {x: number, y: number}[]{
        let galaxiesCoords: {x: number, y: number}[] = [];
        // find rows to expand
        map.forEach((row, y) => {
            if (row.every((char) => char !== '#')) {
                rowsToExpand.push(y);
            }
        });

        // find columns to expand
        for(let i = 0; i < rowLength; i++){
            if(map.every((row) => row[i] !== '#')){
                colsToExpand.push(i);
            }
        }

        // expand rows
        let rowSplices = 0;
        rowsToExpand.forEach((index) => {
            index += rowSplices;
            map.splice(index, 0, generateExpansionArray(rowLength));
            rowSplices++;
        });

        // expand columns
        let colSplices = 0;
        colsToExpand.forEach((index) => {
            index += colSplices;
            map.forEach((row) => {
                row.splice(index, 0, '.');
            });
            colSplices++;
        });

        // find galaxies
        map.forEach((row, y) => {
            row.forEach((char, x) => {
                if(char === '#'){
                    galaxiesCoords.push({x, y});
                }
            });
        });

        return galaxiesCoords;

    }

    type Coord = {x: number, y: number};

    const m: string[][] = file.split('\n').map((line) => line.split('').filter((char) => char !== '\n' && char !== '\r'));
    const rowLength: number = m[0].length;
    const rowsToExpand: number[] = [];
    const colsToExpand: number[] = [];
    let sum = 0;

    let galaxiesCoords: Coord[]  = getGalaxiesAfterExpansion(m);

    for(let i = 0; i < galaxiesCoords.length; i++) {
        // put every pair in a hashamp
        for(let j = i+1; j < galaxiesCoords.length; j++) {
            // find distances from galaxieCoords at i to galaxieCoords at j
            let xDiff = Math.abs(galaxiesCoords[i].x - galaxiesCoords[j].x);
            let yDiff = Math.abs(galaxiesCoords[i].y - galaxiesCoords[j].y);
            sum += xDiff + yDiff;

        };
    };

console.log(sum);

}

function part2(){
    function getGalaxiesAfterExpansion(map: string[][]): {x: number, y: number}[]{
        let galaxiesCoords: {x: number, y: number}[] = [];
        const largerRate = 1000000;
        // find rows to expand
        map.forEach((row, y) => {
            if (row.every((char) => char !== '#')) {
                rowsToExpand.push(y);
            }
        });

        // find columns to expand
        for(let i = 0; i < rowLength; i++){
            if(map.every((row) => row[i] !== '#')){
                colsToExpand.push(i);
            }
        }

        // find galaxies
        map.forEach((row, y) => {
            row.forEach((char, x) => {
                if(char === '#'){
                    // if we've already seen a # on this row, skip row expansion
                    if(!galaxiesCoords.some((coord) => coord.y === y)){
                        // check if any of the previous rows were expanded and add the offset
                        let rowCount = 0;
                        rowsToExpand.forEach((rowIndex) => {
                            if(y > rowIndex) rowCount++;
                        });

                        y += rowCount*(largerRate-1);
                    }

                    // check if any of the previous columns were expanded and add the offset
                    let colCount = 0;
                    colsToExpand.forEach((colIndex) => {
                        if(x > colIndex) colCount++;
                    });

                    x += colCount*(largerRate-1);
                    galaxiesCoords.push({x, y});
                }
            });
        });

        return galaxiesCoords;

    }

    type Coord = {x: number, y: number};

    const m: string[][] = file.split('\n').map((line) => line.split('').filter((char) => char !== '\n' && char !== '\r'));
    const rowLength: number = m[0].length;
    const rowsToExpand: number[] = [];
    const colsToExpand: number[] = [];
    let sum = 0;

    let galaxiesCoords: Coord[]  = getGalaxiesAfterExpansion(m);

    for(let i = 0; i < galaxiesCoords.length; i++) {
        // put every pair in a hashamp
        for(let j = i+1; j < galaxiesCoords.length; j++) {
            // find distances from galaxieCoords at i to galaxieCoords at j
            let xDiff = Math.abs(galaxiesCoords[i].x - galaxiesCoords[j].x);
            let yDiff = Math.abs(galaxiesCoords[i].y - galaxiesCoords[j].y);
            sum += xDiff + yDiff;

        };
    };

console.log(sum);
}

//part1();
part2();