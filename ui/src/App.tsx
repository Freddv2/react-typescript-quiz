import React, {useState} from 'react';

//Styles
import { GlobalStyle, Wrapper } from './App.style'

// Components
import {Difficulty, fetchQuestions, QuestionState} from "./API";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 2

export type AnswerDetails = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerDetails[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [triviaStarted, setTriviaStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const startTrivia = async () =>  {
    setLoading(true)
    setTriviaStarted(true)
    setGameOver(false)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(questions)
    setLoading(false)
  }

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[questionNumber].correct_answer === answer
      if(correct) setScore(prevScore => prevScore + 1)
      const answerDetails : AnswerDetails = {
        question : questions[questionNumber].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setUserAnswers(prev => [...prev, answerDetails])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setQuestionNumber(nextQuestion)
    }
  }

  return (
      <>
        <GlobalStyle/>
        <Wrapper>
          <h1>Satisfaite, du Jeu des Devinettes</h1>
          {!gameOver && !loading && <span className="score">Score: {score}</span>}
          <div className="questions page-centered">
          {!gameOver && !loading && (
            <QuestionCard
            questionNb={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            submitAnswerCallback={checkAnswer}
          />)}

          {
            !triviaStarted ? (
                <button className="start generic-button page-horizontally-centered" onClick={startTrivia}>
                  Begin
                </button>
            ) : null}
          {userAnswers.length === TOTAL_QUESTIONS ? (
              <button className="restart generic-button page-horizontally-centered" onClick={startTrivia}>
                Restart
              </button>
          ) : null }
          {!gameOver && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 && (
            <button className="next generic-button page-horizontally-centered" onClick={nextQuestion}>
              Next
            </button>
          )}
          </div>
        </Wrapper>
      </>
  );
}

export default App;
