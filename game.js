
/* ==========================================
   Mission: Win Anam's Heart ❤️
   Customized for:
   Anwar ❤️ Anam
==========================================*/

// ---------- Screens ----------
const startScreen = document.getElementById("startScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");
const winScreen = document.getElementById("winScreen");

// ---------- Buttons ----------
const startBtn = document.getElementById("startBtn");
const storyBtn = document.getElementById("storyBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");

// ---------- Game Elements ----------
const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");

const successMessage = document.getElementById("successMessage");
const gameOver = document.getElementById("gameOver");

const heartExplosion = document.getElementById("heartExplosion");
const roseContainer = document.getElementById("roseContainer");

// ---------- Sounds ----------
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");

// ---------- Game Variables ----------
let score = 0;
let lives = 3;
let basketX = window.innerWidth / 2;
let gameRunning = false;

let heartInterval = null;
let roseInterval = null;

const targetScore = 25;

// =======================================
// START SCREEN
// =======================================

startBtn.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    startScreen.classList.remove("active");
    storyScreen.classList.add("active");

});

// =======================================
// STORY SCREEN
// =======================================

storyBtn.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    storyScreen.classList.remove("active");
    gameScreen.classList.add("active");

    startGame();

});

// =======================================
// START GAME
// =======================================

function startGame() {

    score = 0;
    lives = 3;

    scoreText.textContent = score;
    livesText.textContent = lives;

    gameRunning = true;

    basketX = window.innerWidth / 2;
    basket.style.left = basketX + "px";

    if (heartInterval) clearInterval(heartInterval);
    if (roseInterval) clearInterval(roseInterval);

    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});

    heartInterval = setInterval(createHeart, 700);
    roseInterval = setInterval(createRose, 1200);

}

// =======================================
// CREATE HEART
// =======================================

function createHeart() {

    if (!gameRunning) return;

    const heart = document.createElement("div");

    const goodHeart = Math.random() > 0.25;

    heart.classList.add("fallingHeart");

    heart.classList.add(
        goodHeart ? "goodHeart" : "badHeart"
    );

    heart.textContent = goodHeart ? "❤️" : "💔";

    heart.style.left =
        Math.random() * (window.innerWidth - 60) + "px";

    heart.style.top = "-60px";

    heart.style.animationDuration =
        (4 + Math.random() * 2) + "s";

    gameArea.appendChild(heart);

    let y = -60;

    const fall = setInterval(() => {

        y += 6;

        heart.style.top = y + "px";

        // Collision detection continues
        // in Part 2
// ===================================
        // COLLISION DETECTION
        // ===================================

        const basketRect = basket.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if (

            heartRect.bottom >= basketRect.top &&
            heartRect.top <= basketRect.bottom &&
            heartRect.right >= basketRect.left &&
            heartRect.left <= basketRect.right

        ) {

            clearInterval(fall);

            heart.remove();

            if (goodHeart) {

                score++;

                scoreText.textContent = score;

                createMiniExplosion(
                    heartRect.left,
                    heartRect.top
                );

            } else {

                lives--;

                livesText.textContent = lives;

                shakeBasket();

            }

            if(score >= targetScore){

                winGame();

            }

            if(lives <= 0){

                gameLost();

            }

            return;

        }

        // Remove if missed

        if(y > window.innerHeight + 80){

            clearInterval(fall);

            heart.remove();

        }

    },20);

}

/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener("keydown",(e)=>{

    if(!gameRunning) return;

    const speed = 35;

    if(e.key==="ArrowLeft"){

        basketX -= speed;

    }

    if(e.key==="ArrowRight"){

        basketX += speed;

    }

    basketX = Math.max(
        60,
        Math.min(
            window.innerWidth-60,
            basketX
        )
    );

    basket.style.left = basketX + "px";

});

/* ==========================================
   MOBILE BUTTON CONTROLS
========================================== */

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

leftBtn.addEventListener("click",()=>{

    if(!gameRunning) return;

    basketX -= 40;

    basketX = Math.max(60,basketX);

    basket.style.left = basketX+"px";

});

rightBtn.addEventListener("click",()=>{

    if(!gameRunning) return;

    basketX += 40;

    basketX = Math.min(
        window.innerWidth-60,
        basketX
    );

    basket.style.left = basketX+"px";

});

/* ==========================================
   TOUCH DRAG SUPPORT
========================================== */

gameArea.addEventListener("touchmove",(e)=>{

    if(!gameRunning) return;

    const touch = e.touches[0];

    basketX = touch.clientX;

    basketX = Math.max(
        60,
        Math.min(
            window.innerWidth-60,
            basketX
        )
    );

    basket.style.left = basketX+"px";

});
/* ==========================================
   MINI HEART EXPLOSION
========================================== */

