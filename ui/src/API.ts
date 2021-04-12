import {shuffle} from "./utils";

export type Question = {
    category: string
    correct_answer: string
    difficulty: Difficulty
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & { answers: string[] }

export type Category = {
    id: number,
    name: string
}

export enum Difficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard',
    ANY = 'Any'
}

export enum NumberOfQuestions {
    FIVE = 5,
    TEN = 10,
    FIFTEEN = 15,
    TWENTY = 20,
    THIRTY = 30
}

export const fetchQuestions = async (category: string, nbOfQuestions: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    if (category === 'ALL') {
        category = ''
    }
    const endpoint = `https://opentdb.com/api.php?amount=${nbOfQuestions}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    console.log(data)
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffle([...question.incorrect_answers, question.correct_answer])
        }
    ))
}

export const fetchCategories = async (): Promise<Category> => {
    const endpoint = `https://opentdb.com/api_category.php`
    const data = await (await fetch(endpoint)).json()
    console.log(data)
    return data.results.map((cat: any) => cat.name)
}