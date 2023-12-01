export interface IAnswer {
    id : number
    text : string
    isCorrect : boolean
}

export interface IUserSelectedAnswer {
    answerId : number
    questionId : number
}