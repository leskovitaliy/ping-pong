let canvas = null;
let ctx = null;
let mouseX = null;

const frames = 24;

// coordinate ball element
let ballX = 50;
let ballY = 50;
let ballStepX = 5;
let ballStepY = 6;
let ballRadius = 10;

// coordinate paddle element
let paddleX = null;
let paddleWidth = 100;
let paddleHeight = 10;
let paddleOffset = 40;



function mouseCoords(event) {
    const canvasOffset = canvas.getBoundingClientRect();
    const htmlElement = document.documentElement;
    mouseX = event.clientX - canvasOffset.left - htmlElement.scrollLeft;
    paddleX = mouseX - paddleWidth/2;
}

function drawRect (leftX, leftY, boxWidth, boxHeight, boxFillColor) {
    ctx.fillStyle = boxFillColor;
    ctx.fillRect(leftX, leftY, boxWidth, boxHeight);
}

function drawBall(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 360*Math.PI/180, true);
    ctx.fill();
    ctx.closePath();
}

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawBall(ballX, ballY, ballRadius, 'firebrick');
    drawRect(paddleX, canvas.height - paddleOffset, paddleWidth, paddleHeight, '#fff');
}

function moveAll() {

    let paddleLeftEdge = paddleX;
    let paddleRightEdge = paddleLeftEdge + paddleWidth;
    let paddleTopEdge = canvas.height - paddleOffset;
    let paddleBottomEdge = paddleTopEdge + paddleHeight;

    ballX += ballStepX;
    ballY += ballStepY;

    if ( ballX < 0 || ballX > canvas.width) {
        ballStepX *= -1;
    }
    if ( ballY < 0 || ballY > canvas.height ) {
        ballStepY *= -1;
    }
    if ( ballX > paddleLeftEdge && ballX < paddleRightEdge && ballY > paddleTopEdge && ballY < paddleBottomEdge ) {
        ballStepY *= -1;
        const paddleCenter = paddleLeftEdge + paddleWidth/2;
        const ballDistance = ballX - paddleCenter;
        ballStepX = ballDistance * 0.35;
    }

}

function updateAll() {
    setInterval( function () {
        moveAll();
        drawAll();
    }, 1000/frames);
}

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    if (ctx) {
        canvas.width = 800;
        canvas.height = 500;

        updateAll();
        canvas.addEventListener('mousemove', mouseCoords, false);
    }
}, false);