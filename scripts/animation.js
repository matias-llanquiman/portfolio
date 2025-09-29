const canvas = document.getElementById("animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "rgb(29, 35, 42)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const particleRadius = 13;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Particle {
  constructor(x, y, directionX, directionY, angle, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.angle = angle;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();

    ctx.moveTo(0, -this.size);
    ctx.lineTo(-this.size, this.size);
    ctx.lineTo(this.size, this.size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
      this.angle -= 2;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

let particles;

function init() {
  particles = [];
  let count = 2;
  for (let i = 0; i < 60; i++) {
    let size = getRandomInt(7, 20);
    let angle = Math.random() * Math.PI * 2;
    let x = getRandomInt(0, canvas.width);
    let y = getRandomInt(0, canvas.height);
    let directionX = Math.random() * 0.5 - 0.25;
    let directionY = Math.random() * 0.5 - 0.25;
    let color = `rgb(${Math.floor(255 - 42.5 * count)} ${Math.floor(
      255 - 42.5 * count,
    )} ${Math.floor(255 - 42.5 * count)})`;
    count++;
    if (count > 4) {
      count = 2;
    }
    particles.push(
      new Particle(x, y, directionX, directionY, angle, size, color),
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

init();
animate();
