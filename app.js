const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
      
]

cardArray.sort(() => 0.5 - Math.random()) //shortcut to shuffle an array randomly. Advanced trick

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenId = []
const cardsWon = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img') // creates the element img tag
        card.setAttribute('src', 'images/blank.png') // assigns the image to the source. Can be checked in the console with a console.log
        card.setAttribute('data-id', i) //assigns a id that's unique for each card
        card.addEventListener('click', flipCard) //calls the function flipCard when clicked
        gridDisplay.appendChild(card) //added the cards to the div grid through JS
    }
}

createBoard()
function checkMatch() {
    const cards = document.querySelectorAll('img') //searches for ALL the img elements in the entire document
    //the next two variables check if the clicked cards IDs are the same. The verificating occurs through ID, not image 
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!')
    }
    // the conditional below "erases" the cards that match and leave a blank space by default
    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found a match')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        // the following remove events prevent the user from clicking the same card twice
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen) //sends the matching cards to the array cardsWon
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('Try again')
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = []
    cardsChosenId = []

    if(cardsWon.length == cardArray.length/2){
        resultDisplay.innerHTML = 'Congratulations! You found them all!'
    }
}

//we check which card I flipped
function flipCard() {
    const cardId = this.getAttribute('data-id') //we geet the card's ids by clicking them. In this case, the id is the position (0,1,2 etc)
    cardsChosen.push(cardArray[cardId].name) // pushes an item into the array cardsChosen
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img) // inside the cardarray we look for the cardId, which is the name of the card we clicked, and assign an image to the src
    if (cardsChosen.length === 2) { //when two iteems are equal, enter this loop
        setTimeout(checkMatch, 500)
    }
}





