import { readFileSync } from 'fs';

function part1(){
    const file = readFileSync('day2/input.txt', 'utf-8');
    const games: string[] = file.split('\n').filter((line) => line.length > 0)
    const failedGames: Map<number, boolean> = new Map();
    
    games.forEach((game) => {
        
        const gameName: string = game.split(':')[0];
        const ID: number = parseInt(gameName.split(' ')[1]);
        failedGames.set(ID, false);
        const draws: string[] = game.split(':')[1].split(/;/);
        
        draws.forEach((draw) => {
            const colourCount: Map<string, number> = new Map();
            colourCount.set('red', 0);
            colourCount.set('blue', 0);
            colourCount.set('green', 0);
    
            const picks: string[] = draw.split(',');
    
            picks.forEach((pick) => {
                pick = pick.trim();
                const colour: string = pick.split(' ')[1];
                const count: number = parseInt(pick.split(' ')[0]);
                const old = colourCount.get(colour) ?? 0;
                colourCount.set(colour,  old + count);
    
                const red: number = colourCount.get('red') ?? 0;
                const blue: number = colourCount.get('blue') ?? 0;
                const green: number = colourCount.get('green') ?? 0;
    
                if(red > 12 || blue > 14 || green > 13) {
                    failedGames.set(ID, true);
                }
            });
    
        });
        
    });
    
    let total: number = 0;
    failedGames.forEach((value, key) => {
        if(!value) {
            console.log(`Game ${key} was possible`);
            total+= key;
        }
    });
    
    console.log(`Total: ${total}`);
}

function part2(){
    const file = readFileSync('day2/input.txt', 'utf-8');
    const games: string[] = file.split('\n').filter((line) => line.length > 0)
    let total: number = 0;
    games.forEach((game) => {
        const draws: string[] = game.split(':')[1].split(/;/);
        const colourCount: Map<string, number> = new Map();

        draws.forEach((draw) => {
            const picks: string[] = draw.split(',');
    
            picks.forEach((pick) => {
                pick = pick.trim();
                const colour: string = pick.split(' ')[1];
                const count: number = parseInt(pick.split(' ')[0]);
                const old = colourCount.get(colour) ?? 0;
                if (old < count)
                    colourCount.set(colour, count);
            });
    
        });

        const red: number = colourCount.get('red') ?? 0;
        const blue: number = colourCount.get('blue') ?? 0;
        const green: number = colourCount.get('green') ?? 0;
        const product = red * blue * green;
        total += product;
        
    });
    
    console.log(total);

}

//part1();
part2();