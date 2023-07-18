const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let eraserMode = false;

// Set canvas width and height
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 150;

// Function to start drawing
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

// Function to draw on the canvas
function draw(e) {
    if (!isDrawing) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineWidth = eraserMode ? document.getElementById('penSize').value : 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = eraserMode ? 'white' : document.getElementById('colorPicker').value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Event listeners to handle drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Clear canvas
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Eraser button
document.getElementById('eraser').addEventListener('click', () => {
    eraserMode = !eraserMode;
});

// Save button
document.getElementById('save').addEventListener('click', () => {
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = image;
    link.click();
});
