const canvas = document.getElementById("animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Pintar todo el canvas
ctx.fillStyle = "rgb(29, 35, 42)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const particleRadius = 13;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles;
let particlePositionX;
let particlePositionY;

let color;
function init() {
  particles = [];
  let count = 2;
  for (let i = 0; i < 60; i++) {
    particlePositionX = Math.random() * canvas.width;
    particlePositionY = Math.random() * canvas.height;
    color = `rgb(${Math.floor(255 - 42.5 * count)} ${Math.floor(255 - 42.5 * count)} ${Math.floor(
      255 - 42.5 * count,
    )})`;
    count++;
    if (count > 4) {
      count = 2;
    }
    particles.push(new Particle(particlePositionX, particlePositionY, color));
  }
}

function animate() {
  requestAnimationFrame(animate);

  particles.forEach((particle) => {
    particle.draw();
  });
}

init();
animate();
