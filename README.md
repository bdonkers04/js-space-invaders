🚀 Space Shooter (X-Wing vs TIE Fighters)
=========================================

A browser-based space shooter built with **HTML5 Canvas** and **JavaScript**.\
Pilot an X-Wing, shoot down incoming TIE Fighters, and survive as long as possible.

* * * * *

🎮 Features
-----------

-   🌌 **Warp-speed starfield background**

-   ✈️ Player-controlled **X-Wing**

-   👾 Enemy **TIE Fighters (grid formation)**

-   🔫 Shooting mechanics with cooldown

-   💥 Collision detection

-   📈 Score tracking system

-   🛑 Game Over + Win condition

* * * * *

🕹️ Controls
------------

| Key | Action |
| --- | --- |
| ⬅️ Arrow Left | Move left |
| ➡️ Arrow Right | Move right |
| Space | Shoot |

* * * * *

🧱 Project Structure
--------------------

```
project/
│── index.html
│── style.css (optional)
│── script.js
│── xwing.png
│── tie_fighter.png

```

* * * * *

⚙️ How It Works
---------------

### 🎨 Canvas Setup

-   The canvas fills most of the screen:

```
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;

```

* * * * *

### 🌌 Background (Starfield Effect)

-   Uses 3D-style star positions `(x, y, z)`

-   Stars move toward the camera for a warp-speed effect

* * * * *

### ✈️ Player

-   Controlled with arrow keys

-   Fixed at bottom of screen

-   Fires bullets upward

* * * * *

### 👾 Enemies (Aliens)

-   Spawn in a grid formation

-   Move left/right and descend

-   Reverse direction when hitting edges

* * * * *

### 🔫 Shooting System

-   Bullets are stored in an array

-   Only fires when spacing condition is met (prevents spam)

* * * * *

### 💥 Collision Detection

-   Checks overlap between bullets and aliens

-   On hit:

    -   Alien is destroyed

    -   Bullet is removed

    -   Score increases

* * * * *

### 🏁 Game States

-   **Running**

-   **Game Over**

-   **Win Condition**

    -   All enemies destroyed → page reloads

* * * * *

🔄 Game Loop
------------

The game runs using:

```
requestAnimationFrame(gameLoop);

```

### Loop Flow:

1.  `update()` → game logic

2.  `draw()` → rendering

3.  Repeat every frame (~60 FPS)

* * * * *

📊 Score System
---------------

-   Score increases by **+10 per enemy**

-   Displayed using a DOM element:

```
scoreElement.innerText = score;

```

* * * * *

🚀 Start Game
-------------

```
function startGame() {
  document.getElementById("menu").style.display = "none";
  gameRunning = true;
  gameLoop();
}

```

* * * * *

🛠️ Future Improvements
-----------------------

-   🔊 Sound effects & music

-   💥 Explosions & animations

-   🧠 Smarter enemy movement

-   ❤️ Health system

-   🧾 Pause menu

-   📱 Mobile controls

* * * * *

🧑‍💻 Tech Stack
----------------

-   HTML5 Canvas

-   Vanilla JavaScript

-   CSS (for UI/menu)

* * * * *

🎯 Summary
----------

This project demonstrates:

-   Game loops

-   Rendering with canvas

-   Input handling

-   Basic game physics & collisions

* * * * *

⚡ How to Run
------------

1.  Download project files

2.  Open `index.html` in your browser

3.  Click **Start Game**

4.  Play 🎮

* * * * *

Enjoy the game and may the Force be with you ✨
