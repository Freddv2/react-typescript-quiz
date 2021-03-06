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
    ANY = 'Any',
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard'
}

export enum NumberOfQuestion {
    FIVE = 5,
    TEN = 10,
    TWENTY = 20,
    THIRTY = 30
}

export const fetchQuestions = async (category: number, nbOfQuestions: number, difficulty: Difficulty): Promise<QuestionState[]> => {

    let endpoint = `https://opentdb.com/api.php?amount=${nbOfQuestions}&difficulty=${difficulty.toLowerCase()}&type=multiple`
    if (category && category !== -1) {
        endpoint += `&category=${category}`
    }
    const data = await (await fetch(endpoint)).json()
    console.log(data)
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffle([...question.incorrect_answers, question.correct_answer])
        }
    ))
}

export const fetchCategories = async (): Promise<Category[]> => {
    const endpoint = `https://opentdb.com/api_category.php`
    const data = await (await fetch(endpoint)).json()
    const cats = data.trivia_categories
        .filter((cat: Category) => cat.id != 31) //Exclude Japanese & Manga
        .map((cat: Category) => (
            {
                id: cat.id,
                name: shortenedCategory(cat.name),
            }))

    cats.unshift({
        id: -1,
        name: 'Any'
    })
    return cats
}

const shortenedCategory = (cat: string) => {
    let shortCategory = cat.substring(cat.indexOf(':') + 1, cat.length).trim();
    if (shortCategory === 'General Knowledge')
        return 'General'
    else if (shortCategory === 'Musicals & Theatres')
        return 'Musicals'
    else if (shortCategory === 'Science & Nature')
        return 'Science'
    else if (shortCategory === 'Cartoon & Animations')
        return 'Cartoon'
    else
        return shortCategory
}