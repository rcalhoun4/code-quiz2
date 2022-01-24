const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const introElement = document.getElementById('intro');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreButton = document.getElementById('score-btn');

var score = 0;
var highscore = localStorage.getItem('highscore');


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    introElement.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        
        button.innerText = answer.text;
        
        button.classList.add('btn');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    let answerBtn = document.querySelectorAll('.answer-btn');
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    setStatusClass(selectedButton, correct);

    if (correct) {
        score = score + 10;
        console.log(score);

    } else if (score > 0) {
        score = score - 5;
        console.log(score);

    } else if (score <= 0) {
        score = 0
        console.log(score);
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');

    } else {
        scoreButton.classList.remove('hide');
        scoreButton.addEventListener('click', scoreBoard);

    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);

    if (correct) {
        element.classList.add('correct');
    
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function scoreBoard() {

}

const questions = [
    {
        question: 'Who is considered the father of the Final Fantasy series?',
        answers: [
            {text: 'Hironobu Sakaguchi', correct: true},
            {text: 'Nobuo Uematsu', correct: false},
            {text: 'Akira Toriyama', correct: false},
            {text: 'Tokugawa Ieyasu', correct: false}
        ]
    },

    {
        question: 'Who is the main character of Final Fantasy IX?',
        answers: [
            {text: 'Cloud Strife', correct: false},
            {text: 'Cecil Harvey', correct: false},
            {text: 'Zidane Tribal', correct: true},
            {text: 'Squall Leonhart', correct: false}
        ]
    },

    {
        question: 'What does Sephiroth summon to destory the planet in Final Fantasy VII?',
        answers: [
            {text: 'Bahamut', correct: false},
            {text: 'Meteor', correct: true},
            {text: 'Chocobo', correct: false},
            {text: 'Cid', correct: false}
        ]
    },

    {
        question: 'Who was the first party member to die in the Final Fantasy series?',
        answers: [
            {text: 'Aerith', correct: false},
            {text: 'Galuf', correct: false},
            {text: 'Tellah', correct: false},
            {text: 'Josef', correct: true}
        ]
    }
]