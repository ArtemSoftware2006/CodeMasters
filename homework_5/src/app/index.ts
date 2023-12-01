import { NextButtonText } from './enums/nextButtonText';
import { IAnswer, IUserSelectedAnswer } from './models/answer';
import { IQuestion } from './models/question';
import { ICheckAnswer } from './models/response';
import { getQuestions } from './services/questionService';
import { checkAnswer, getScore } from './services/quiz';
import { Timer } from './services/timer';
import './styles/index.scss';

const nextButton = document.getElementById("nextBtn") as HTMLButtonElement // Всегда в конце строк используй ;, это обязательно
const hintButton = document.getElementById("hintBtn") as HTMLButtonElement
const wrapper = document.getElementById("wrapper") as HTMLDivElement
const answersDiv = document.getElementById("answersDiv") as HTMLDivElement
const questionText = document.getElementById("questionText") as HTMLDivElement
const questionDiv = questionText.parentElement as HTMLDivElement

let isHintShow = false;
let userAnswers: IUserSelectedAnswer[] = [];
let questions: IQuestion[] = [];
let currentQuestionIndex = 0;
const timer : Timer = new Timer();

window.addEventListener("DOMContentLoaded", start)

function start() {
    nextButton.style.display = 'block'
    hintButton.style.display = 'none'

    questionText.innerText = "Готовы пройти увлекательный квест?"

    nextButton.innerHTML = NextButtonText.start

    nextButton.addEventListener("click", initialization)
}

async function initialization() {

    hintButton.style.display = " block" // Будь аккуратен с пробелами, это может привести к ошибкам. Тут ошибки не будет, но он не нужен
    timer.start()

    hintButton.addEventListener("click", () => {

        if(isHintShow) {
            return
        }

        isHintShow = true;
        // Всё что ниже можно вынести в функцию отдельную, showHint, например
        const hintDiv = document.createElement("p")

        hintDiv.innerText = questions[currentQuestionIndex].hint;
        hintDiv.classList.add("question__hint")

        questionDiv.appendChild(hintDiv)
    })

    questions = await getQuestions();
    showQuestion(currentQuestionIndex)

    nextButton.removeEventListener("click", initialization)
    nextButton.addEventListener("click", nextButtonClickHandler)
}

async function nextButtonClickHandler() {
    currentQuestionIndex++

    if (currentQuestionIndex < questions.length) {
        wrapper.style.textAlign = 'left'
        hintButton.style.display = "block"
        isHintShow = false

        if (!timer.getIsStart()) {
            timer.start()
        }

        nextButton.innerText = NextButtonText.next
        resetState()
        showQuestion(currentQuestionIndex)
    }
    else {
        resetState()
        
        const score = await getScore(userAnswers)

        wrapper.style.textAlign = 'center'
        questionText.innerText = "Поздравляю! Вы прошли квиз! \nВаш результат : " + score.score.toString() + " из " + questions.length // Советую посмотреть https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals, синтаксис удобнее и безопаснее

        const miliseconds = timer.stop();
        const timeDiv = document.createElement("div");
        timeDiv.innerText = "Время : " +  miliseconds / 1000 + " с"
        answersDiv.appendChild(timeDiv);

        nextButton.style.display = 'block'
        hintButton.style.display = 'none'
        nextButton.innerText = NextButtonText.playAgain

        currentQuestionIndex = 0;
        userAnswers = [];
    }
}

function resetState() {
    nextButton.style.display = 'none';
    
    Array.from(questionDiv.children)
    .forEach(item => {
        if ((item as HTMLParagraphElement).classList?.contains("question__hint")) {
            console.log(item) // Оставлять console.log считается не очень з
            questionDiv.removeChild(item)
        }
    })
    
    questionText.innerText = NextButtonText.finish

    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild)
    }
}

function showQuestion(index: number) {
    questionText.innerText = questions[index].text;

    questions[index].answers.forEach(answer => {
        createButton(answer)
    })
}

function createButton(answer: IAnswer) {
    const answerBtn = document.createElement("button");

    answerBtn.type = 'button'
    answerBtn.innerText = answer.text
    answerBtn.classList.add('button', 'button__answer')
    answerBtn.dataset.id = answer.id.toString();

    answersDiv.appendChild(answerBtn)

    answerBtn.addEventListener("click", selectAnswer)
}

async function selectAnswer(e: MouseEvent) {
    const answerBtn = e.target as HTMLButtonElement;

    if (!answerBtn.dataset.id) {
        throw Error("Id answer do not set")
    }

    if (userAnswers.find(item => item.questionId == currentQuestionIndex + 1)) {
        throw Error("Id question do not set")
    }

    const answerId = answerBtn.dataset.id;

    const resultCheckAnswer: ICheckAnswer =
        await checkAnswer({ answerId: Number(answerId), questionId: currentQuestionIndex + 1});

    if (resultCheckAnswer.isCorrect) {
        answerBtn.classList.add('button__answer_true')
        wrapper.classList.add("wrapper_true-answer")

        setTimeout(() => {
            wrapper.classList.remove('wrapper_true-answer')
        }, 2000)
    }
    else {
        answerBtn.classList.add('button__answer_false')
        wrapper.classList.add('wrapper_false-answer')

        setTimeout(() => {
            wrapper.classList.remove('wrapper_false-answer')
        }, 2000)

        Array.from(answersDiv.children)
            .filter(item => item instanceof HTMLButtonElement)
            .forEach(b => {
                const button = b as HTMLButtonElement;
                if (!button.dataset.id) {
                    throw Error("Id answer do not set")
                }
                if (Number(button.dataset.id) === resultCheckAnswer.rightAnswer) {
                    button.classList.add('button__answer_true');
                }
            })
    }

    userAnswers.push({
        answerId: Number(answerId),
        questionId: currentQuestionIndex + 1
    })

    nextButton.style.display = 'block'
}
