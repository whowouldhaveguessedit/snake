
var snakeBody, food, specialfood, superspecialfood, direction, allowedToMove, isPlaying;
var map;
var obsticala, obsticalb, obsticalc, obsticald;
var obstnum;
var speed = 2;
var play;
var isDone = false;
var level = 0;
let levels =[];

// jsoninit();


/* const json = [
    {
      "speed": 1,
      "obstacles": 0
    },
    {
      "speed": 1,
      "obstacles": 1
    },
    {
      "speed": 2,
      "obstacles": 1
    },
    {
      "speed": 2,
      "obstacles": 2
    },
    {
      "speed": 3,
      "obstacles": 2
    },
    {
      "speed": 3,
      "obstacles": 3
    },
    {
      "speed": 4,
      "obstacles": 3
    },
    {
      "speed": 4,
      "obstacles": 4
    }
  ];

async function jsoninit() {
    try{
        levels = await JSON.parse(await (fetch("./levels.json")));
        levelChange();    
    } catch(e){
        levels = json
        console.log(e);
    }
}*/


fetch("./levels.json").then(data => data.json()).then(data => {
  levels = data;
  console.log("yay fetch")
}).catch(it => {
  console.log(e);
  // In case fetch fails
  levels = JSON.parse(json);
})





function levelChange() {
    level++;
    speed = levels[level - 1].speed;
    obstnum = levels[level - 1].obstacles;
}

function initializeVariables() {
    snakeBody = [[0, 0]];
    food = 0;
    specialfood = 0;
    superspecialfood = 0;
    obsticala = 0;
    obsticalb = 0;
    obsticalc = 0;
    obsticald = 0;
    direction = "Right";
    allowedToMove = false;
    isPlaying = false;
}

// Creating the map and initializing variables
function initializeGameState(mapElementId) {
    map = document.getElementById(mapElementId);
    initializeVariables( );

    // Generating the map pixels
    for (var i = 0; i < 100; i++) {
        var pixel = document.createElement("div");
        pixel.setAttribute("class", "pixel");
        map.appendChild(pixel);
    }
    
 
    // Generating the snake body, food and obsticals
    map.children[0].classList.add("snake-body");
    chooseFood();
    if (obstnum >= 1){
        generateobsticala();   
    }
    if (obstnum >= 2){
        generateobsticalb();
    }
    if (obstnum >= 3){
        generateobsticalc();
    }
    if (obstnum >= 4){
        generateobsticald();
    }
}

//chooses between food, special food and super special food
function chooseFood(){
    var randomNumber = Math.random() * 10;
      if(randomNumber > 9){
        generatesuperspecialFood();
      } else {
      if(randomNumber < 2){
        generatespecialFood();
      } else {
        generateFood();  
      }  
    }    
}

function generateobsticala(){
  // To prevent generating obsticals over the snake
  while (map.children[obsticala].classList.contains("snake-body")) {
    obsticala = Math.floor(Math.random() * 100);
}
  //placing obstical on the map
  map.children[obsticala].classList.add("obsticala");
}

function generateobsticalb(){
    // To prevent generating obsticals over the snake
    while (map.children[obsticalb].classList.contains("snake-body")) {
      obsticalb = Math.floor(Math.random() * 100);
  }
    //placing obstical on the map
    map.children[obsticalb].classList.add("obsticalb");
  }

  function generateobsticalc(){
    // To prevent generating obsticals over the snake
    while (map.children[obsticalc].classList.contains("snake-body")) {
      obsticalc = Math.floor(Math.random() * 100);
  }
    //placing obstical on the map
    map.children[obsticalc].classList.add("obsticalc");
  }

  function generateobsticald(){
    // To prevent generating obsticals over the snake
    while (map.children[obsticald].classList.contains("snake-body")) {
      obsticald = Math.floor(Math.random() * 100);
  }
    //placing obstical on the map
    map.children[obsticald].classList.add("obsticald");
  }


function generateFood() {
    // To prevent generating food over the snake
    while (map.children[food].classList.contains("snake-body")) {
        food = Math.floor(Math.random() * 100);
    }
    // To prevent generating food over the obstical
    while (map.children[food].classList.contains("obsticala")) {
        food = Math.floor(Math.random() * 100);
    }
    // To prevent generating food over the obsticalb
    while (map.children[food].classList.contains("obsticalb")) {
        food = Math.floor(Math.random() * 100);
    }
        // To prevent generating food over the obsticalc
        while (map.children[food].classList.contains("obsticalc")) {
          food = Math.floor(Math.random() * 100);
      }
        // To prevent generating food over the obsticald
        while (map.children[food].classList.contains("obsticald")) {
          food = Math.floor(Math.random() * 100);
      }

    // Placing food on the map
    map.children[food].classList.add("food");
}

