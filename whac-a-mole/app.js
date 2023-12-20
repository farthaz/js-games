const square = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let currentTime = 10
let timerId = null

function randomSquare() {
    square.forEach(square => {
        square.classList.remove('mole')
    })
    let randomSquare = square[Math.floor(Math.random() * 9)] //math.random reeturns a number beetween 0 and less than 1 (inclusive 0 exclusivee 1) and with Math floor we round it down
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

square.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition)  {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000) 
}

moveMole()

let countDownTimerId = setInterval(countDown, 1000)

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is ' + result)
    }
} 