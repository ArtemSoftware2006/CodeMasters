import { NextButtonText } from './enums/nextButtonText';
import { IAnswer, IUserSelectedAnswer } from './models/answer';
import { IQuestion } from './models/question';
import { ICheckAnswer } from './models/response';
import { getQuestions } from './services/questionService';
import { checkAnswer, getScore } from './services/quiz';
import { Timer } from './services/timer';
import './styles/index.scss';

export class App {
    public nextButton : HTMLButtonElement // ИСПРАВЛЕННО!!! Всегда в конце строк используй ;, это обязательно
    public hintButton : HTMLButtonElement;
    public wrapper : HTMLDivElement;
    public answersDiv : HTMLDivElement;
    public questionText : HTMLDivElement;
    public questionDiv : HTMLDivElement;   

    public isHintShow : boolean;
    public currentQuestionIndex : number;
    public userAnswers: IUserSelectedAnswer[];
    public questions: IQuestion[];
    public timer : Timer;

    constructor() {
        this.nextButton = document.getElementById("nextBtn") as HTMLButtonElement; // ИСПРАВЛЕННО!!! Всегда в конце строк используй ;, это обязательно
        this.hintButton = document.getElementById("hintBtn") as HTMLButtonElement;
        this.wrapper = document.getElementById("wrapper") as HTMLDivElement;
        this.answersDiv = document.getElementById("answersDiv") as HTMLDivElement;
        this.questionText = document.getElementById("questionText") as HTMLDivElement;
        this.questionDiv = this.questionText.parentElement as HTMLDivElement;   
        
        this.isHintShow = false;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.questions = [];
        this.timer = new Timer();

        this.initialization = this.initialization.bind(this)
        this.nextButton.addEventListener("click", this.initialization);
    } 

    public start() {
        this.nextButton.style.display = 'block';
        this.hintButton.style.display = 'none';
    
        this.questionText.innerText = "Готовы пройти увлекательный квест?";
    
        this.nextButton.innerHTML = NextButtonText.start;
    }
    
    public async initialization() {
        this.hintButton.style.display = "block"; // ИСПРАВЛЕННО!!! Будь аккуратен с пробелами, это может привести к ошибкам. Тут ошибки не будет, но он не нужен
        this.nextButton.style.display = "none"
        this.nextButton.innerText = NextButtonText.next;
        this.timer.start();

        this.hintButton.addEventListener("click", () => this.clickHintButton())

        this.questions = await getQuestions();
        this.showQuestion(this.currentQuestionIndex);

        this.nextButton.removeEventListener("click", this.initialization)
        this.nextButton.addEventListener("click", this.nextButtonClickHandler.bind(this));
    }

    public clickHintButton() {
        if(this.isHintShow) {
            return;
        }

        this.isHintShow = true;

        this.questionDiv.appendChild(this.createHint());
    }

    public createHint() {
        const hintDiv = document.createElement("p");

        hintDiv.innerText = this.questions[this.currentQuestionIndex].hint;
        hintDiv.classList.add("question__hint");

        return hintDiv;
    }

    public async nextButtonClickHandler() {    

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.goToNextQuestion();
        }
        else {
            this.resetState();
            
            await this.showScore() //ИСПРАВЛЕННО!!! Советую посмотреть https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals, синтаксис удобнее и безопаснее
    
            const miliseconds = this.timer.stop();
            const timeDiv = document.createElement("div");
            timeDiv.innerText = `Время : ${miliseconds / 1000} с`
            this.answersDiv.appendChild(timeDiv);
    
            this.nextButton.style.display = 'block';
            this.hintButton.style.display = 'none';
            this.nextButton.innerText = NextButtonText.playAgain;
            
            //-1, так как при начале квиза мы сразу инкрементируем currentQuestionIndex
            this.currentQuestionIndex = -1;
            this.userAnswers = [];
        }
    }

    public async showScore() {
        const score = await getScore(this.userAnswers);

        this.wrapper.style.textAlign = 'center';
        this.questionText.innerText = `Поздравляю! Вы прошли квиз! \nВаш результат :
            ${score.score.toString()} из ${this.questions.length }`;

        this.nextButton.style.display = 'block';
        this.hintButton.style.display = 'none';
        this.nextButton.innerText = NextButtonText.playAgain;
    }

    public goToNextQuestion() {
        this.currentQuestionIndex++;
        
        this.wrapper.style.textAlign = 'left';
        this.hintButton.style.display = "block";
        this.isHintShow = false;
        this.nextButton.innerText = NextButtonText.next;

        if (!this.timer.getIsStart()) {
            this.timer.start();
        }

        this.resetState();
        this.showQuestion(this.currentQuestionIndex);
    }

    public resetState() {
        this.nextButton.style.display = 'none';
        
        Array.from(this.questionDiv.children)
        .forEach(item => {
            if ((item as HTMLParagraphElement).classList?.contains("question__hint")) {
                this.questionDiv.removeChild(item);
            }
        });
        
        this.questionText.innerText = NextButtonText.finish;
    
        while (this.answersDiv.firstChild) {
            this.answersDiv.removeChild(this.answersDiv.firstChild);
        }
    }
    
    public showQuestion(index: number) {
        this.questionText.innerText = this.questions[index].text;
    
        this.questions[index].answers.forEach(answer => {
            this.createButton(answer);
        })
    }
    
    public createButton(answer: IAnswer) {
        const answerBtn = document.createElement("button");
    
        answerBtn.type = 'button';
        answerBtn.innerText = answer.text;
        answerBtn.classList.add('button', 'button__answer');
        answerBtn.dataset.id = answer.id.toString();
    
        this.answersDiv.appendChild(answerBtn);
    
        answerBtn.addEventListener("click", this.selectAnswer.bind(this));
    }
    public async selectAnswer(e: MouseEvent) {
        const answerBtn = e.target as HTMLButtonElement;
    
        if (!answerBtn.dataset.id) {
            throw Error("Id answer do not set");
        }
    
        if (this.userAnswers.find(item => item.questionId == this.currentQuestionIndex + 1)) {
            throw Error("Id question do not set");
        }
    
        const answerId = answerBtn.dataset.id;
    
        const resultCheckAnswer: ICheckAnswer =
            await checkAnswer({ answerId: Number(answerId), questionId: this.currentQuestionIndex + 1});
    
        if (resultCheckAnswer.isCorrect) {
            answerBtn.classList.add('button__answer_true');
            this.wrapper.classList.add("wrapper_true-answer");
    
            setTimeout(() => {
                this.wrapper.classList.remove('wrapper_true-answer');
            }, 2000);
        }
        else {
            answerBtn.classList.add('button__answer_false');
            this.wrapper.classList.add('wrapper_false-answer');
    
            setTimeout(() => {
                this.wrapper.classList.remove('wrapper_false-answer');
            }, 2000)
    
            Array.from(this.answersDiv.children)
                .filter(item => item instanceof HTMLButtonElement)
                .forEach(b => {
                    const button = b as HTMLButtonElement;
                    if (!button.dataset.id) {
                        throw Error("Id answer do not set");
                    }
                    if (Number(button.dataset.id) === resultCheckAnswer.rightAnswer) {
                        button.classList.add('button__answer_true');
                    }
                });
        }
        
        this.userAnswers.push({
            answerId: Number(answerId),
            questionId: this.currentQuestionIndex + 1
        });
    
        this.nextButton.style.display = 'block';
    }
}



window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
});
