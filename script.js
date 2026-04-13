const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
let logoWidth = 300;
let logoHeight = 200;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;

let gameRunning = false;
//background effect
let stars = [];
const numStars = 1000;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * canvas.width,
  });
}
//logo
//const img = new Image();
//img.src = "sw_logo.png";

//xwing character
const xwing = new Image();
xwing.src = "xwing.png";

//tie fighter character
const tieFighter = new Image();
tieFighter.src = "tie_fighter.png";

// Game Constants
const PLAYER_WIDTH = 80;
const PLAYER_HEIGHT = 120;
const ALIEN_ROWS = 4;
const ALIEN_COLS = 8;
const ALIEN_WIDTH = 80;
const ALIEN_HEIGHT = 120;

// Game State
let score = 0;
let gameOver = false;

const player = {
  x: canvas.width / 2 - PLAYER_WIDTH / 2,
  y: canvas.height - 90,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  speed: 5,
};

const bullets = [];
const aliens = [];
let alienDirection = 1; // 1 for right, -1 for left
let alienMoveTimer = 0;

// Initialize Aliens
for (let row = 0; row < ALIEN_ROWS; row++) {
  for (let col = 0; col < ALIEN_COLS; col++) {
    aliens.push({
      x: col * (ALIEN_WIDTH + 15) + 250,
      y: row * (ALIEN_HEIGHT + 15) + 20,
      width: ALIEN_WIDTH,
      height: ALIEN_HEIGHT,
      alive: true,
    });
  }
}

// Input Handling
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.code] = true));
window.addEventListener("keyup", (e) => (keys[e.code] = false));
function update() {
  if (gameOver) return;

  // Move Player
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x < canvas.width - player.width)
    player.x += player.speed;

  // Shoot
  if (keys["Space"]) {
    if (
      bullets.length === 0 ||
      bullets[bullets.length - 1].y < player.y - 100
    ) {
      bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        w: 4,
        h: 10,
      });
    }
  }

  // Move Bullets
  bullets.forEach((bullet, index) => {
    bullet.y -= 7;
    if (bullet.y < 0) bullets.splice(index, 1);
  });

  // Move Aliens
  let edgeReached = false;
  aliens.forEach((alien) => {
    if (!alien.alive) return;
    alien.x += alienDirection * 0.5;
    if (alien.x + alien.width > canvas.width || alien.x < 0) edgeReached = true;

    // Check Lose Condition
    if (alien.y + alien.height > player.y) gameOver = true;
  });

  if (edgeReached) {
    alienDirection *= -1;
    aliens.forEach((alien) => (alien.y += 20));
  }

  // Collision Detection
  bullets.forEach((bullet, bIndex) => {
    aliens.forEach((alien, aIndex) => {
      if (
        alien.alive &&
        bullet.x < alien.x + alien.width &&
        bullet.x + bullet.w > alien.x &&
        bullet.y < alien.y + alien.height &&
        bullet.y + bullet.h > alien.y
      ) {
        alien.alive = false;
        bullets.splice(bIndex, 1);
        score += 10;
        scoreElement.innerText = score;
      }
    });
  });

  // Check Win
  if (aliens.every((a) => !a.alive)) {
    //alert("You Win! Earth is safe.");
    location.reload();
  }
}

function draw() {
  // Clear Screen
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //bakcground effect
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    star.z -= 5;

    if (star.z <= 0) {
      star.z = canvas.width;
    }

    let k = 128 / star.z;
    let x = star.x * k + canvas.width / 2;
    let y = star.y * k + canvas.height / 2;

    let size = (1 - star.z / canvas.width) * 3;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, size, size);
  }

  // draw logo
  //ctx.drawImage(img, window.innerWidth / 2 - logoWidth / 2, window.innerHeight / 4 - logoHeight, logoWidth, logoHeight);
  //draw x wing
  ctx.drawImage(xwing, player.x, player.y, player.width, player.height);

  // Draw Bullets
  ctx.fillStyle = "red";
  bullets.forEach((b) => ctx.fillRect(b.x, b.y, b.w, b.h));

  // Draw Aliens
  aliens.forEach((alien) => {
    if (alien.alive) {
      //ctx.fillStyle = "#ff00ff";
      ctx.drawImage(tieFighter, alien.x, alien.y, alien.width, alien.height);
      //ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
      // Alien "eyes"
      //ctx.fillStyle = "black";
      //ctx.fillRect(alien.x + 5, alien.y + 5, 5, 5);
      //ctx.fillRect(alien.x + alien.width - 10, alien.y + 5, 5, 5);
    }
  });

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Courier";
    ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
  }
}
function startGame() {
  document.getElementById("menu").style.display = "none";
  gameRunning = true;
  gameLoop();
}
function gameLoop() {
  if (!gameRunning) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

//gameLoop();
