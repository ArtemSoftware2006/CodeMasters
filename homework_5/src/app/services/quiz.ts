import { IUserSelectedAnswer } from '../models/answer';
import { ICheckAnswer, IScore } from "../models/response";
import { post } from "./rest";

export async function checkAnswer(answer : IUserSelectedAnswer) : Promise<ICheckAnswer> {
    return await post<IUserSelectedAnswer, ICheckAnswer>("/check-answer", answer)
}

export async function getScore(answers : IUserSelectedAnswer[]) : Promise<IScore> {
    return await post<IUserSelectedAnswer[], IScore>("/calculate-score", answers)
}