function createMiniExplosion(x, y) {

    for (let i = 0; i < 10; i++) {

        const heart = document.createElement("div");

        heart.className = "explodeHeart";

        heart.textContent = "❤️";

        heart.style.left = x + "px";
        heart.style.top = y + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120;

        heart.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        heart.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        heartExplosion.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 2500);

    }

}

/* ==========================================
   CREATE ROSE PETALS
========================================== */

function createRose() {

    if (!gameRunning) return;

    const rose = document.createElement("div");

    rose.className = "rose";

    rose.textContent = "🌹";

    rose.style.left =
        Math.random() * window.innerWidth + "px";

    rose.style.animationDuration =
        (5 + Math.random() * 3) + "s";

    roseContainer.appendChild(rose);

    setTimeout(() => {

        rose.remove();

    }, 8000);

}

/* ==========================================
   BACKGROUND FLOATING HEARTS
========================================== */

const backgroundContainer =
document.getElementById("backgroundHearts");

function createFloatingHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent = "❤️";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.animationDuration =
        (8 + Math.random() * 6) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 22) + "px";

    backgroundContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 15000);

}

/* Start Background Hearts */

setInterval(createFloatingHeart, 500);

/* ==========================================
   HEART EXPLOSION
========================================== */

function finalHeartExplosion() {

    for (let i = 0; i < 120; i++) {

        setTimeout(() => {

            createMiniExplosion(

                window.innerWidth / 2,

                window.innerHeight / 2

            );

        }, i * 25);

    }

}
/* ==========================================
   WIN GAME
========================================== */

function winGame() {

    if (!gameRunning) return;

    gameRunning = false;

    clearInterval(heartInterval);
    clearInterval(roseInterval);

    bgMusic.pause();

    successSound.currentTime = 0;
    successSound.play().catch(() => {});

    gameScreen.classList.remove("active");
    winScreen.classList.add("active");

    successMessage.style.display = "block";

    finalHeartExplosion();

}

/* ==========================================
   GAME OVER
========================================== */

function gameLost() {

    if (!gameRunning) return;

    gameRunning = false;

    clearInterval(heartInterval);
    clearInterval(roseInterval);

    bgMusic.pause();

    gameOver.style.display = "flex";

}

/* ==========================================
   RESTART GAME
========================================== */

restartBtn.addEventListener("click", () => {

    score = 0;
    lives = 3;

    scoreText.textContent = score;
    livesText.textContent = lives;

    gameOver.style.display = "none";

    gameRunning = true;

    bgMusic.currentTime = 0;

    bgMusic.play().catch(() => {});

    heartInterval = setInterval(createHeart, 700);
    roseInterval = setInterval(createRose, 1200);

});

/* ==========================================
   YES BUTTON
========================================== */

yesBtn.addEventListener("click", () => {

    successSound.currentTime = 0;
    successSound.play().catch(() => {});

    finalHeartExplosion();

    successMessage.style.display = "block";

});

/* ==========================================
   NO BUTTON
========================================== */

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", moveNoButton);

function moveNoButton() {

    const parent = noBtn.parentElement;

    const maxX = parent.clientWidth - noBtn.offsetWidth;

    const maxY = 120;

    noBtn.style.position = "relative";

    noBtn.style.left =
        Math.random() * maxX - maxX / 2 + "px";

    noBtn.style.top =
        Math.random() * maxY - maxY / 2 + "px";

}
/* ==========================================
   SHAKE BASKET
========================================== */

function shakeBasket() {

    basket.animate(

        [

            { transform: "translateX(-50%) translateX(-8px)" },

            { transform: "translateX(-50%) translateX(8px)" },

            { transform: "translateX(-50%) translateX(-6px)" },

            { transform: "translateX(-50%) translateX(6px)" },

            { transform: "translateX(-50%) translateX(0px)" }

        ],

        {

            duration:350

        }

    );

}

/* ==========================================
   RANDOM HEART PARTICLES
========================================== */

function randomHeartBurst(x,y){

    for(let i=0;i<20;i++){

        const heart=document.createElement("div");

        heart.className="explodeHeart";

        heart.innerHTML="💖";

        heart.style.left=x+"px";

        heart.style.top=y+"px";

        const angle=Math.random()*Math.PI*2;

        const distance=80+Math.random()*150;

        heart.style.setProperty(

            "--x",

            Math.cos(angle)*distance+"px"

        );

        heart.style.setProperty(

            "--y",

            Math.sin(angle)*distance+"px"

        );

        heartExplosion.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },2500);

    }

}

/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",()=>{

    basketX=Math.min(

        basketX,

        window.innerWidth-60

    );

    basket.style.left=basketX+"px";

});

/* ==========================================
   BACKGROUND MUSIC CONTROL
========================================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        bgMusic.pause();

    }else{

        if(gameRunning){

            bgMusic.play().catch(()=>{});

        }

    }

});

/* ==========================================
   LOVE MESSAGE EFFECT
========================================== */

function showLoveMessage(){

    successMessage.style.display="block";

    successMessage.classList.add("fadeIn");

}

