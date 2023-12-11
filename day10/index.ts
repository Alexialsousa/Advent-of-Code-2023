import { readFileSync } from 'fs';


const file = readFileSync('day10/input.txt', 'utf-8');
const replacedFile = file.replace(/7/g, ">");
const map: string[][] = replacedFile.split("\n").map(line => line.split(""));
let largestSteps: number = 0;

const up: number = 1;
const down: number = 2;
const left: number = 3;
const right: number = 4;

const directions: Map<string, number[]> = new Map([
        ["|", [up, down]],
        ["-", [left, right]],
        ["L", [up, right]],
        ["J", [up, left]],
        [">", [down, left]],
        ["F", [down, right]],
]);

function part1() {
    let visited: number[][] = new Array(map.length).fill(-1).map(() => new Array(map[0].length).fill(-1));
    const queue: {x: number, y: number, steps: number}[] = [];
    const start_y = findStartingPoint(map)[0];
    const start_x = findStartingPoint(map)[1];
    queue.push({x: start_x, y: start_y, steps: 0});
    visited[start_y][start_x] = 0;

    while(queue.length > 0){
        const {x, y, steps} = queue.shift()!;
        
        const currentChar = map[y][x];
        const possibleDirections: number[] = directions.get(currentChar) ?? [];
        if(currentChar == "S"){
            if(directions.get(map[y-1][x])?.includes(down)) possibleDirections.push(up);
            if(directions.get(map[y+1][x])?.includes(up)) possibleDirections.push(down);
            if(directions.get(map[y][x-1])?.includes(right)) possibleDirections.push(left);
            if(directions.get(map[y][x+1])?.includes(left)) possibleDirections.push(right);
        }

        possibleDirections.forEach(direction => {
            
            switch (direction) {
                case up:
                    if(map[y-1][x] !== undefined && visited[y-1][x] == -1){
                        queue.push({x: x, y: y-1, steps: steps+1});
                        visited[y-1][x] = steps+1;
                    }
                    break;
                case down:
                    if(map[y+1][x] !== undefined && visited[y+1][x] == -1){
                        queue.push({x: x, y: y+1, steps: steps+1});
                        
                        visited[y+1][x] = steps+1;
                    }
                    break;
                case left:
                    if(map[y][x-1] !== undefined && visited[y][x-1] == -1){
                        queue.push({x: x-1, y: y, steps: steps+1});
                        visited[y][x-1] = steps+1;
                    }
                    break;
                case right:
                    if(map[y][x+1] !== undefined && visited[y][x+1] == -1){
                        
                        queue.push({x: x+1, y: y, steps: steps+1});
                        visited[y][x+1] = steps+1;
                    }
                    break;
            }
            if(largestSteps < steps) largestSteps = steps;
        });
    }
console.log(largestSteps);

}

part1();

function findStartingPoint(file: string[][]): number[] {
    let coords: number[] = [-1, -1];
    file.forEach((line, index) => {
        if(line.includes("S")) coords = [index, line.indexOf("S")];
    });
    return coords;
}
