import React, {useState} from 'react';

// Components
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 20

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {

  }

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
      <div className="App">
        <h1>Satisfaite, du Jeu des Devinettes</h1>
          <button className="start" onClick={startTrivia}>
            Débuter
          </button>
          <p className="score">Score:</p>
          <p>Chargement...</p>
          <QuestionCard
            questionNb={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            callback={checkAnswer}
          />
          <button className="next" onClick={nextQuestion}>
            Prochaine question
          </button>
      </div>
  );
}

export default App;
