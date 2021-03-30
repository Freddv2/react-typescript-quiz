import React from 'react'
import {AnswerDetails} from "../App";

type Props = {
    question: string
    answers: string[]
    submitAnswerCallback: (e : React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerDetails | undefined
    questionNb: number
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question,answers,submitAnswerCallback,userAnswer,questionNb,totalQuestions}) => (
    <div>
        <p className="number">
            Question: {questionNb} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}}/>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={!!userAnswer} value={answer} onClick={submitAnswerCallback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard