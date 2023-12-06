import { readFileSync } from 'fs';

function calculateDistance(holdingTime: number, totalTime: number): number {
    return holdingTime * (totalTime - holdingTime);
}

function part1() {
    const file = readFileSync('day6/input.txt', 'utf-8');

    const times: number[] = file.split('\n')[0].split(':')[1].trim().split(' ').filter((time) => time !== '').map((time) => parseInt(time));
    const recordDistances: number[] = file.split('\n')[1].split(':')[1].trim().split(' ').filter((distance) => distance !== '').map((distance) => parseInt(distance));
    let product: number = 1;

    times.forEach((time, index) => {
        let numOfWinningWays = 0;

        for (let i = 0; i < time; i++) {
            if (calculateDistance(i, time) > recordDistances[index]) {
                numOfWinningWays++;
            }
        }

        product *= numOfWinningWays;

    });

    console.log(product);
}

function part2(){
    const file = readFileSync('day6/input.txt', 'utf-8');

    const time: number = parseInt(file.split('\n')[0].split(':')[1].trim().replace(/\s/g, ''));
    const recordDistance: number = parseInt(file.split('\n')[1].split(':')[1].trim().replace(/\s/g, ''));
    let numOfWinningWays = 0;

    for (let i = 0; i < time; i++) {
        if (calculateDistance(i, time) > recordDistance) {
            numOfWinningWays++;
        }
    }

console.log(numOfWinningWays);

}

//part1();
part2();