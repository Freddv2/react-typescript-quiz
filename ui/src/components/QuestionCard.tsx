import React from 'react'
import {AnswerDetails} from "../App";
import {ButtonWrapper, Wrapper } from './QuestionCard.style';

type Props = {
    question: string
    answers: string[]
    submitAnswerCallback: (e : React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerDetails | undefined
    questionNb: number
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question,answers,submitAnswerCallback,userAnswer,questionNb,totalQuestions}) => (
    <Wrapper>
    <div>
        <p className="number">
            Question: {questionNb} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}}/>
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={submitAnswerCallback}>
                            <span dangerouslySetInnerHTML={{ __html: answer}}/>
                        </button>
                    </div>
                </ButtonWrapper>
            ))}
        </div>
    </div>
    </Wrapper>
)

export default QuestionCard