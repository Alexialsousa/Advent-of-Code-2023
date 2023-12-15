import { readFileSync } from 'fs';


const file = readFileSync('day15/input.txt', 'utf-8');

function hashAlgorithm(steps: string[]): number{
    let sum = 0;
    steps.forEach((step) => {
        let current = 0;
        for(let i = 0; i < step.length; i++){
            current+=step.charCodeAt(i);
            current*=17;
            current%=256;
        }
        sum+=current;
    });
    return sum;
}
function part1(){
    
    const steps: string[] = file.split(',');

    const sum = hashAlgorithm(steps);
    
    console.log(sum);
}

function part2(){
    const steps: string[] = file.split(',');
    let boxes: Map<number, {label: string, focal: number}[]> = new Map();

    steps.forEach(step => {

        if(step.includes('-')){
            const label = step.split('-')[0];
            const boxNumber = hashAlgorithm([label]);
 
            const values = boxes.get(boxNumber) ?? [];
            if(values.length !== 0){
                values.forEach(value => {
                    if(value.label === label){
                        const index = values.indexOf(value);
                        values.splice(index, 1);
                    }
                });
            }
            
        }


        if(step.includes('=')){
            const label = step.split('=')[0];
            const focal: number = parseInt(step.split('=')[1]);
            const boxNumber = hashAlgorithm([label]);
            const values = boxes.get(boxNumber) ?? [];
            let found = false;
            values.forEach(value => {
                if(value.label === label){
                    found = true;
                    value.focal = focal;
                }
            });

            if(!found) {
                if(values.length === 0) boxes.set(boxNumber, [{label, focal}]);
                else boxes.set(boxNumber, [...values, {label, focal}]);
            }
        }

    });

    let sum = 0;
    boxes.forEach((value, key) => {
        value.forEach((box, index) => {
            sum+=(key+1)*(index+1)*box.focal;
            
        });
    });

    console.log(sum);

}

//part1();
part2();