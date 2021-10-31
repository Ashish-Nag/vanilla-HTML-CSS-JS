const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// list of word for game

const words = ['heelo', 'dance', 'killnow'];

// initialize the word 
let randomWord;

// intialize score
let score = 0;

// initialize time 
let time = 10;

// intialize diffuclty
let difficulty = localStorage.getItem('diffulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value 
difficultySelect.value = localStorage.getItem('diffulty') != null ? localStorage.getItem('difficulty') : 'medium';

// focus on text on start 
text.focus();

// start count
const timeInterval = setInterval(updateTime, 1000);

// generate random word from the array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}


// add word to DOM

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time == 0) {
        clearInterval(timeInterval);

        // end Game
        gameOver();
    }
}

// game over, show End Screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time Ran Out</h1> 
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()"> Relaod </button>`;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// event listeners

// typing
text.addEventListener('input', e => {
    let insertedText = e.target.value;

    if (insertedText === randomWord) {
        // change the word
        addWordToDOM();
        updateScore();

        // clear input area
        e.target.value = '';

        if (difficulty === "hard") {
            time += 1;
        } else if (difficulty === "medium") {
            time += 2;
        } else {
            time += 4;
        }
        updateTime();
    }
});

// settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// settings select 

settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('diffulty', difficulty);
});
