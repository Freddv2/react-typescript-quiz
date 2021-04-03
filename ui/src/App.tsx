import React, {useState} from 'react';

//Styles
import { GlobalStyle, Wrapper } from './App.style'

// Components
import {Difficulty, fetchQuestions, QuestionState} from "./API";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10

export type AnswerDetails = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerDetails[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () =>  {
    setLoading(true)
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

          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start page-centered" onClick={startTrivia}>
              Start
            </button>
          ) : null }
          {!gameOver && <p className="score">Score: {score}</p>}
          {loading && <p>Chargement...</p> }
          <div className="questions page-centered">
          {!loading && !gameOver && (
            <QuestionCard
            questionNb={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            submitAnswerCallback={checkAnswer}
          />)}
          {!gameOver && !loading && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next
            </button>
          )}
          </div>
        </Wrapper>
      </>
  );
}

export default App;
