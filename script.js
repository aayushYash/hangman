const left_leg = document.querySelector('.left_leg'); 
const head = document.querySelector('.head');
const head_transparent = document.querySelector('.head_transparent');
const body = document.querySelector('.body');
const right_leg = document.querySelector('.right_leg');
const left_hand = document.querySelector('.left_hand');
const right_hand = document.querySelector('.right_hand');
const inputBtn = document.querySelector('.inputBtn');
const random_word = document.querySelector('.random');
const guess_output = document.querySelector('.guess_output');
const result = document.querySelector('.result');
const currentScore = document.querySelector('.currentScoreValue');
const highestScore =document.querySelector('.highestScoreValue');
const newGame = document.querySelector('.newGame');

const checkBtn = document.querySelector('#check');
const resetBtn = document.querySelector('#reset');

const hint_word = document.querySelector('.hintWord');
const hint_word_btn = document.querySelector('.hintBtn');

const correct_answer = document.querySelector('.correct_answer');
const restart_popup = document.querySelector('#restart_popup');
const continue_popup = document.querySelector('#continue_popup');


const hangman_parts = [head, body, left_hand, right_hand, left_leg, right_leg];

const animals = [
    'cock',
    'cow',
    'bull',
    'dog',
    'antelope',
    'armadillo',
    'bear',
    'baboon',
    'buffalo',
    'camel',
    'cat',
    'cheetah',
    'chimpanzee',
    'deer',
    'donkey',
    'elephant',
    'fox',
    'gazelle',
    'giraffe',
    'goose',
    'gorilla',
    'hare',
    'hippopotamus',
    'horse',
    'hyena',
    'impala',
    'jackal',
    'jaguar',
    'koala',
    'leopard',
    'lion',
    'mole',
    'mongoose',
    'monkey',
    'mouse',
    'panther',
    'rabbit',
    'raccoon',
    'rhinoceros',
    'tiger',
    'turkey',
    'wolf',
    'yak',
    'zebra'
]

const birds = ['valture','parrot','penguin','pigeion','nightingale','ostrich','owl','hummingbird','hawk','falcon','albatross'];

const insects = ['caterpillar','cockroach','snail','spider'];

const reptiles = ['alligator','crocodile','iguana','snake'];

const category = [animals,birds,insects,reptiles];


// console.log(category[])

word_list = [
    {
        'type': 'Animal',
        'Array': animals
    },
    {
        'type': 'Bird',
        'Array': birds
    },
    {
        'type': 'Insect',
        'Array': insects
    },
    {
        'type': 'Reptiles',
        'Array': reptiles
    }
];
let randInt;
let word_object;
let rand_word;
let rand_category;
let omittedLetters = [];
let gameOver = false;
let mistakes = -1;
let score = 0;
let correct_array = [];
let arrayOfRandWord = [];
let loose = false;
let highScore = localStorage.getItem('highest');
let elementArray = [];
let generateLeft = 1;

// var score = 0;
// var highscore = localStorage.getItem("highscore");

function updateScore(){
    currentScore.innerHTML = score.toString();
    highestScore.innerHTML = highScore.toString();
    document.querySelector('.yourNewHighScore').innerHTML = highScore.toString();
    document.querySelector('.yourScoreValue').innerHTML = score.toString();
}

