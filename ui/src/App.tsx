import React, {useEffect, useState} from 'react';

//Styles
import {GlobalStyle, Wrapper} from './App.style'

// Components
import {Difficulty, fetchCategories, fetchQuestions, NumberOfQuestion, QuestionState} from "./API";
import QuestionCard from "./components/QuestionCard";
import TriviaSettings from "./components/TriviaSettings";
import {getValuesOfNumericEnum} from "./utils";

export type AnswerDetails = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

export type TriviaOption = {
  id?: number
  name: string | number
}

const App = () => {
  console.log('Entered App ()')
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerDetails[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [triviaStarted, setTriviaStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(-1)
  const [nbOfQuestion, setNbOfQuestion] = useState(NumberOfQuestion.TEN)
  const [difficulty, setDifficulty] = useState(Difficulty.EASY)
  const [categories, setCategories] = useState<TriviaOption[]>([])
  const [difficulties, setDifficulties] = useState<TriviaOption[]>([])
  const [nbOfQuestions, setNbOfQuestions] = useState<TriviaOption[]>([])

  //Special react functional component method which is called each time the properties passed as parameters changes.
  useEffect(() => {
    console.log('Entered useEffect()');
    //Define an anonymous async function which is immediately called (Notice the () at the end. We can't define the useEffect param as async.
    (async () => {
      setLoading(true)
      setCategories(await fetchCategories())
      setLoading(false)
    })()
    setDifficulties(Object.values(Difficulty).map(diff => ({
      name: diff
    })))
    setNbOfQuestions(getValuesOfNumericEnum(NumberOfQuestion).map(nb => ({
      name: nb
    })))
  }, []) // Passing an empty array as dependencies, it is equivalent to using 'componentDidMount (or mounted()).


  const startTrivia = async (category: number, nbOfQuestion: NumberOfQuestion, difficulty: Difficulty) => {
    setLoading(true)
    setTriviaStarted(true)
    setGameOver(false)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setCategory(category)
    setNbOfQuestion(nbOfQuestion)
    setDifficulty(difficulty)
    const questions = await fetchQuestions(category, nbOfQuestion, difficulty)
    setQuestions(questions)
    setLoading(false)
  }

  const restart = () => {
    setGameOver(true)
    setTriviaStarted(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[questionNumber].correct_answer === answer
      if (correct) setScore(prevScore => prevScore + 1)
      const answerDetails: AnswerDetails = {
        question: questions[questionNumber].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setUserAnswers(prev => [...prev, answerDetails])
    }
  }

  const nextQuestion = () => {
    const nextQuestionNb = questionNumber + 1
    if (nextQuestionNb === nbOfQuestion) {
      setGameOver(true)
    } else {
      setQuestionNumber(nextQuestionNb)
    }
  }

  return (
      <>
        <GlobalStyle/>
        <Wrapper>
          <h1>Satisfaite, du Jeu des Devinettes</h1>
          {!triviaStarted && !loading && (
              <TriviaSettings
                  categories={categories}
                  nbOfQuestions={nbOfQuestions}
                  difficulties={difficulties}
                  startTriviaCallback={startTrivia}
              />
          )}
          {!gameOver && !loading && <span className="score">Score: {score}</span>}
          <div className="questions page-centered">
            {!gameOver && !loading && (
                <QuestionCard
                    question={questions[questionNumber].question}
                    answers={questions[questionNumber].answers}
                    userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
                    submitAnswerCallback={checkAnswer}
                />)}
            {!gameOver && userAnswers.length === questionNumber + 1 && questionNumber !== nbOfQuestion.valueOf() - 1 && (
                <button className="next generic-button page-horizontally-centered" onClick={nextQuestion}>
                  Next
                </button>
            )}
            {userAnswers.length === nbOfQuestion.valueOf() ? (
                <button className="restart generic-button page-horizontally-centered" onClick={restart}>
                  Restart
                </button>
            ) : null}
          </div>
        </Wrapper>
      </>
  );
}

export default App;
