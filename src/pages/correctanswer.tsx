import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/correctanswer.css'

const CorrectAnswers = () => {
    const savedAnswers: any = localStorage.getItem('quizAppState');
    const parsedAnswers = JSON.parse(savedAnswers)?.userAnswers;

    return (
        <div>
            {parsedAnswers && Array.isArray(parsedAnswers) ? (
                <div>
                    <h2>Correct Answers:</h2>
                    <ul>
                        {parsedAnswers.map((answer, index) => (
                            <li key={index}>
                                <h3>Question: {answer.question}</h3>
                                <p>Answer: {answer.answer}</p>
                                <p>Is the answer correct?: {answer.correct ? 'Yes' : 'No'}</p>
                                <p>Correct Answer: {answer.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                    <Link to="/quizapp" className="b2quiz-button" >Back to Quiz</Link>
                </div>
            ) : (
                <p>No valid data found in localStorage</p>
            )}
        </div>
    );
}

export default CorrectAnswers;
