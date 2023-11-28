import { create, router as _router, defaults, bodyParser } from 'json-server'
const server = create()
const router = _router('data/db.json')
const middlewares = defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(bodyParser)

server.post('/check-answer', (request, response) => {
    const questions = router.db.get("questions").value()
    const userAnswerId = request.body.answerId
    const questionId = request.body.questionId

    console.log(questions)

    const question = questions.find(item => item.id === questionId)

    const rightAnswer = question.answers.find(item => item.isCorrect)

    const isCorrect = rightAnswer === userAnswerId

    response.json({
        isCorrect : isCorrect,
        rightAnswer : rightAnswer
    })
})

server.post('/calculate-score', (request, response) => {
    const questions = router.db.get("questions").value()
    const userAnswers = request.body.answers
    let score = 0
    
    userAnswers.forEach(answer => {
        const question = questions.find(item => item.id === answer.questionId)
        const rightAnswer = question.answers.find(item => item.isCorrect)

        if (rightAnswer === answer.answerId) {
            score++;
        }
    });

    return response.json({
        score : score
    })

})

// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
