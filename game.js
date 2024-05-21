const operations = ["+", "-", "*", "/"];

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let question, correctAnswer;

    if (operation === "+") {
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2}`;
    } else if (operation === "-") {
        correctAnswer = num1 - num2;
        question = `${num1} - ${num2}`;
    } else if (operation === "*") {
        correctAnswer = num1 * num2;
        question = `${num1} * ${num2}`;
    } else {
        correctAnswer = (num1 / num2).toFixed(2); // Keep two decimal places for division
        question = `${num1} / ${num2}`;
    }

    return { question, correctAnswer };
}

let currentQuestion, score = 0, questionCount = 0;

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback');

function showQuestion() {
    currentQuestion = generateQuestion();
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    feedbackContainer.textContent = '';

    let correctAnswerIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
        const button = document.createElement('button');
        button.classList.add('option');

        if (i === correctAnswerIndex) {
            button.textContent = currentQuestion.correctAnswer;
        } else {
            button.textContent = generateWrongAnswer(currentQuestion.correctAnswer);
        }

        button.onclick = () => checkAnswer(button.textContent);
        optionsContainer.appendChild(button);
    }
}

function generateWrongAnswer(correctAnswer) {
    let wrongAnswer;
    do {
        wrongAnswer = (Math.floor(Math.random() * 20) - 10 + parseFloat(correctAnswer)).toFixed(2);
    } while (wrongAnswer === correctAnswer);
    return wrongAnswer;
}

function checkAnswer(selected) {
    questionCount++;
    if (selected == currentQuestion.correctAnswer) {
        score++;
        feedbackContainer.textContent = 'Correct!';
        feedbackContainer.style.color = 'green';
    } else {
        feedbackContainer.textContent = `Wrong! The correct answer is ${currentQuestion.correctAnswer}`;
        feedbackContainer.style.color = 'red';
    }

    if (questionCount < 10) {
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(showFinalScore, 1000);
    }
}

function showFinalScore() {
    questionContainer.textContent = 'Quiz Over!';
    optionsContainer.innerHTML = '';
    feedbackContainer.textContent = `Your score is ${score} out of 10`;
}

showQuestion();
