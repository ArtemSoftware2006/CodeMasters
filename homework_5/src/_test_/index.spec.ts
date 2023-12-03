import { App } from "../app";
import * as questionService from '../app/services/questionService' 
import * as quizService from '../app/services/quiz'
import { IQuestion } from "../app/models/question";
import { NextButtonText } from "../app/enums/nextButtonText";

const questionsStub : IQuestion[] = [
    {
        "id": 1,
        "text": "Столица России (на 2023 год)?",
        "hint" : "Ныняшняя столица России основана в 1147 году Юрием Долгоруким",
        "answers": [
            {
                "id": 1,
                "text": "Москва",
                "isCorrect": true
            },
            {
                "id": 2,
                "text": "Санкт-Петербург",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "Минск",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "Краснодар",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 2,
        "text": "Какого изотопа водорода не существует?",
        "hint" : "Сергей Пантелеевич Мавроди (11 августа 1955 — 26 марта 2018) — российский основатель нескольких финансовых пирамид, политический деятель и писатель",
        "answers": [
            {
                "id": 1,
                "text": "Тритий",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "Дейтерий",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "Протий",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "Мавродий",
                "isCorrect": true
            }
        ]
    },
]


describe('App', () => {
    let app : App;

    beforeEach(() => {
        document.body.innerHTML = `
        <div class="wrapper" id="wrapper">
            <div class="app wrapper__app">
                <h2 class="app__title">Квиз</h2>
                <div class="question">
                    <h4 class="question__text" id="questionText"></h4>
                    <div class="question__answers" id="answersDiv"></div>
                    <button class="button button__hint" id="hintBtn">Подсказка</button>
                </div>

                <button class="app__button button" id="nextBtn">Дальше</button>
            </div>
        </div>
        `;

        app = new App();

        jest.spyOn(questionService, 'getQuestions')
            .mockReturnValue(Promise.resolve(questionsStub));
    })

    it("should get questions from service after init", async () => {
        expect(app.questions.length).toEqual(0);

        await app.initialization();

        expect(app.questions.length).toEqual(2);
        expect(app.questions[0].id).toEqual(1);
        expect(app.questions[1].id).toEqual(2);
    })

    it("should show questions after initialization", async () => {
        const startQuizStub = jest.spyOn(app, "showQuestion").mockImplementation();

        await app.initialization();

        expect(startQuizStub).toHaveBeenCalledTimes(1);
    })

    it("should add eventListener initialization on nextButton", async () => {
        let object = new App();
        const nextBtnEventListener = jest.spyOn(object.nextButton, "addEventListener").mockImplementation();

        object = new App();

        expect(nextBtnEventListener).toHaveBeenCalledWith("click", object.initialization);
    })

    it("should remove eventListener and add nextButtonClickHandler on nextButton after first click", async () => {
        const nextButtonRemoveEventListener = jest.fn();
        const nextButtonAddEventListener = jest.fn();
      
        jest.spyOn(app.nextButton, "removeEventListener").mockImplementation(nextButtonRemoveEventListener);
        jest.spyOn(app.nextButton, "addEventListener").mockImplementation(nextButtonAddEventListener);
      
        await app.initialization();
      
        //TODO Спросить у Ромы, что делать, чтобы проверить, что функция bind с нужным объектом
        expect(nextButtonRemoveEventListener).toHaveBeenCalledWith("click", app.initialization);
        expect(nextButtonAddEventListener).toHaveBeenCalledWith("click", app.nextButtonClickHandler)
      })

      it("should increment index when go to next question", async () => {
        await app.initialization()

        const initialQuestionIdx = app.currentQuestionIndex;
        app.goToNextQuestion();

        expect(app.currentQuestionIndex).toEqual(initialQuestionIdx + 1);
      })

      it("should show score currectly", async () => {
        jest.spyOn(quizService, "getScore")
            .mockReturnValue(Promise.resolve({score: 1}));

        await app.initialization()

        app.userAnswers.push({questionId : 1, answerId : 1})

        await app.showScore()

        expect(app.questionText.innerText).toEqual(`Поздравляю! Вы прошли квиз! \nВаш результат :
            1 из 2`)
        expect(app.wrapper.style.textAlign).toEqual('center')
        expect(app.nextButton.innerText).toEqual(NextButtonText.playAgain)
        expect(app.hintButton.style.display).toEqual("none")
      });

      it('should reset state and start quiz again', async () => {
            await app.initialization();

            app.currentQuestionIndex = app.questions.length;
            //await app.showScore();
            await app.nextButtonClickHandler();

            expect(app.currentQuestionIndex).toEqual(-1);
            expect(app.userAnswers.length).toEqual(0)
        });

        it('should show question when calling showQuestion', async () => {
            await app.initialization();
    
            app.showQuestion(0);
    
            expect(app.questionText.innerText).toEqual('Столица России (на 2023 год)?');
        });

        it('should handle click on answer button', async () => {
            jest.spyOn(quizService, 'checkAnswer')
                .mockReturnValue(Promise.resolve({isCorrect: true, rightAnswer: 1}));
            app.questions = questionsStub;
            app.currentQuestionIndex = 0;

            const answerBtn = document.createElement("button") as HTMLButtonElement;
    
            answerBtn.type = 'button';
            answerBtn.classList.add('button', 'button__answer');
            answerBtn.dataset.id = '1';
    
            app.answersDiv.appendChild(answerBtn);
    
            jest.spyOn(app, 'goToNextQuestion').mockImplementation(jest.fn());
    
            await app.selectAnswer({ target: answerBtn } as unknown as MouseEvent);
    
            expect(answerBtn.classList.contains('button__answer_true')).toBeTruthy();
            expect(app.nextButton.style.display).toEqual('block');
            expect(app.userAnswers.length).toEqual(1);
        });
    }
)