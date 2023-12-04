import { readFileSync } from 'fs';

function part1() {
  const file = readFileSync('day4/input.txt', 'utf-8');
  const cards: string[] = file.split('\n');
  let totalPoints = 0;

  cards.forEach((card) => {
    let winCount = 0;
    const rightSide: string = card.split(':')[1].trim();
    const winningNums: string[] = rightSide
      .split('|')[0]
      .trim()
      .split(' ')
      .filter((num) => num != '');
    const myNums: string[] = rightSide
      .split('|')[1]
      .trim()
      .split(' ')
      .filter((num) => num != '');

    winningNums.forEach((num) => {
      if (myNums.includes(num)) {
        if (winCount == 0) winCount++;
        else winCount *= 2;
      }
    });

    totalPoints += winCount;
  });

  console.log(totalPoints);
}

function part2() {
  const file = readFileSync('day4/input.txt', 'utf-8');
  const cards: string[] = file.split('\n');
  let viewCount = 0;
  let cardsToAdd: string[] = [];
  cards.forEach((card) => cardsToAdd.push(card));

  let length = cardsToAdd.length;

  do {
    for(let i = 0; i < length; i++) {
      const card = cardsToAdd[i];

      const cardNumber: number = parseInt(
        card.split(':')[0].split(' ').filter((num) => num != '')[1].trim()
      );

      let winCount = 0;
      const rightSide: string = card.split(':')[1].trim();

      const winningNums: string[] = rightSide
        .split('|')[0]
        .trim()
        .split(' ')
        .filter((num) => num != '' && num != undefined);

      const myNums: string[] = rightSide
        .split('|')[1]
        .trim()
        .split(' ')
        .filter((num) => num != ''&& num != undefined);

      winningNums.forEach((num) => {
        if (myNums.includes(num)) {
          winCount++;
        }
      });

      for (let j: number = 1; j <= winCount; j++) {
        length = cardsToAdd.push(cards[cardNumber + j - 1]);
        
      }

      viewCount++;
    }
  } while (viewCount != length);

  console.log(viewCount);
}

//part1();
part2();
