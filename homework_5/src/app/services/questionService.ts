import { IQuestion } from "../models/question";
import { get } from "./rest";

export async function getQuestions() : Promise<IQuestion[]> {
    return await get<IQuestion[]>("/questions");
} 