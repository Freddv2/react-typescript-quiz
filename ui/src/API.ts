export type Question = {
    category: string
    correct_answer: string
    difficulty : Difficulty
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuestions = async (nbOfQuestions: number, difficulty: Difficulty) : Promise<QuestionState> => {
    const endpoint = `https://opentdb.com/api.php?amount=${nbOfQuestions}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: [question.correct_answer,question.incorrect_answers]
        }
    ))
}