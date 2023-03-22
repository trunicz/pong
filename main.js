// Inicializamos el canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configuramos el tamaño de las raquetas
const paddleHeight = 75;
const paddleWidth = 10;

// Posición inicial de las raquetas
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;

// Configuramos el tamaño y la velocidad de la pelota
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Dibujamos las raquetas
function drawPaddles() {
  // Jugador 1
  ctx.fillStyle = "white";
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);

  // Jugador 2
  ctx.fillStyle = "white";
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
}

// Dibujamos la pelota
function drawBall() {
  ctx.fillStyle = "white";
  ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
}

// Actualizamos la posición de la pelota y las raquetas
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Si la pelota toca el borde superior o inferior, cambiamos su dirección en Y
  if (ballY < ballSize / 2 || ballY > canvas.height - ballSize / 2) {
    ballSpeedY = -ballSpeedY;
  }

  // Si la pelota toca una de las raquetas, cambiamos su dirección en X
  if (
    ballX < paddleWidth &&
    ballY > player1Y &&
    ballY < player1Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (
    ballX > canvas.width - paddleWidth &&
    ballY > player2Y &&
    ballY < player2Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Movemos la raqueta del jugador 2 hacia la pelota
  if (ballY > player2Y + paddleHeight / 2) {
    player2Y += 5;
  } else {
    player2Y -= 5;
  }
}

// Dibujamos todo en el canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddles();
  drawBall();
}

// Manejamos el movimiento de la raqueta del jugador 1
function handleKeyDown(event) {
  if (event.key === "w") {
    player1Y -= 20;
  } else if (event.key === "s") {
    player1Y += 20;
  }
}

// Escuchamos el evento de teclado para el movimiento de

// Escuchamos el evento de teclado para el movimiento de la raqueta del jugador 1
document.addEventListener("keydown", handleKeyDown);

// Iniciamos el bucle principal del juego
setInterval(gameLoop, 1000 / 30);

// Bucle principal del juego
function gameLoop() {
  update();
  draw();
}
