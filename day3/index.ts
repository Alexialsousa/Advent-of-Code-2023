import { readFileSync } from 'fs';

function part1(){
    const file = readFileSync('day3/input.txt', 'utf-8');
    const lines: string[] = file.split('\n');
    const lineLength = lines[0].length;
    const fileLength = lines.length;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    let foundNumbersLocations: Map<number, number> = new Map();
    let total = 0;

    for (var i = 0; i < fileLength; i++) {
        for (var j = 0; j < lineLength; j++) {
            if (specialChars.test(lines[i][j])) {
                // check if character above, below, left, right or diagonal is a number

                //above
                if(lines[i-1][j].match(/\d/)){
                    findFullNumber(i-1, j);
                }

                //below
                if(lines[i+1][j].match(/\d/)){
                    findFullNumber(i+1, j);
                }

                //left
                if(lines[i][j-1].match(/\d/)){
                    findFullNumber(i, j-1);
                }

                //right
                if(lines[i][j+1].match(/\d/)){
                    findFullNumber(i, j+1);
                }

                //diagonal up left
                if(lines[i-1][j-1].match(/\d/)){
                    findFullNumber(i-1, j-1);
                }

                //diagonal up right
                if(lines[i-1][j+1].match(/\d/)){
                    findFullNumber(i-1, j+1);
                }

                //diagonal down left
                if(lines[i+1][j-1].match(/\d/)){
                    findFullNumber(i+1, j-1);
                }

                //diagonal down right
                if(lines[i+1][j+1].match(/\d/)){
                    findFullNumber(i+1, j+1);
                }

            }
        }
    }

    function findFullNumber(x: number, y: number){
        let counterLeft = y;
        let counterRight = y + 1;
        let num: string = "";
        while (counterLeft >= 0 && lines[x][counterLeft].match(/\d/) ) {
            num = lines[x][counterLeft] + num;
            counterLeft--;
        }

        while (counterRight < lineLength && lines[x][counterRight].match(/\d/)) {
            num = num + lines[x][counterRight];
            counterRight++;
        }
        
        if(foundNumbersLocations.has(x) && foundNumbersLocations.get(x) == (counterLeft + 1)){
            console.log('Already found this number');
        }
        else {
            foundNumbersLocations.set(x, counterLeft + 1);
            total += parseInt(num);
        }
        
    }

    console.log(total);
}

function part2(){
    const file = readFileSync('day3/input.txt', 'utf-8');
    const lines: string[] = file.split('\n');
    const lineLength = lines[0].length;
    const fileLength = lines.length;
    const gear: string = '*';
    let total = 0;
    const foundNumbersLocations: Map<number, number> = new Map();

    for (var i = 0; i < fileLength; i++) {
        for (var j = 0; j < lineLength; j++) {
            if (lines[i][j] == gear) {
                let numCounter = 0;
                let product = 1;
                // check if character above, below, left, right or diagonal is a number

                //above
                if(i > 0 && lines[i-1][j].match(/\d/)){
                    const n = findFullNumber(i-1, j)
                    if(n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //below
                if(i < (fileLength-1) && lines[i+1][j].match(/\d/)){
                    const n = findFullNumber(i+1, j);
                    if (n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //left
                if(j > 0 && lines[i][j-1].match(/\d/)){
                    const n = findFullNumber(i, j-1);
                    if (n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //right
                if(j < (lineLength-1) && lines[i][j+1].match(/\d/)){
                    const n = findFullNumber(i, j+1);
                    if (n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //diagonal up left
                if(i > 0 && j > 0 && lines[i-1][j-1].match(/\d/)){
                    const n = findFullNumber(i-1, j-1);
                    if (n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //diagonal up right
                if(i > 0 && j < (lineLength-1) && lines[i-1][j+1].match(/\d/)){
                    const n = findFullNumber(i-1, j+1);
                    if (n!= 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //diagonal down left
                if(j > 0 && i < (fileLength-1) && lines[i+1][j-1].match(/\d/)){
                    const n = findFullNumber(i+1, j-1);
                    if(n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                //diagonal down right
                if(j < (lineLength-1) && i < (fileLength-1) && lines[i+1][j+1].match(/\d/)){
                    const n = findFullNumber(i+1, j+1);
                    if (n != 0){
                        numCounter++;
                        product *= n;
                    }
                }

                if(numCounter == 2){
                    total += product;
                }

            }
        }
    }

    function findFullNumber(x: number, y: number){
        let counterLeft = y;
        let counterRight = y + 1;
        let num: string = "";

        while (counterLeft >= 0 && lines[x][counterLeft].match(/\d/) ) {
            num = lines[x][counterLeft] + num;
            counterLeft--;
        }

        while (counterRight < lineLength && lines[x][counterRight].match(/\d/)) {
            num = num + lines[x][counterRight];
            counterRight++;
        }
        
        
        if(foundNumbersLocations.has(x) && foundNumbersLocations.get(x) == (counterLeft + 1)){
            return 0;
        }
        else {
            foundNumbersLocations.set(x, counterLeft + 1);
            return parseInt(num);
        }
        
    }

    console.log(total);

}


//part1();
part2();