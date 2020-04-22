// StarShower
const canvas = document.querySelector('#star-shower')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Star object
function Star(x, y, radius, color) {
	this.x = x
	this.y = y
	this.radius = radius
	this.color = color
	this.velocity = {
		x: randomIntFromRange(-10, 10),
		y: 3
	}
	this.friction = 0.8
	this.gravity = 0.6
}

Star.prototype.draw = function () {
	c.save()
	c.beginPath()
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
	c.fillStyle = this.color
	c.shadowColor = '#E3EAEF'
	c.shadowBlur = this.radius
	c.fill()
	c.closePath()
	c.restore()
}

Star.prototype.update = function () {
	// When ball hits bottom of screen
	if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
		this.velocity.y = -this.velocity.y * this.friction
		this.shatter()
	} else {
		this.velocity.y += this.gravity
	}

	if (this.x + this.radius + this.velocity.x >= canvas.width || this.x - this.radius + this.velocity.x <= 0) {
		this.velocity.x = -this.velocity.x
	}

	this.x += this.velocity.x
	this.y += this.velocity.y

	this.draw()
}

Star.prototype.shatter = function () {
	this.radius -= 4
	for (let i = 0; i < 8; i++) {
		miniStars.push(new MiniStar(this.x, this.y, 2))
	}
}

// MiniStar object
function MiniStar(x, y, radius, color) {
	Star.call(this, x, y, radius, color)
	this.velocity = {
		x: randomIntFromRange(-5, 5),
		y: randomIntFromRange(-15, 15)
	}
	this.friction = 0.8
	this.gravity = 0.7
	this.timeToLive = 100
	this.opacity = 1
}

MiniStar.prototype.draw = function () {
	c.save()
	c.beginPath()
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
	c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
	c.shadowColor = '#E3EAEF'
	c.shadowBlur = 20
	c.fill()
	c.closePath()
	c.restore()
}

MiniStar.prototype.update = function () {
	// When ball hits bottom of screen
	if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
		this.velocity.y = -this.velocity.y * this.friction
	} else {
		this.velocity.y += this.gravity
	}

	this.x += this.velocity.x
	this.y += this.velocity.y
	this.timeToLive -= 1
	this.opacity -= 1 / this.timeToLive

	this.draw()
}

function createMountainRange(mountainAmount, height, color) {
	for (let i = 0; i < mountainAmount; i++) {
		const mountainWidth = canvas.width / mountainAmount
		c.beginPath()
		c.moveTo(i * mountainWidth, canvas.height)
		c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
		c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
		c.lineTo(i * mountainWidth - 325, canvas.height)
		c.fillStyle = color
		c.fill()
		c.closePath()
	}
}

const groundHeight = 100
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')
let stars
let miniStars
let backgroundStars
const starsAccount = 4
function init() {
	stars = []
	miniStars = []
	backgroundStars = []

	for (let i = 0; i < starsAccount; i++) {
		stars.push(new Star(Math.random() * canvas.width, -(Math.random() * canvas.height), 20, '#E3EAEF'));
	}

	for (let i = 0; i < 150; i++) {
		const x = Math.random() * canvas.width
		const y = Math.random() * canvas.height / 2
		const radius = Math.random() * 3
		backgroundStars.push(new Star(x, y, radius, 'white'))
	}
}

function animate() {
	requestAnimationFrame(animate)
	c.fillStyle = backgroundGradient
	c.fillRect(0, 0, canvas.width, canvas.height)

	backgroundStars.forEach(backgroundStar => {
		backgroundStar.draw()
	})

	createMountainRange(1, canvas.height - 100, '#384551')
	createMountainRange(2, canvas.height - 150, '#2B3843')
	createMountainRange(3, canvas.height - 350, '#26333E')

	c.fillStyle = '#151d23'
	c.fillRect(0, canvas.height - groundHeight, canvas.width, canvas.height)

	for (let i = 0; i < starsAccount - stars.length; i++) {
		stars.push(new Star(Math.random() * canvas.width, -(Math.random() * canvas.height), 20, '#E3EAEF'));
	}

	stars.forEach((star, index) => {
		star.update()
		if (star.radius == 0) {
			stars.splice(index, 1)
		}
	})

	miniStars.forEach((miniStar, index) => {
		miniStar.update()
		if (miniStar.timeToLive == 0) {
			miniStars.splice(index, 1)
		}
	})
}

init()
animate()