import { NextButtonText } from './enums/nextButtonText';
import { IAnswer, IUserSelectedAnswer } from './models/answer';
import { IQuestion } from './models/question';
import { ICheckAnswer } from './models/response';
import { getQuestions } from './services/questionService';
import { checkAnswer, getScore } from './services/quiz';
import './styles/index.scss';

const nextButton = document.getElementById("nextBtn") as HTMLButtonElement
const wrapper = document.getElementById("wrapper") as HTMLDivElement
const answersDiv = document.getElementById("answersDiv") as HTMLDivElement
const questionText = document.getElementById("questionText") as HTMLDivElement

let userAnswers: IUserSelectedAnswer[] = [];
let questions: IQuestion[] = [];
let currentQuestionIndex = 1;
let miliseconds = 0;
let timer : NodeJS.Timeout;
let isTimerStart : boolean = false;

window.addEventListener("DOMContentLoaded", initialization)

async function initialization() {

    timer = setInterval(tick, 100)
    isTimerStart = true;

    questions = await getQuestions();
    showQuestion(currentQuestionIndex)
    nextButton?.addEventListener("click", nextButtonClickHandler)
}

async function nextButtonClickHandler() {
    currentQuestionIndex++

    if (currentQuestionIndex <= questions.length) {
        if (!isTimerStart) {
            timer = setInterval(tick, 100)
        }

        isTimerStart = true;

        nextButton.innerText = NextButtonText.next
        resetState()
        showQuestion(currentQuestionIndex)
    }
    else {
        currentQuestionIndex = 0;
        userAnswers = [];
        resetState()

        const score = await getScore(userAnswers)
        questionText.innerText = score.score.toString()

        clearInterval(timer)

        const timeDiv = document.createElement("div");
        timeDiv.innerText = "Time : " + miliseconds / 1000 + "s"
        answersDiv.appendChild(timeDiv);

        isTimerStart = false;
        miliseconds = 0;

        nextButton.style.display = 'block'
        nextButton.innerText = NextButtonText.playAgain
    }
}

function resetState() {
    nextButton.style.display = 'none';

    questionText.innerText = NextButtonText.finish

    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild)
    }
}

function showQuestion(index: number) {
    questionText.innerText = questions[index - 1].text;

    questions[index - 1].answers.forEach(answer => {
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

    const answerId = answerBtn.dataset.id;

    if (userAnswers.find(item => item.questionId == currentQuestionIndex)) {
        return
    }

    const resultCheckAnswer: ICheckAnswer =
        await checkAnswer({ answerId: Number(answerId), questionId: currentQuestionIndex });

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
        questionId: currentQuestionIndex
    })

    nextButton.style.display = 'block'
}

function tick() {
    miliseconds += 100;
    //console.log(miliseconds)
}