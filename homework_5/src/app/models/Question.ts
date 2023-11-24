import { IAnswer } from "./Answer"

export interface IQuestion {
    id : number 
    text : string
    answer : IAnswer[]
}