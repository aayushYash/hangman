const docBody = document.querySelector('body');

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
const audio = document.querySelector('audio');
const audio2 = document.querySelector('.audio2');

const checkBtn = document.querySelector('#check');
const resetBtn = document.querySelector('#reset');
const timer = document.querySelector('.setTimer');
const hint_word = document.querySelector('.hintWord');
const hint_word_btn = document.querySelector('.hintBtn');

let correct_answer = document.querySelectorAll('.correct_answer');
const restart_popup = document.querySelector('#restart_popup');
const continue_popup = document.querySelector('#continue_popup');

const darkBtn = document.querySelector('.darkBtn');
const brightBtn = document.querySelector('.brightBtn');


let allInputBtn = document.querySelectorAll('.inputBtn');


const backgroundAudio = document.querySelector('.audio3');


backgroundAudio.volume = 0.3;


const hangman_parts = [head, body, left_hand, right_hand, left_leg, right_leg];
correct_answer = [...correct_answer];
allInputBtn = [...allInputBtn];
// console.log(correct_answer);
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

const birds = ['vulture','parrot','penguin','pigeion','nightingale','ostrich','owl','hummingbird','hawk','falcon','albatross','eagle','peacock','crow','sparrow','bat','woodpecker','duck','flamingo'];

const insects = ['caterpillar','cockroach','snail','spider','beetle','butterfly','bug','bee','ant','dragonfly','cricket','grasshopper','mosquito','locust','wasp'];

const reptiles = ['alligator','crocodile','iguana','snake','anaconda','python','lizard','chameleon','tortoise','turtle'];

const country = ['afghanistan','argentina','bangladesh','belgium','bhutan','brazil','india','pakistan','nepal','japan','china','chile','cuba','denmark','egypt','finland','france','germany','greece','iran','iraq','ireland','israel','italy','kenya','mexico','netherlands','nigeria','poland','russia','spain','syria','thailand','yemen','zambia','zimbabwe'];

const colors = ['red','blue','orange','purple','pink','white','black','grey','yellow','green'];

const languages = ['english','hindi','french','chinese','japanese','bangali','russian','punjabi','marathi','turkish','korean','telugu','tamil','urdu','gujarati','bhojpuri','odia','arabic','dutch','nepali','assamese'];

const indian_states = ['assam','bihar','chhattisgarh','delhi','goa','gujarat','haryana','jharkhand','karnataka','kerala','maharashtra','manipur','meghalaya','mizoram','nagaland','orissa','punjab','rajasthan','sikkim','telangana','tripura','uttarakhand'];

const indian_territory = ['puducherry','lakshadweep','chandigarh'];


const alreadyCreated = [];


