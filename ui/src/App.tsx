import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';

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
  console.log('Entered App()')

  const [playWow] = useSound('./assets/sounds/wow.m4a');
  const [playBravo] = useSound('./assets/sounds/bravo.m4a');
  const [playSatisfaite] = useSound('./assets/sounds/satisfaite.m4a');
  const [playBien] = useSound('./assets/sounds/bien.m4a');
  const [playEtudier] = useSound('./assets/sounds/etudier.m4a');

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

  useEffect(() => {
    if (userAnswers.length === nbOfQuestion.valueOf()) {
      handleGameOver()
    }
  }, [userAnswers])

  const startTrivia = async (category: number, nbOfQuestion: NumberOfQuestion, difficulty: Difficulty) => {
    setLoading(true)
    setTriviaStarted(true)
    setGameOver(false)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setCategory(category)
    setNbOfQuestion(1)
    setDifficulty(difficulty)
    const questions = await fetchQuestions(category, 1, difficulty)
    setQuestions(questions)
    setLoading(false)
  }

  const restart = () => {
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
      handleGameOver()
    } else {
      setQuestionNumber(nextQuestionNb)
    }
  }

  const handleGameOver = () => {
    setGameOver(true)
    const scoreInPercent = score / nbOfQuestion * 100
    if (scoreInPercent === 100) {
      playWow()
    } else if (scoreInPercent >= 80) {
      playBravo()
    } else if (scoreInPercent >= 60) {
      playSatisfaite()
    } else if (scoreInPercent >= 40) {
      playBien()
    } else {
      playEtudier()
    }
  }

  const quizResultHeader = () => {
    const scoreInPercent = score / nbOfQuestion * 100
    if (scoreInPercent === 100) {
      return 'WOW!!!'
    } else if (scoreInPercent >= 80) {
      return 'Bravo!!'
    } else if (scoreInPercent >= 60) {
      return 'Satisfaisant!'
    } else if (scoreInPercent >= 40) {
      return "C'est bien ça."
    } else {
      return 'Retourne Étudier Natou'
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
          {triviaStarted && !loading && <span className="score">Score: {score} / {userAnswers.length}</span>}
          {gameOver && triviaStarted && (
              <h1 style={{marginTop: "50px"}}>{quizResultHeader()}</h1>
          )}
          <div className="questions page-centered">
            {triviaStarted && !loading && (
                <QuestionCard
                    question={questions[questionNumber].question}
                    answers={questions[questionNumber].answers}
                    userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
                    submitAnswerCallback={checkAnswer}
                />)}
            {triviaStarted && !gameOver && userAnswers.length === questionNumber + 1 && questionNumber !== nbOfQuestion.valueOf() - 1 && (
                <button className="next generic-button page-horizontally-centered" onClick={nextQuestion}>
                  Next
                </button>
            )}
            {gameOver && triviaStarted ? (
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
