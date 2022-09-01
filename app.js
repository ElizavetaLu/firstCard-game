const attempts = document.getElementById('attempts');
let attemptsNumb = 3;
attempts.textContent = attemptsNumb;

const level = document.getElementById('level');
let levelNumb = 1;
level.textContent = levelNumb;

const score = document.getElementById('score');
let scoreNumb = 0;
score.textContent = scoreNumb;

const allCardsColors = [
    { color: '#DDA0DD' },
    { color: '#00FFFF' },
    { color: '#8A2BE2' },
    { color: '#0000FF' },
    { color: '#7FFF00' },
    { color: '#DC143C' },
    { color: '#808080' },
    { color: '#FF4500' },
    { color: '#DDA0DD' },
    { color: '#00FFFF' },
    { color: '#8A2BE2' },
    { color: '#0000FF' },
    { color: '#7FFF00' },
    { color: '#DC143C' },
    { color: '#808080' },
    { color: '#FF4500' }
];

function randomize() {
    const randomCards = allCardsColors.sort(() => Math.random() - 0.5);
    return randomCards
}
randomize()

const cards = document.querySelectorAll('.card')
for (i = 0; i < cards.length; i++) {
    cards[i].setAttribute('id', i)
    cards[i].addEventListener('click', showCard)

}


let chosenCards = []
let chosenCardsId = []
let matchedCards = []


function showCard() {
    console.log('click')
    const flipped = this.getAttribute('id');
    chosenCardsId.push(flipped)

    cards[flipped].style.background = allCardsColors[flipped].color
    chosenCards.push(allCardsColors[flipped].color)

    if (chosenCards.length === 2) {
        if (chosenCards[0] === chosenCards[1]) {
            matchedCards.push(chosenCards[0], chosenCards[1])

            scoreNumb++;
            score.textContent = scoreNumb;

            document.getElementById(chosenCardsId[0].toString()).removeEventListener('click', showCard)
            document.getElementById(chosenCardsId[1].toString()).removeEventListener('click', showCard)

            chosenCards = []
            chosenCardsId = []


        } else {
            attemptsNumb--;
            attempts.textContent = attemptsNumb;

            if (attemptsNumb === 0) {
                backBG()
                attemptsNumb = 3;
                attempts.textContent = attemptsNumb;

                levelNumb = 1;
                level.textContent = levelNumb;

                scoreNumb = 0;
                score.textContent = scoreNumb;

            }

            setTimeout(backToBgColor, 500)

            function backToBgColor() {
                document.getElementById(chosenCardsId[0].toString()).style.background = '#a2cbe9';
                document.getElementById(chosenCardsId[1].toString()).style.background = '#a2cbe9';
                chosenCards = []
                chosenCardsId = []
            }
        }

        if (matchedCards.length === 16) {
            levelNumb++;
            level.textContent = levelNumb;

            for (i = 0; i < cards.length; i++) {
                cards[i].setAttribute('id', i)
                cards[i].addEventListener('click', showCard)
            }
            matchedCards = []
            randomize()
            for (i = 0; i < allCardsColors.length; i++) {
                cards[i].style.background = allCardsColors[i].color
            }
            setTimeout(backBG, 4000);
        }
    }


}
const button = document.getElementById('start')
button.onclick = () => {
    chosenCards = []
    chosenCardsId = []
    matchedCards = []
    attemptsNumb = 3;
    attempts.textContent = attemptsNumb;

    levelNumb = 1;
    level.textContent = levelNumb;

    scoreNumb = 0;
    score.textContent = scoreNumb;
    for (i = 0; i < cards.length; i++) {
        cards[i].setAttribute('id', i)
        cards[i].removeEventListener('click', showCard)
    }
    randomize()
    for (i = 0; i < allCardsColors.length; i++) {
        cards[i].style.background = allCardsColors[i].color
    }
    setTimeout(backBG, 4000);
}

function backBG() {
    for (i = 0; i < allCardsColors.length; i++) {
        cards[i].style.background = '#a2cbe9';
    }
    for (i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', showCard)
    }
}


