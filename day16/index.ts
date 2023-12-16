import { readFileSync } from 'fs';


const file = readFileSync('day16/input.txt', 'utf-8');

enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}

function findNewDirection(currentDirection: Direction, symbol: string): Direction[] {
    let newDirections: Direction[] = [];
    switch(currentDirection){
        case Direction.Up:
            if(symbol === '|'){
                newDirections.push(Direction.Up);
            }
            else if(symbol === '-'){
                newDirections.push(Direction.Left);
                newDirections.push(Direction.Right);
            }
            else if(symbol === '/'){
                newDirections.push(Direction.Right);
            }
            else if(symbol === '\\'){
                newDirections.push(Direction.Left);
            }
            break;
        case Direction.Down:
            if(symbol === '|'){
                newDirections.push(Direction.Down);
            }
            else if(symbol === '-'){
                newDirections.push(Direction.Left);
                newDirections.push(Direction.Right);
            }
            else if(symbol === '/'){
                newDirections.push(Direction.Left);
            }
            else if(symbol === '\\'){
                newDirections.push(Direction.Right);
            }
            break;
        case Direction.Left:
            if(symbol === '|'){
                newDirections.push(Direction.Up);
                newDirections.push(Direction.Down);
            }
            else if(symbol === '-'){
                newDirections.push(Direction.Left);
            }
            else if(symbol === '/'){
                newDirections.push(Direction.Down);
            }
            else if(symbol === '\\'){
                newDirections.push(Direction.Up);
            }
            break;
        case Direction.Right:
            if(symbol === '|'){
                newDirections.push(Direction.Up);
                newDirections.push(Direction.Down);
            }
            else if(symbol === '-'){
                newDirections.push(Direction.Right);
            }
            else if(symbol === '/'){
                newDirections.push(Direction.Up);
            }
            else if(symbol === '\\'){
                newDirections.push(Direction.Down);
            }
            break;
    }
    return newDirections;
}

function walkOneStep(direction: Direction, position: {x: number, y: number}): {x: number, y: number} {
    if(direction === Direction.Right){
        position.y++;
    }
    else if(direction === Direction.Left){
        position.y--;
    }
    else if(direction === Direction.Up){
        position.x--;
    }
    else if(direction === Direction.Down){
        position.x++;
    }
    return position;
}

function recurse(direction: Direction, position: {x: number, y: number}, visited: Map<string, string[]>, map: string[][], symbols: string[] = ['|', '-', '\\', '/']){

    // walk in the direction stated from the current position until you hit a symbol or end of map
    while(position.x < map.length && position.x >= 0 && position.y >= 0 && position.y < map[0].length && !symbols.includes(map[position.x][position.y])){
        visited.set(`${position.x},${position.y}`, [...direction]);
        position = walkOneStep(direction, position);
    }

    // hit the end of the map
    if(position.x >= map.length || position.x < 0 || position.y < 0 || position.y >= map[0].length){
        return;
    }
    
    // hit a symbol
    if(symbols.includes(map[position.x][position.y])){

        if(visited.get(`${position.x},${position.y}`)?.includes(direction)){
            return;
        }

        visited.set(`${position.x},${position.y}`, visited.get(`${position.x},${position.y}`)?.concat(direction) || [direction]);
        const d: Direction[] = findNewDirection(direction, symbols.find(symbol => symbol === map[position.x][position.y])!);

        // recurse with each new direction and starting position
        d.forEach(newDirection => {
            const newPosition = walkOneStep(newDirection, {...position});
            recurse(newDirection, newPosition, visited, map, symbols);
        });
    }
    else {
        throw new Error('should not get here');
    }
}

function part1(){
    const map: string[][] = file.split('\n').map(line => line.split(''));

    // start at 0,0 going Right
    let visited = new Map();
    recurse(Direction.Right, {x: 0, y: 0}, visited, map);
    console.log('Visited size: ', visited.size);
}

function part2(){
    const map: string[][] = file.split('\n').map(line => line.split(''));
    let max = 0;

    // do this for every tile on the top row of the map
    for(let i = 0; i < map[0].length; i++){
        let visited = new Map();
        recurse(Direction.Down, {x: 0, y: i}, visited, map);
        if(visited.size > max) max = visited.size;
    }

    // do this for every tile on the last row of the map
    for(let i = 0; i < map[0].length; i++){
        let visited = new Map();
        recurse(Direction.Up, {x: map.length-1, y: i}, visited, map);
        if(visited.size > max) max = visited.size;
    }

    // do this for every tile on the first column of the map
    for(let i = 0; i < map.length; i++){
        let visited = new Map();
        recurse(Direction.Right, {x: i, y: 0}, visited, map);
        if(visited.size > max) max = visited.size;
    }

    // do this for every tile on the last column of the map
    for(let i = 0; i < map.length; i++){
        let visited = new Map();
        recurse(Direction.Left, {x: i, y: map[0].length-1}, visited, map);
        if(visited.size > max) max = visited.size;

    }

    console.log('Max: ', max);

}


//part1();
part2();