function generatespecialFood() {
  // To prevent generating food over the snake
  while (map.children[specialfood].classList.contains("snake-body")) {
    specialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obstical
while (map.children[specialfood].classList.contains("obsticala")) {
    specialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticalb
while (map.children[specialfood].classList.contains("obsticalb")) {
    specialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticalc
while (map.children[specialfood].classList.contains("obsticalc")) {
  specialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticald
while (map.children[specialfood].classList.contains("obsticald")) {
  specialfood = Math.floor(Math.random() * 100);
}
  //placing special food on the map
  map.children[specialfood].classList.add("specialfood");
}

function generatesuperspecialFood() {
  // To prevent generating food over the snake
  while (map.children[superspecialfood].classList.contains("snake-body")) {
    superspecialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticala
while (map.children[superspecialfood].classList.contains("obsticala")) {
    superspecialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticalb
while (map.children[superspecialfood].classList.contains("obsticalb")) {
    superspecialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticalc
while (map.children[superspecialfood].classList.contains("obsticalc")) {
  superspecialfood = Math.floor(Math.random() * 100);
}
// To prevent generating food over the obsticald
while (map.children[superspecialfood].classList.contains("obsticald")) {
  superspecialfood = Math.floor(Math.random() * 100);
}
  //placing special food on the map
  map.children[superspecialfood].classList.add("superspecialfood");
}

function startGame() {
    if (!isPlaying && !isDone) {
        allowedToMove = true;
        play = setInterval(updatePosition, 1000 / speed);
        document.getElementById("menu").style.display = "none";
        document.getElementById("map").style.display = "";
        isPlaying = true;
    }
}

function pauseGame() {
    if (isPlaying) {
        allowedToMove = false;
        clearInterval(play);
        document.getElementById("menu-text").innerText =
            "PAUSED\nPress ENTER to resume";
        document.getElementById("menu").style.display = "";
        document.getElementById("map").style.display = "none";
        isPlaying = false;
    }
}

function gameOver() {
    clearInterval(play);
    document.getElementById("menu-text").innerText =
        "Game Over\nYour Score: " +
        (snakeBody.length - 1) +
        "\nPress ENTER to restart";
    if(snakeBody.length - 1 > 2){
    if(level == 8){
      Endscreen();
    } else
      Levelup();
    }
    document.getElementById("menu").style.display = "";
    document.getElementById("map").style.display = "none";
    map.innerText = ""; // Clearing the map
    initializeGameState(map.id); // Re-generating the map
}

function Levelup() {
  document.getElementById("menu-text").innerText =
    "Congratulations you've reached the next level. You are now in Level" +
    (level + 1);
    levelChange();
  document.getElementById("menu").style.display = "";
  document.getElementById("map").style.display = "none";
  map.innerText = ""; // Clearing the map
  initializeGameState(map.id); // Re-generating the map
}

function Endscreen(){
  isDone = true;
  document.getElementById("menu-text").innerText =
    "Congratulations you've won the last level of this game!";
}

function updatePosition() {
    var newPosR, newPosC;
    var head = snakeBody[snakeBody.length - 1];

    switch (direction) {
        case "Up":
            newPosR = head[0] - 1;
            newPosC = head[1];
            break;
        case "Down":
            newPosR = head[0] + 1;
            newPosC = head[1];
            break;
        case "Left":
            newPosR = head[0];
            newPosC = head[1] - 1;
            break;
        case "Right":
            newPosR = head[0];
            newPosC = head[1] + 1;
            break;
        default:
            break;
    }
    // Checking if snake hit the wall
    if (newPosR < 0 || newPosR > 9 || newPosC < 0 || newPosC > 9) {
        gameOver();
    } else {
        snakeBody.push([newPosR, newPosC]);
        updateScreen();
        allowedToMove = true;
    }
}

function updateScreen() {
    var tailArray = snakeBody.shift();

    var tail = parseInt(tailArray[0] + "" + tailArray[1]);

    var headArray = snakeBody[snakeBody.length - 1];

    var head = parseInt(headArray[0] + "" + headArray[1]);

    // Checking if the snake bite its body
    if (map.children[head].classList.contains("snake-body")) {
        gameOver();
    } else {
        // Adds the new head block
        map.children[head].classList.add("snake-body");

        // Removes the tail block
        map.children[tail].classList.remove("snake-body");

        if (level > 1){
         // If snake hits obsticala
        if(head == obsticala){
        gameOver();
        }   
        }

        if (level > 3){
            //if snake hits obsticalb
            if(head == obsticalb){
            gameOver();
            }
        }

        if (level > 5){
            //if snake hits obsticalb
            if(head == obsticalc){
            gameOver();
            }
        }

        if (level > 7){
            //if snake hits obsticalb
            if(head == obsticald){
            gameOver();
            }
        }
       

        // If snake eats the food
        if (head == food) {
            map.children[food].classList.remove("food");
            snakeBody.unshift(tailArray);
            // Checking if the snake reached its max size
            snakeBody.length == 100 && gameOver();
            chooseFood();
        }
        //If snake eats special food
        if (head == specialfood) {
          map.children[specialfood].classList.remove("specialfood");
          snakeBody.unshift(tailArray);
          snakeBody.unshift(tailArray);
          // Checking if the snake reached its max size
          snakeBody.length == 100 && gameOver();
          chooseFood();
        }
        //If snake eats super special food
        if (head == superspecialfood) {
          map.children[superspecialfood].classList.remove("superspecialfood");
          snakeBody.unshift(tailArray);
          snakeBody.unshift(tailArray);
          snakeBody.unshift(tailArray);
          // Checking if the snake reached its max size
          snakeBody.length == 100 && gameOver();
          chooseFood();
        }
      }
}

// CONTROLS

document.onkeydown = keyPress;

function keyPress(e) {
    e.preventDefault();
    e = e || window.event;

    // Escape key is pressed
    e.keyCode == 27 && pauseGame();

    // Enter key is pressed
    e.keyCode == 13 && startGame();
    let up = 38;
    let down = 40;
    let left = 37;
    let right = 39;

    if (allowedToMove) {
        allowedToMove = false;
        switch (e.keyCode) {
            case left:
                direction != "Right" && (direction = "Left");
                break;
            case up:
                direction != "Down" && (direction = "Up");
                break;
            case right:
                direction != "Left" && (direction = "Right");
                break;
            case down:
                direction != "Up" && (direction = "Down");
                break;
            default:
                allowedToMove = true;
                break;
        }
    }
}

// Initiates the game

initializeGameState("map");
levelChange();
