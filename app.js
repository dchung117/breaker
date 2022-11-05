// get grid from document
const grid = document.querySelector(".grid")
const boardWidth = 560
const boardHeight = 300

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
let ballCurrentPosition = ballStart
const ball = document.createElement("div")

function drawBall() {
	ball.style.left = ballCurrentPosition[0] + "px"
	ball.style.bottom = ballCurrentPosition[1] + "px"
}

ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

// add event listener to document for keys
document.addEventListener("keydown", moveUser)

