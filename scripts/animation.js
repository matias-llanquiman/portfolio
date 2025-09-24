function animation() {
  const canvas = document.getElementById("animation");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Pintar todo el canvas
  ctx.fillStyle = "rgb(29, 35, 42)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const x1 = 800,
    y1 = 100;
  const x2 = 750,
    y2 = 300;

  for (let i = 0; i <= 12; i++) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    x1++;
  }

  ctx.fillStyle = "white";
  const radius = 3;

  ctx.beginPath();
  ctx.arc(800, 300, radius, 0, Math.PI * 2);
  ctx.arc(750, 300, radius, 0, Math.PI * 2);
  ctx.fill();
}

animation();
