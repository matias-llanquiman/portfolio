const canvas = document.getElementById("animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "rgb(29, 35, 42)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getShapeColor() {
  let r = 25 + 20;
  let g = 35 + 20;
  let b = 42 + 20;
  let alpha = Math.random() * 0.5 + 0.3;

  let color = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return color;
}

class Triangle {
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
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.angle += 0.001;
    this.draw();
  }
}

let shapes;

function init() {
  shapes = [];
  for (let i = 0; i < 60; i++) {
    let size = getRandomInt(7, 20);
    let angle = Math.random() * Math.PI * 2;
    let x = getRandomInt(0, canvas.width);
    let y = getRandomInt(0, canvas.height);
    let directionX = Math.random() * 0.2 - 0.1;
    let directionY = Math.random() * 0.2 - 0.1;
    const color = getShapeColor();
    shapes.push(new Triangle(x, y, directionX, directionY, angle, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgb(29, 35, 42)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let shape of shapes) {
    shape.update();
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
init();
animate();
