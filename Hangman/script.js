const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('finalMessage');

// initializing the figure parts

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'mathematics'];

let selectWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
    ${selectWord.split('')
            .map(letter => `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord == selectWord) {
        finalMessage.innerText = "Congratulations!!🎇🎉 You Won🎃!"
        popup.style.display = 'flex';
    }
}

//update the wrong letters
function updateWrongLettersEl() {

    // displaying the wrong letters
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        `;

    // displaying the parts of hangman
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if last
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost! 😶Try Again🙂';
        popup.style.display = 'flex';
    }
}

//show notification

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }

        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart game 
playAgainBtn.addEventListener('click', () => {
    //empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display = "none";
})
displayWord();