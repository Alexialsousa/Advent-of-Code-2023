import { readFileSync } from 'fs';


const file = readFileSync('day7/input.txt', 'utf-8');

enum HandType {
    "High card" = 0,
    "One pair" = 1,
    "Two pair" = 2,
    "Three of a kind" = 3,
    "Full house" = 4,
    "Four of a kind" = 5,
    "Five of a kind" = 6,
}

function part1() {

    const cardTypes: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J','Q', 'K', 'A'];
    let sortedHands = new Map<HandType, {hand: string, bid: number}[]>();

    file.split('\n').forEach(line => {
        const hand: string = line.split(' ')[0].trim();
        const bid: number = parseInt(line.split(' ')[1].trim());
        const handType: HandType | undefined = findHandType(hand);
        if(handType === undefined) return;

        if(sortedHands.get(handType) === undefined) sortedHands.set(handType, [{hand, bid}]);
        else {
            // get the current hands of the same type and add the new one in the array using the cardTypes as a sorting reference
            const currentHands = sortedHands.get(handType);
            if(currentHands === undefined) return;

            currentHands.push({hand, bid});
            currentHands.sort((a, b) => {
                for(let i = 0; i < a.hand.length; i++) {
                    const indexA = cardTypes.indexOf(a.hand[i]);
                    const indexB = cardTypes.indexOf(b.hand[i]);
                    if(indexA < indexB) return -1;
                    else if(indexA > indexB) return 1;
                }
                return 0;
            });
            
        }
    });

    let answer = 0;
    let rank = 1;

    const orderedHands = new Map([...sortedHands].sort());
    Array.from(orderedHands.values()).forEach(hand => {
        hand.forEach(h => {
            answer += h.bid*(rank++)
        });
    });

    console.log(answer);

    function findHandType(hand: string): HandType | undefined {
        const handArray = hand.split('');
        // if all cards are the same --> Five of a kind
        if(handArray.every(card => card === handArray[0])) return HandType["Five of a kind"];

        // if all cards are different --> High card
        if(handArray.length == new Set(handArray).size) return HandType["High card"];

        const counterOfCards: Map<string, number> = new Map<string, number>();

        handArray.forEach(card => {
            counterOfCards.set(card, (counterOfCards.get(card) ?? 0) + 1);
        });

        const values = Array.from(counterOfCards.values());
        // if exactly 4 cards are the same --> Four of a kind
        if(values.includes(4) && values.includes(1)) return HandType["Four of a kind"];

        // if exactly 3 cards are the same and the other 2 are the same --> Full house
        if(values.includes(3) && values.includes(2)) return HandType["Full house"];
        
        // if exactly 3 cards are the same and the other 2 are different --> Three of a kind
        if(values.includes(3) && !values.includes(2)) return HandType["Three of a kind"];

        const index = values.indexOf(2);
        if(index != -1) {
            values.splice(index,1);

            // if exactly 2 cards are the same, another 2 are the same and the last different --> Two pair
            if(values.includes(2) && values.includes(1)) return HandType["Two pair"];

            // if exactly 2 cards are the same and the other 3 are different --> One pair
            else if(!values.includes(2) && values.includes(1)) return HandType["One pair"];
        }

        else return undefined;

    }
}

function part2(){

    const cardTypes: string[] = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
    let sortedHands = new Map<HandType, {hand: string, bid: number}[]>();

    file.split('\n').forEach(line => {
        const hand: string = line.split(' ')[0].trim();
        const bid: number = parseInt(line.split(' ')[1].trim());
        const handType: HandType | undefined = findHandType(hand);
       
        if(handType === undefined) return;

        if(sortedHands.get(handType) === undefined) sortedHands.set(handType, [{hand, bid}]);
        else {
            // get the current hands of the same type and add the new one in the array using the cardTypes as a sorting reference
            const currentHands = sortedHands.get(handType);
            if(currentHands === undefined) return;

            currentHands.push({hand, bid});
            currentHands.sort((a, b) => {
                for(let i = 0; i < a.hand.length; i++) {
                    const indexA = cardTypes.indexOf(a.hand[i]);
                    const indexB = cardTypes.indexOf(b.hand[i]);
                    if(indexA < indexB) return -1;
                    else if(indexA > indexB) return 1;
                }
                return 0;
            });
            
        }
    });

    let answer = 0;
    let rank = 1;

    const orderedHands = new Map([...sortedHands].sort());
    Array.from(orderedHands.values()).forEach(hand => {
        hand.forEach(h => {
            answer += h.bid*(rank++)
        });
    });

    console.log(answer);

    function findHandType(hand: string): HandType | undefined {
        const handArray = hand.split('');
        const jokerCount = handArray.filter(card => card === 'J').length;

        // if all cards are the same --> Five of a kind
        if(handArray.every(card => card === handArray[0])) return HandType["Five of a kind"];

        // if all cards are different --> High card
        if(handArray.length == new Set(handArray).size) {
            if(jokerCount == 1) return HandType["One pair"];
            return HandType["High card"];
        }

        const counterOfCards: Map<string, number> = new Map<string, number>();

        handArray.forEach(card => {
            counterOfCards.set(card, (counterOfCards.get(card) ?? 0) + 1);
        });

        const values = Array.from(counterOfCards.values());
        // if exactly 4 cards are the same --> Four of a kind
        if(values.includes(4) && values.includes(1)) {
            if(jokerCount > 0) return HandType["Five of a kind"];
            return HandType["Four of a kind"];
        }

        // if exactly 3 cards are the same and the other 2 are the same --> Full house
        if(values.includes(3) && values.includes(2)) {
            if(jokerCount > 0) return HandType["Five of a kind"];
            return HandType["Full house"];
        }
        
        // if exactly 3 cards are the same and the other 2 are different --> Three of a kind
        if(values.includes(3) && !values.includes(2)) {
            if(jokerCount > 0) return HandType["Four of a kind"];
            return HandType["Three of a kind"];
        }

        const index = values.indexOf(2);
        if(index != -1) {
            
            // remove first pair
            values.splice(index,1);

            // if exactly 2 cards are the same, another 2 are the same and the last different --> Two pair
            if(values.includes(2) && values.includes(1)) {

                if(jokerCount == 1) return HandType["Full house"];
                else if(jokerCount == 2) return HandType["Four of a kind"];
                return HandType["Two pair"];
            }

            // if exactly 2 cards are the same and the other 3 are different --> One pair
            else if(!values.includes(2) && values.includes(1)) {
                if(jokerCount > 0) return HandType["Three of a kind"];
                return HandType["One pair"];
            }
        }

        else return undefined;

    }

}

//part1();
part2();