function updateHighScore(){
    if(highScore !== null){
        if (score > highScore) {
            localStorage.setItem("highest", score);      
        }
    }
    else{
        localStorage.setItem("highest", score);
    }
    highScore = localStorage.getItem('highest');
    highestScore.innerHTML = highScore.toString();
    // if(score > highScore){
    //     highScore = score;
    //     localStorage.setItem('highest', highScore);
    // }
    
}



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
updateHighScore();
updateScore();
function createRandomWord(){
    mistakes = -1;

    // getting a random rumber
    let randIntCategory = Math.floor(Math.random() * (category.length));
    // getting random object.
    word_object = word_list.find(word => word.Array === category[randIntCategory]);
    // getting the category of the random object.
    rand_category = word_object.type;
    hint_word.innerHTML = rand_category;
    // getting random number for getting random word
    let randIntWord = Math.floor(Math.random() * (category[randIntCategory].length));
    // getting random word using the number created.
    rand_word = word_object.Array[randIntWord]
    omittedLetters = [];

    arrayOfRandWord = rand_word.split('');
    correct_array = rand_word.split('');
    for(let i = 0; i < arrayOfRandWord.length - 1; i++){
        randInt = Math.ceil(Math.random() * arrayOfRandWord.length - 1)
        omittedLetters.push(arrayOfRandWord[randInt])
    }

    omittedLetters = [...new Set(omittedLetters)];

    console.log(omittedLetters)
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

let popEleIndex = 0;
createRandomWord();
let isPresent;

function check(valueGot,nameGot){
    // getting the value from clicked button
    let guess = valueGot.toLowerCase();
    let name = nameGot;

    isPresent = false;
    
    for(let i =0; i< omittedLetters.length; i++){
        if(guess === omittedLetters[i]){
            isPresent = true;
            let index = omittedLetters.indexOf(guess);
            omittedLetters.splice(index,1);     // removing the matched letter from the array.
            // console.log(omittedLetters);
            score++;    // increasing score for each correct guess.
            // inserting the correctly guessed letter into the array of rand_word.
            for(let i = 0; i < correct_array.length; i++){
                if(correct_array[i] === guess){
                    arrayOfRandWord[i] = guess;
                }
            }
            // printing the rand_word after inserting the letters.
            random_word.innerHTML = arrayOfRandWord.join('');
            if(rand_word ===  arrayOfRandWord.join('')){
                continue_popup.style.display = 'grid';
                // updateHighScore();
                gameOver = true;
                loose = false;
                break;
            }
            break;
        }
        
    }
    if(!isPresent){
        mistakes++;
        hangman_parts[mistakes].style.maxHeight = '100%';       
    }

    if (mistakes === hangman_parts.length - 1){
        console.log('mistakes',mistakes);
        // updateHighScore()
        // score = 0;
        correct_answer.innerHTML = rand_word;
        currentScore.innerHTML = score.toString();
        // console.log('sleep1');
        // sleep(2000);
        restart_popup.style.display = 'grid';
        if(score > highScore){
            updateHighScore();
            console.log(score,'in if')
            document.querySelector('.highScoreCreated').style.display = 'grid';
            document.querySelector('.yourScore').style.display = 'none';
        }
        // document.querySelector('.yourScoreValue').innerHTML = 
        // console.log('sleep2');
        loose = false
        gameOver = true;
    }
    // getting the element by name.It returns array of element so we used [0] to get the first element.
    let element = document.getElementsByName(nameGot)[0];
    element.disabled = true;
    // console.log(element)
    elementArray[popEleIndex]=element;
    console.log(elementArray.length,elementArray,popEleIndex);
    popEleIndex++;
    // currentScore.innerHTML = score.toString();
    updateScore();

}

function refreshHangman(){
    for(let i = 0;i < hangman_parts.length;i++){
        hangman_parts[i].style.maxHeight = '0';
    }
}


let poppedEle;
function reset(){
    continue_popup.style.display = 'none';
    restart_popup.style.display = 'none';

    // inputBtn.disabled = false;
    // console.log(reset);
    console.log(popEleIndex);
    // console.log(elementArray);

    while(popEleIndex>0){
        poppedEle = elementArray.shift();
        console.log(poppedEle,popEleIndex);
        poppedEle.disabled = false;
        popEleIndex--;
    }
}

function restartMethod(){
    updateScore();
    
    refreshHangman(); 
    createRandomWord();
    updateHighScore();
    reset();
    score = 0;
    updateScore();
    generateLeft = 1;
}

function continueMethod(){
    console.log(elementArray);
    refreshHangman(); 
    createRandomWord();
    // updateHighScore();
    reset();
    generateLeft = 1;
}

function generateLetter(){
    if(generateLeft > -1)
    {
        let getLetter = omittedLetters[generateLeft]
        check(getLetter,getLetter);
        generateLeft--;
    }
    else{
        console.log('else');
        document.querySelector('.noHintLeft').style.visibility = 'visible';
        setTimeout(function(){
            document.querySelector('.noHintLeft').style.visibility = 'hidden';
        },3000);
    }
}

