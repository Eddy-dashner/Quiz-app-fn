import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../Api';
import QuestionCard from '../components/QuestionCard';
import { QuestionState, Difficulty } from '../Api';
import '../App.css';
import Login from './login';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 50;

const QuizApp = () => {
  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [quizOver, setQuizOver] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [savedState, setSavedState] = useState({});
  const [showSubmitPage, setShowSubmitPage] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (!quizOver) {
      const dataToSave = {
        number,
        userAnswers,
        quizOver,
        showScore,
      };
      setSavedState(dataToSave);
      localStorage.setItem('quizAppState', JSON.stringify(dataToSave));
    }
  }, [number, userAnswers, quizOver, showScore]);

  const startQuiz = async () => {
    setLoading(true);
    setQuizOver(false);
    setShowScore(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );
    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer
      //save answer in the array for user answer
      const answerObject = {
        question: questions[number]?.question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject])
    }

  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setQuizOver(true);
      setShowScore(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const logout = () => {
    localStorage.removeItem('sessiontoken');
    setQuizOver(true);
    setShowScore(false);
    setUserAnswers([]);
    setNumber(0);
    navigate('/login');
  };


  // console.log(questions)
  return (
    <div className="App">
      <h1>Quiz-App</h1>
      {quizOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}
      {!quizOver && !showScore ? <p className='score'>score:{userAnswers.filter(answer => answer.correct).length}</p> : null}
      {Loading && <p>Loading Questions ......</p>}
      {!Loading && !quizOver && !showScore && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestion={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!quizOver && !Loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          next Question
        </button>
      ) : null}
      <Link to="/correctanswer" className="correct-button">
        view answers
      </Link>
      <button className="logout" onClick={logout}>
        logout
      </button>
    </div>
  );
}
export default QuizApp;
