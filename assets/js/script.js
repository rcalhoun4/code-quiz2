const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const introElement = document.getElementById('intro');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);

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
    }
]