import { IAnswer } from './models/answer';
import { IQuestion } from './models/question';
import { getQuestions } from './services/questionService';
import './styles/index.scss';

const nextButton = document.getElementById("nextBtn") as HTMLButtonElement
const answersDiv = document.getElementById("answersDiv") as HTMLDivElement
const questionText = document.getElementById("questionText") as HTMLDivElement

let questions : IQuestion[] = [];
let currentQuestionIndex = 0;
async function initialization() {
    nextButton?.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++
        }
        else {
            currentQuestionIndex = 0
        }
    })
}

function showQuestion(index : number) {
    questionText.innerText = questions[index].text;

    questions.forEach(question => {
        const answerBtn = document.createElement("button");
        answerBtn.type = 'button'
        answerBtn.innerText = question.answers[index].text
    });
}

function createButton(answer : IAnswer) {
    const answerBtn = document.createElement("button");
    answerBtn.type = 'button'
    answerBtn.innerText = answer.text
    answerBtn.classList.add('button button__answer')
    answerBtn.dataset.id = answer.id.toString();

    answersDiv.appendChild(answerBtn)

    answerBtn.addEventListener("click", selectAnswer)
}

function selectAnswer(e : MouseEvent) {

}