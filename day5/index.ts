import { readFileSync } from 'fs';


const file = readFileSync('day5/input.txt', 'utf-8');

let seeds: number[] = [];
let seed_to_soil: Map<number, number> = new Map();
let soil_to_fertilizer: Map<number, number> = new Map();
let fertilizer_to_water: Map<number, number> = new Map();
let water_to_light: Map<number, number> = new Map();
let light_to_temperature: Map<number, number> = new Map();
let temperature_to_humidity: Map<number, number> = new Map();
let humidity_to_location: Map<number, number> = new Map();

const sections: string[] = file.split('\n\n').filter((line) => line.length > 0);
seeds = sections[0].split(':')[1].trim().split(' ').map((seed) => parseInt(seed));

sections.forEach((section) => {

    const map_name = section.split(':')[0].split(' ')[0].trim();
    // skip first section
    if(map_name == 'seeds'){
        return;
    }

    const data: string[] = section.split(':')[1].replace(/\n/g, ' ').trim().split(' ');
    
    switch (map_name) {
        case 'seed-to-soil':
            fillMap(seed_to_soil, data);
            break;
        case 'soil-to-fertilizer':
            fillMap(soil_to_fertilizer, data);
            break;
        case 'fertilizer-to-water':
            fillMap(fertilizer_to_water, data);
            break;
        case 'water-to-light':
            fillMap(water_to_light, data);
            break;
        case 'light-to-temperature':
            fillMap(light_to_temperature, data);
            break;
        case 'temperature-to-humidity':
            fillMap(temperature_to_humidity, data);
            break;
        case 'humidity-to-location':
            fillMap(humidity_to_location, data);
            break;
        default:
            break;
    }
});

let results: number[] = [];

seeds.forEach((seed) => {
    const soil = seed_to_soil.get(seed) ?? seed;
    const fertilizer = soil_to_fertilizer.get(soil) ?? soil;
    const water = fertilizer_to_water.get(fertilizer) ?? fertilizer;
    const light = water_to_light.get(water) ?? water; 
    const temperature = light_to_temperature.get(light) ?? light; 
    const humidity = temperature_to_humidity.get(temperature) ?? temperature;
    const location = humidity_to_location.get(humidity) ?? humidity;
    results.push(location);
});

console.log(Math.min(...results));

function fillMap(map: Map<number, number>, data: string[]){
    const srcs: number[] = data.filter((item, index) => index % 3 == 1).map((item) => parseInt(item));
    const dsts: number[] = data.filter((item, index) => index % 3 == 0).map((item) => parseInt(item));
    const ranges: number[] = data.filter((item, index) => index % 3 == 2).map((item) => parseInt(item));
    
    for(let i = 0; i < srcs.length; i++){
        const src = srcs[i];
        const dst = dsts[i];
        const range = ranges[i]; 
        for(let j = 0; j < range; j++){
            map.set(src + j, dst + j);
        }
    }
}
