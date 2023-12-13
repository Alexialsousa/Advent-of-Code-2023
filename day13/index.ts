import { readFileSync } from 'fs';


const file = readFileSync('day13/input.txt', 'utf-8');
const puzzles: string[][] = file.split('\r\n\r\n').map(puzzle => puzzle.split('\r\n'));

function findVerticalLineAnswer(puzzle: string[]): number{
    const rowLength: number = puzzle[0].length;
    let foundVertical: boolean = true;

    for(let j = 0; j+1 < rowLength; j++){
    
        if(puzzle[0][j] === puzzle[0][j+1]){
            let verticalLine: boolean = true;
            
            puzzle.forEach((row, _) => {
                if(!verticalLine) return;
                if(row[j] !== row[j+1]){
                    verticalLine = false;
                    return;
                }
            });

            if(verticalLine) {
               
                foundVertical = true;
                puzzle.forEach((row, _) => {
                    if(!foundVertical) return;

                    for(let i = 1; j+1+i < rowLength && j-i >= 0; i++){
                        if(row[j-i] !== row[j+1 + i]){
                            foundVertical = false;
                            break;
                        }
                    }
                });
                
                if(foundVertical) return j+1;
            }
        }
    }
    return -1;
}

function findHorizontalLineAnswer(puzzle: string[]): number{
    let foundHorizontal: boolean = true;

    for(let j = 0; j+1 < puzzle.length; j++){
    
        if(puzzle[j][0] === puzzle[j+1][0]){
            let horizontalLine: boolean = true;

            puzzle[j].split('').forEach((char, index) => {
                if(!horizontalLine) return;
                if(char !== puzzle[j+1][index]){
                    horizontalLine = false;
                    return;
                }
            });

            if(horizontalLine) {
               
                foundHorizontal = true;
                for(let i = 1; j+1+i < puzzle.length && j-i >= 0; i++){
                    if(!foundHorizontal) break;
                    puzzle[j-i].split('').forEach((char, index) => {
                        if(char !== puzzle[j+1+i][index]){
                            foundHorizontal = false;
                            return;
                        }
                    });
                }
    
                if(foundHorizontal) return j+1;
            }
        }
    }
    return -1;
}


function part1(){
    let sum: number = 0;
    let index = 0;

    puzzles.forEach(puzzle => {
        index++;
        console.log('starting puzzle ', index);
        let verticalAns: number
        let horizontalAns: number

        verticalAns = findVerticalLineAnswer(puzzle);

        if(verticalAns != -1){
            console.log('puzzle ', index, ' has a vertical mirror');
            sum+=verticalAns;
        }
        else {
            horizontalAns = findHorizontalLineAnswer(puzzle);
            
            if(horizontalAns != -1){
                console.log('puzzle ', index, ' has a horizontal mirror');
                sum+=100*horizontalAns;
            }
            else {
                console.log('Something went REALLYY wrong');
            }
        }
        
    });

    console.log('ANSWER: ', sum);
    
}


part1();