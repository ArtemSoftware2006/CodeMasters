import { IAnswer } from "./answer"

export interface IQuestion {
    id : number 
    text : string
    hint : string
    answers : IAnswer[]
}