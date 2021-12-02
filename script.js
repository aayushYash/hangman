const left_leg = document.querySelector('.left_leg'); 
const head = document.querySelector('.head');
const head_transparent = document.querySelector('.head_transparent');
const body = document.querySelector('.body');
const right_leg = document.querySelector('.right_leg');
const left_hand = document.querySelector('.left_hand');
const right_hand = document.querySelector('.right_hand');
const input = document.querySelector('#word_input');
const random_word = document.querySelector('.random');
const guess_output = document.querySelector('.guess_output');
const result = document.querySelector('.result');
const currentScore = document.querySelector('.currentScoreValue');
const highestScore =document.querySelector('.highestScoreValue');
const newGame = document.querySelector('.newGame');

const checkBtn = document.querySelector('#check');
const resetBtn = document.querySelector('#reset');



const hangman_parts = [head, body, left_hand, right_hand, left_leg, right_leg];

const word_list = [
    'alligator',
    'cock',
    'cow',
    'bull',
    'dog',
    'albatross',
    'antelope',
    'armadillo',
    'bear',
    'baboon',
    'buffalo',
    'camel',
    'cat',
    'caterpillar',
    'cheetah',
    'chimpanzee',
    'cockroach',
    'crocodile',
    'deer',
    'donkey',
    'elephant',
    'falcon',
    'fox',
    'gazelle',
    'giraffe',
    'goose',
    'gorilla',
    'hare',
    'hawk',
    'hippopotamus',
    'horse',
    'hummingbird',
    'hyena',
    'iguana',
    'impala',
    'jackal',
    'jaguar',
    'koala',
    'leopard',
    'lion',
    'lobster',
    'mole',
    'mongoose',
    'monkey',
    'mouse',
    'nightingale',
    'ostrich',
    'owl',
    'panther',
    'parrot',
    'penguin',
    'pigeion',
    'rabbit',
    'raccoon',
    'rhinoceros',
    'shark',
    'snail',
    'snake',
    'spider',
    'tiger',
    'turkey',
    'valture',
    'whale',
    'wolf',
    'yak',
    'zebra'    
];

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function refreshHangman(){
    for(let i = 0;i < hangman_parts.length;i++){
        hangman_parts[i].style.maxHeight = '0';
    }
}


let randInt;
let randWord;
let correct_array;
let arrayOfRandWord;
let omittedLetters = []
let count = 0;
let score = 0;
let highScore = localStorage.getItem('highest');

function updateLog(){
    result.innerHTML = '';
    guess_output.innerHTML= '';
    highestScore.innerHTML= highScore.toString();
}

updateLog();

function updateHighScore(){
    if(score > highScore){
        highScore = score;
        localStorage.setItem('highest', highScore);
    }
}


let gameOver = false;
let loose = false;
function createRandom(){
    localStorage.setItem('highest', highScore)
    count = 0;
    // score = 0;
    omittedLetters = []
    randInt = Math.floor(Math.random() * word_list.length - 1)

    randWord = word_list[randInt]

    correct_array = randWord.split('');

    console.log(randWord)

    arrayOfRandWord = randWord.split('');
    
    for(let i = 0; i < arrayOfRandWord.length - 1; i++){
        randInt = Math.ceil(Math.random() * arrayOfRandWord.length - 1)
        omittedLetters.push(arrayOfRandWord[randInt])
    }
    omittedLetters = [...new Set(omittedLetters)]
    console.log(omittedLetters);


    for(let i = 0; i < omittedLetters.length; i++){
        for(let j = 0; j < arrayOfRandWord.length; j++){
            if(omittedLetters[i] === arrayOfRandWord[j]){
                // console.log(i,omittedLetters[i],j,arrayOfRandWord[j]);
                arrayOfRandWord[j] = '_';

            }
        }
    }

    random_word.innerHTML = arrayOfRandWord.join('');
    gameOver = false;
}


createRandom();



function check() {
    let guess;
    let isPresent = false;
    guess = input.value.toString();
    // console.log();
    for(let i = 0; i < omittedLetters.length; i++){
        if(guess === omittedLetters[i]){
            isPresent = true;
            guess_output.classList.remove('wrong')
            guess_output.innerHTML = 'You guessed it correctly.'
            for(let i = 0; i < correct_array.length; i++){
                console.log('222')
                console.log(correct_array[i], guess);
                if(correct_array[i] === guess){
                    console.log('111111');
                    arrayOfRandWord[i] = guess;
                }
            }
            console.log(arrayOfRandWord);
            random_word.innerHTML = arrayOfRandWord.join('');
            if(randWord ===  arrayOfRandWord.join('')){
                result.classList.remove('wrong')
                result.innerHTML = 'You Guessed the Name correctly.'
                count = 10;
                score += 10;
                currentScore.innerHTML = score.toString();
                updateHighScore();
                gameOver = true;
                loose = false;
                break;
            }
            break;
        }
        else{
            isPresent = false
        }
    }
    if(!isPresent) {
        guess_output.classList.add('wrong');
        guess_output.innerHTML = `Oops letter ${guess} is not present in it.`;
        hangman_parts[count].style.maxHeight = '100%';
        console.log(count);
    }
    if (count === hangman_parts.length - 1){
        console.log(count,'00');
        result.classList.add('wrong')
        result.innerHTML = `Game Over.${'<br>'}Correct name was: ${randWord}`;
        // updateHighScore()
        score = 0;
        currentScore.innerHTML = score.toString();
        // console.log('sleep1');
        // sleep(2000);
        // console.log('sleep2');
        loose = false
        gameOver = true;
    }
    count++;
    input.value=''
    if(gameOver || loose){
        // setTimeout(createRandom(),5000);
        resetBtn.disabled= false;
        checkBtn.disabled = true;
    }
    else if(gameOver){
        resetBtn.disabled= false
        checkBtn.disabled = true;

    }
}

function reset(){
    resetBtn.disabled= true;
    checkBtn.disabled = false;
    createRandom();
    updateHighScore();
    updateLog();
    refreshHangman(); 
}



