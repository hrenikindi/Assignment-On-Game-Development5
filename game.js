// Iteration 1: Declare variables required for this game
let gameBoard=document.getElementById("game-body");
let $lives=document.getElementById("lives");
let gameTime=document.getElementById("timer").textContent;
let zombieId=0;
const imgs=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
]

// Iteration 1.2: Add shotgun sound
const shotgunAudio = new Audio("./assets/shotgun.wav");
shotgunAudio.volume = 0.5;
gameBoard.onclick=()=>{
    shotgunAudio.pause();
    shotgunAudio.currentTime=0;
    shotgunAudio.play();
}

// Iteration 1.3: Add background sound
let backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.volume=0.9;
backgroundSound.loop=true;

// Iteration 1.4: Add lives
const maxlives = 3;
let lives=3;

// Iteration 2: Write a function to make a zombie
function createZombie(zombieId){
    let zombies=document.createElement("img");
    let randomIndex=Math.floor(Math.random()*6);
    zombies.src=`./assets/${imgs[randomIndex]}`
    zombies.setAttribute("class","zombie-image");
    zombies.setAttribute("id",`${zombieId}`);
    document.body.append(zombies)
    
    let randomleftProp=randomInteger(20,80);
    zombies.style.left=`${randomleftProp}vw`
    zombies.onclick=()=>{
        zombieKill(zombies);
    }
    zombieId++; 

}

// Iteration 3: Write a function to check if the player missed a zombie
function zombieShoot(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        lives--;
        return true;
    }else{
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieKill(zombie){
    zombie.style.display="none";
    zombieId++;
    createZombie(zombieId);
}

// Iteration 5: Creating timer
let timer=setInterval(()=>{
    gameTime--;
    document.getElementById("timer").textContent=gameTime;
    let zombie=document.getElementById(zombieId);
    if(zombieShoot(zombie)){
        zombieKill(zombie);
    }
        if(lives==0){
            clearInterval(timer);
            location.href="./game-over.html";
        }
        console.log(gameTime)
        if(gameTime==0){
            location.href="./win.html";
        }
},1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie(zombieId);

// Iteration 7: Write the helper function to get random integer
function randomInteger(minimum,maximum){
    minimum=Math.ceil(minimum);
    maximum=Math.floor(maximum);
    let randomNumber=Math.floor(Math.random()*(maximum-minimum)+minimum);
    return randomNumber;
}