const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiamater = 20
let timerId
let xDirection = 2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart
const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// create block and decipher the block's position
class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

//all the blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ]

//draw all the blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move user
function moveUser(e) {
    switch(e.key) { // we detect an key event
        case 'ArrowLeft':
            if (currentPosition[0] > 0) { //this prevents the block from going farther than the left limit
                currentPosition[0] -= 10
                drawUser()
            }
            break
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) { //prevents the blocks from going farther than the board's size
                currentPosition[0] += 10
                user.style.left = currentPosition[0] + 'px'
            }
            break
    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball) // grid is the parent and we put the child (ball) inside it

// move the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollissions()
}

timerId = setInterval(moveBall, 30) // we call the function moveBall every 30 milliseconds (1/3 of a second)

function checkForCollissions() {
    // cheeck for block collisions
    for (let i = 0; i < blocks.length; i++ ) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiamater) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            // check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You win'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiamater) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiamater) ||
        ballCurrentPosition[0] <= 0 
        ){
        changeDirection()
    }
    // check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    //game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}