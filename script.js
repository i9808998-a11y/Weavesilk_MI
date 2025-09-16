const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let color = document.getElementById("colorPicker").value;
let symmetry = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

function drawLine(x, y) {
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.lineWidth = 2;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);

  if (symmetry) {
    let mirroredX = canvas.width - x;
    ctx.lineTo(mirroredX, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mirroredX, y);
  }
}

canvas.addEventListener("mousedown", e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", e => {
  if (drawing) drawLine(e.clientX, e.clientY);
});

// Mobile touch support
canvas.addEventListener("touchstart", e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
});

canvas.addEventListener("touchend", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("touchmove", e => {
  if (drawing) drawLine(e.touches[0].clientX, e.touches[0].clientY);
});

// Controls
document.getElementById("colorPicker").addEventListener("input", e => {
  color = e.target.value;
});

document.getElementById("symmetry").addEventListener("change", e => {
  symmetry = e.target.checked;
});

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "weavesilk_drawing.png";
  link.href = canvas.toDataURL();
  link.click();
});
