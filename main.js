
const sentenceElement = document.querySelector(".sentence");
const refreshButton = document.querySelector(".refresh-sentence");
const checkButton = document.querySelector(".check-sentence");
const input = document.querySelector("input");
const timeElement = document.querySelector(".time span b");
const scoreElement = document.querySelector(".score span");
const numOfPlays = document.querySelector(".num span");

// Initial variables
let sentence = '';
let timer;
let score = 0;
let num = 5; // Each player has three replays.
let time = 60;

// Initial Game
function initGame(){
    // Random Word
    let randomIndex = Math.floor(Math.random() * sentences.length);
    let randomObj = sentences[randomIndex];
    sentence = randomObj.sentence;
    console.log(sentence)

    // Render HTML
    numOfPlays.innerHTML = num;
    scoreElement.innerText = score;
    sentenceElement.innerText = sentence;
    timeElement.innerText = time;
    input.value = "";
    checkButton.setAttribute("disabled", true);

    // Initial timer
    // timer = setInterval(() => {
    //     if(time > 0){
    //         time--;
    //         return timeElement.innerText = time;
    //     }
    //     loseGame(`Time Out! ${word.toUpperCase()} is a correct word`);
    // }, 1000)
}

initGame()

// Refresh Game -> reset all values except `score` and `number of plays`

refreshButton.addEventListener("click", () => loseGame())

function refreshGame(msg){
    if(msg) alert(msg);
    sentence = '';
    time = 60;
    clearInterval(timer);
    initGame()
}

// GameOver
function gameOver(){
    let msg = `Game Over! You get ${score} points, play again!`;
    num = 3;
    score = 0;
    refreshGame(msg);
}

// Lose game
function loseGame(msg){
    num--;
    if(num < 0)
        return gameOver();

    refreshGame(msg)
}

// Win Game
function winGame(msg){
    score++;
    refreshGame(msg)
}

// Check Input is disabled
input.addEventListener("input", (e) => {
    if(!e.target.value.trim()){
        checkButton.setAttribute("disabled", true);
    }else{
        checkButton.removeAttribute("disabled");
    }
})

// Check the word
checkButton.addEventListener("click", () => {
    let answerText = input.value.trim();
    if(answerText !== sentence)
        return loseGame(`Oops! ${answerText} is not a correct sentence`)
    
    return winGame(`Congrats! ${answerText} is a correct`)
})