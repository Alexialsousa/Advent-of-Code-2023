import { readFileSync } from 'fs';


const file = readFileSync('day8/input.txt', 'utf-8');

function part1() {
    const instructions: string[] = file.split('\n')[0].split('').filter(e => e != '\r');
    const map: Map<string, {left: string, right: string}> = new Map();
    const data: string[] = file.split('\n').filter((line, index) => index > 1);

    // fill map
    data.forEach(line => {
        const key: string = line.split('=')[0].trim();
        const values: {left: string, right: string} = {left: line.split('(')[1].split(',')[0], right: line.split(',')[1].trim().split(')')[0]};
        map.set(key, {left: values.left, right: values.right});
    });

    let currentPosition: string = 'AAA';
    let steps: number = 0;

    while(currentPosition != 'ZZZ'){
        for(let i = 0; i < instructions.length; i++) {
            steps++;
            if (instructions[i] == 'R') currentPosition = map.get(currentPosition)!.right;
            else if (instructions[i] == 'L') currentPosition = map.get(currentPosition)!.left;
            if(currentPosition == 'ZZZ') break;
        };
    }

    console.log(steps);
}

function part2(){
    const instructions: string[] = file.split('\n')[0].split('').filter(e => e != '\r');
    const map: Map<string, {left: string, right: string}> = new Map();
    const data: string[] = file.split('\n').filter((_line, index) => index > 1);

    // find all start positions and end positions
    const startPositions: string[] = [];

    // fill map
    data.forEach(line => {
        const key: string = line.split('=')[0].trim();
        const values: {left: string, right: string} = {left: line.split('(')[1].split(',')[0], right: line.split(',')[1].trim().split(')')[0]};
        map.set(key, {left: values.left, right: values.right});

        if(key.charAt(2) == 'A') startPositions.push(key);
    });

    function gcd(a: number, b: number): number {
        return b == 0 ? a : gcd(b, a % b);
    }
    function lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }

    function getNumberOfSteps(start: string): number {
        let steps: number = 0;
        while(start.charAt(2) != 'Z'){

            for(let i = 0; i < instructions.length; i++) {
                steps++;
                if (instructions[i] == 'R') start = map.get(start)!.right;
                else if (instructions[i] == 'L') start = map.get(start)!.left;

                if(start.charAt(2) == 'Z') break;
            }
        }
        return steps;
    }
    const allSteps: number[] = startPositions.map(p => getNumberOfSteps(p));

    console.log(allSteps.reduce(lcm, 1));

}

//part1();
part2();