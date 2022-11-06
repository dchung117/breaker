// get grid from document
const grid = document.querySelector(".grid")
const boardWidth = 560
const boardHeight = 300

// get score
const score = document.querySelector("#score")

// Block class
const blockWidth = 100
const blockHeight = 20

class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis]
		this.bottomRight = [xAxis + blockWidth, yAxis]
		this.topLeft = [xAxis, yAxis + blockHeight]
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
	}
}

// create blocks
const blocks = []
for (let i = 0; i < 15; i++) {
	blocks.push(new Block((i % 5)*(blockWidth + 10) + 10, 270 - Math.floor(i/5)*30))
}

function addBlocks() {
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement("div")
		block.classList.add("block")
		block.style.left = blocks[i].bottomLeft[0] + "px" // left boundary of block
		block.style.bottom = blocks[i].bottomLeft[1] + "px" // bottom boundary of block
		grid.appendChild(block)
	}
}

addBlocks()

// add user
const user = document.createElement("div")
const userStart = [230, 10]
let currentPosition = userStart // initialize current user position variable as start position

function drawUser() {
	user.style.left = currentPosition[0] + "px"
	user.style.bottom = currentPosition[1] + "px"
}

user.classList.add("user")
drawUser()
grid.appendChild(user)

// move user
function moveUser(e) {
	switch(e.key) {
		case "ArrowLeft":
			if (currentPosition[0] > 0)
				currentPosition[0] -= 10
				drawUser() // update user div in html
				break
		case "ArrowRight":
			if (currentPosition[0] < boardWidth - blockWidth)
				currentPosition[0] += 10
				drawUser()
				break
	}
}

// add ball
const ballStart = [270, 40]
const ballDiameter = 20
let ballCurrentPosition = ballStart
const ball = document.createElement("div")

function drawBall() {
	ball.style.left = ballCurrentPosition[0] + "px"
	ball.style.bottom = ballCurrentPosition[1] + "px"
}

ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

// move ball
let timerId
let xDirection = -2
let yDirection = 2

function moveBall() {
	// move ball by px right and up
	ballCurrentPosition[0] += xDirection
	ballCurrentPosition[1] += yDirection
	drawBall()

	// check for collision
	checkForCollisions()
}

function checkForCollisions() {
	// check if all blocks are cleared
	if (blocks.length === 0) {
		// stop moving ball
		clearInterval(timerId)
		score.textContent = `YOU WIN! - Final Score: ${score.textContent}`

		// remove event listener
		document.removeEventListener("keydown", moveUser)
	}
	// check for block collisions
	for (let i = 0; i< blocks.length; i ++) {
		if ((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
			(ballCurrentPosition[1] > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])) {
				// remove block from document and the array
				const allBlocks = document.querySelectorAll(".block")
				allBlocks[i].classList.remove("block")
				blocks.splice(i, 1)

				// change direction
				changeDirection()

				// update score
				score.textContent = parseInt(score.textContent) + 10

			}
	}

	// check for user collisions
	if ((ballCurrentPosition[0] >= currentPosition[0]) && (ballCurrentPosition[0] <= currentPosition[0] + blockWidth) &&
		(ballCurrentPosition[1] >= currentPosition[1] && (ballCurrentPosition[1] <= currentPosition[1] + blockHeight))) {
			changeDirection()
		}
	// check for wall or ceiling collisions - change direction
	if (ballCurrentPosition[0] >= boardWidth - ballDiameter ||
		ballCurrentPosition[1] >= boardHeight - ballDiameter ||
		ballCurrentPosition[0] <= 0) {
		changeDirection()
	}

	// check for game over
	if (ballCurrentPosition[1] <= 0) {
		// stop moving ball
		clearInterval(timerId)
		score.textContent = `GAME OVER - Final Score: ${score.textContent}`

		// remove event listener
		document.removeEventListener("keydown", moveUser)
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

// create start button
const startButton = document.createElement("button")
startButton.textContent = "START"
startButton.type = "submit"
startButton.onclick = () => {
	// add event listener to document for keys
	document.addEventListener("keydown", moveUser)

	// move ball every 30 ms
	timerId = setInterval(moveBall, 30)

	// remove button
	document.body.removeChild(startButton)
}
document.body.appendChild(startButton)

