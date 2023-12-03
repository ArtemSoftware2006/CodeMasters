const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)

server.post('/check-answer', (request, response) => {
    const questions = router.db.get("questions").value()
    const userAnswerId = request.body.answerId
    const questionId = request.body.questionId

    const question = questions.find(item => item.id == questionId)
    const rightAnswer = question.answers.find(item => item.correct).id

    const isCorrect = rightAnswer == userAnswerId

    response.json({
        isCorrect : isCorrect,
        rightAnswer : rightAnswer
    })
})

server.post('/calculate-score', (request, response) => {
    const questions = router.db.get("questions").value()
    const userAnswers = request.body
    let score = 0
    
    userAnswers.forEach(answer => {
        const question = questions.find(item => item.id == answer.questionId)
        const rightAnswer = question.answers.find(item => item.correct).id

        if (rightAnswer == answer.answerId) {
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
