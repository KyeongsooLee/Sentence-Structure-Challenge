
const sentenceElement = document.querySelector(".sentence");
const refreshButton = document.querySelector(".refresh-sentence");
const checkButton = document.querySelector(".check-sentence");
const input = document.querySelector("input");
const completeElement = document.querySelector(".complete span b");
const scoreElement = document.querySelector(".score span");
const numOfPlays = document.querySelector(".num span");
const totalSentences = document.querySelector(".total span b")

// Initial variables
let sentence = '';
let score = 0;
let num = 3; // Each player has three replays.
let completed = 0;
let total = sentences.length;
let sentencesRemaining = sentences.slice();
let randomIndex = 0;

// Initial Game
function initGame(){
    if (sentencesRemaining.length === 0) {
        console.log("test")
        // All sentences have been guessed, so restart the game
        sentencesRemaining = sentences.slice();
        total = sentences.length;
        score = 0;
        num = 3;
      }

    // Random Word
    randomIndex = Math.floor(Math.random() * sentencesRemaining.length);
    let randomObj = sentencesRemaining[randomIndex];
    sentence = randomObj.sentence;
    console.log(sentence)

    // Render HTML
    numOfPlays.innerHTML = num;
    scoreElement.innerText = score;
    sentenceElement.innerText = sentence;
    completeElement.innerText = completed;
    totalSentences.innerText = total;
    input.value = "";
    checkButton.setAttribute("disabled", true);
}

initGame()

// Refresh Game -> reset all values except `score` and `number of plays`

refreshButton.addEventListener("click", () => loseGame())

function refreshGame(msg){
    if(msg) alert(msg);
    initGame()
}

// GameOver
function gameOver(){
    let msg = `Game Over! You get ${score} points, play again!`;
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
    if(total == 0){
        return winner(`You completed every sentences!!`)
    }
    refreshGame(msg)
}

// Winner!
function winner(msg){
    completed++;
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
    let answerText = input.value.toLowerCase().trim().replace(/[^\w\s]/gi, "");
    let sentenceText = sentence.toLowerCase().trim().replace(/[^\w\s]/gi, "");
    // let answerText = input.value.toLowerCase().trim();
    if(answerText !== sentenceText)
        return loseGame(`Oops! ${answerText} is not a correct sentence`)
    else{
        total--;
        // Remove sentence from `sentencesRemaining` array
        sentencesRemaining.splice(randomIndex, 1);
        return winGame(`Congrats! ${answerText} is a correct`)
    }
})