const category = [animals,birds,insects,reptiles,country,colors,languages,indian_states,indian_territory];


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
    },
    {
        'type': 'Country',
        'Array': country
    },
    {
        'type': 'Colour',
        'Array': colors
    },
    {
        'type': 'Language',
        'Array': languages
    },
    {
        'type': 'Indian State',
        'Array': indian_states
    },
    {
        'type': 'Indian Union Territory',
        'Array': indian_territory
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
let generateLeft = 1;


function toggleMode(){
    if(docBody.classList.contains('dark')){
        docBody.classList.remove('dark');
        darkBtn.style.display = 'block';
        brightBtn.style.display = 'none';
    }
    else{
        docBody.classList.add('dark');
        darkBtn.style.display = 'none';
        brightBtn.style.display = 'block';
    }
    audio.src = 'game_sounds/tap.wav';
    audio.play();
}

function countdown(){
    setTimeout(function(){
        audio2.src = 'game_sounds/countdown2.mp3';
        audio2.play();
    },1000)
    // console.log('contdownfunct');
}

function disableAllBtn(){
    for(let i = 0; i < allInputBtn.length; i++){
        allInputBtn[i].disabled = true;
    }
}

function enableAllBtn(){
    for(let i = 0; i < allInputBtn.length; i++){
        allInputBtn[i].disabled = false;
    }
}


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
function setTimer(seconds) {
    timer.style.display = 'block';
    // console.log('countdown');
    let time = setInterval(function(){
        if(seconds < 1){
            clearInterval(time);
            timer.innerHTML = '..';
            timer.style.display = 'none';
            createRandomWord();
            enableAllBtn();
        }
        timer.innerHTML = `New Word In ${seconds}`;
        seconds--;
        
    },1000);


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
    hint_word.innerHTML = rand_category.toUpperCase();
    // getting random number for getting random word
    let randIntWord = Math.floor(Math.random() * (category[randIntCategory].length));
    // getting random word using the number created.
    rand_word = word_object.Array[randIntWord]
    // console.log(rand_word);
    // console.log(alreadyCreated);
    if(alreadyCreated.includes(rand_word)){
        createRandomWord();
    }
    else{
        alreadyCreated.push(rand_word);
    }
    omittedLetters = [];

    arrayOfRandWord = rand_word.split('');
    correct_array = rand_word.split('');
    for(let i = 0; i < arrayOfRandWord.length - 1; i++){
        randInt = Math.ceil(Math.random() * arrayOfRandWord.length - 1)
        omittedLetters.push(arrayOfRandWord[randInt])
    }

    omittedLetters = [...new Set(omittedLetters)];

    // console.log(omittedLetters)
    for(let i = 0; i < omittedLetters.length; i++){
        for(let j = 0; j < arrayOfRandWord.length; j++){
            if(omittedLetters[i] === arrayOfRandWord[j]){
                // console.log(i,omittedLetters[i],j,arrayOfRandWord[j]);
                arrayOfRandWord[j] = '_';

            }
        }
    }

    random_word.innerHTML = arrayOfRandWord.join('').toUpperCase();
    gameOver = false;

    for(let i = 0;i < correct_answer.length;i++){
        correct_answer[i].innerHTML = rand_word.toUpperCase();
    }
}

createRandomWord();
let isPresent;

function check(valueGot,nameGot){
    audio.src = 'game_sounds/click.wav';
    audio.play();
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
            random_word.innerHTML = arrayOfRandWord.join('').toUpperCase();
            if(rand_word ===  arrayOfRandWord.join('')){
                // correct_answer[1].innerHTML = rand_word;
                continue_popup.style.display = 'grid';
                // updateHighScore();
                gameOver = true;
                loose = false;
                audio.src = 'game_sounds/correct_word.wav';
                audio.play();
                break;
            }
            audio.src = 'game_sounds/correct_guess.wav';
            audio.play();
            break;
        }
        
    }
    if(!isPresent){
        mistakes++;
        hangman_parts[mistakes].style.maxHeight = '100%';     
        audio.src = 'game_sounds/wrong_guess.wav';
        audio.play();  
    }

    if (mistakes === hangman_parts.length - 1){
        // console.log('mistakes',mistakes);
        // updateHighScore()
        // score = 0;
        // correct_answer.innerHTML[0] = rand_word;
        currentScore.innerHTML = score.toString();
        // console.log('sleep1');
        // sleep(2000);
        restart_popup.style.display = 'grid';
        if(score > highScore){
            updateHighScore();
            // console.log(score,'in if')
            document.querySelector('.highScoreCreated').style.display = 'grid';
            document.querySelector('.yourScore').style.display = 'none';
            audio.src = 'game_sounds/newHighScore.wav';
            audio.play(); 
        }
        else{
            updateHighScore();
            // console.log(score,'in if')
            document.querySelector('.highScoreCreated').style.display = 'none';
            document.querySelector('.yourScore').style.display = 'grid';
            audio.src = 'game_sounds/game_over.wav';
            audio.play();
        }
        // document.querySelector('.yourScoreValue').innerHTML = 
        // console.log('sleep2');
        loose = false
        gameOver = true;
    }
    // getting the element by name.It returns array of element so we used [0] to get the first element.
    let element = document.getElementsByName(nameGot)[0];
    element.disabled = true;
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
    disableAllBtn();
    // inputBtn.disabled = false;
    // console.log(reset);
    // console.log(popEleIndex);
    // console.log(elementArray);
    countdown();
    setTimer(3);


    // while(popEleIndex>0){
    //     poppedEle = elementArray.shift();
    //     console.log(poppedEle,popEleIndex);
    //     poppedEle.disabled = false;
    //     popEleIndex--;
    // }
}

function restartMethod(){
    updateScore();
    
    refreshHangman(); 
    random_word.innerHTML = '';
    hint_word.innerHTML = '';
    // setTimeout(function(){
    //     createRandomWord();
    // }, 5000)
    // createRandomWord();
    updateHighScore();
    reset();
    score = 0;
    updateScore();
    generateLeft = 1;
    audio.src = 'game_sounds/tap.wav';
    audio.play();
}

function continueMethod(){
    refreshHangman(); 
    random_word.innerHTML = '';
    hint_word.innerHTML = '';
    // setTimeout(() => {
    //     createRandomWord();
    // }, 5000); 
    // updateHighScore();
    reset();
    generateLeft = 1;
    audio.src = 'game_sounds/tap.wav';
    audio.play();
    // setTimer(5);
}

function generateLetter(){
    if(generateLeft > -1)
    {
        let getLetter = omittedLetters[generateLeft]
        check(getLetter,getLetter);
        generateLeft--;
    }
    else{
        // console.log('else');
        document.querySelector('.noHintLeft').style.visibility = 'visible';
        setTimeout(function(){
            document.querySelector('.noHintLeft').style.visibility = 'hidden';
        },3000);
    }
    // score -= 1;
    audio.src = 'game_sounds/tap.wav';
    audio.play();
}

function save(){
    updateHighScore();
    updateScore();
    audio.src = 'game_sounds/tap.wav';
    audio.play();
}


const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
// console.log(typeof backgroundAudio.ariaDisabled);
function music(){
    if(backgroundAudio.ariaDisabled === 'false'){
        backgroundAudio.ariaDisabled = 'true';
        backgroundAudio.pause();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }
    else{
        backgroundAudio.ariaDisabled = 'false';
        backgroundAudio.play();
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    }
    audio.src = 'game_sounds/tap.wav';
    audio.play();

}
