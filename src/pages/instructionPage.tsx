import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/instructionPage'
const Instructions: React.FC = () => {
    return (
        <div className="instructions-container">
            <h2>Welcome to the Quiz!</h2>
            <p>
                This quiz will test your knowledge on a variety of topics. Read the
                instructions below before you start:
            </p>
            <div className="instructions-content">
                <h3>Instructions:</h3>
                <ol>
                    <li>
                        You'll be presented with a series of multiple-choice questions.
                    </li>
                    <li>Choose the best answer for each question.</li>
                    <li>Each question has only one correct answer.</li>
                    <li>Do your best to answer all questions accurately.</li>
                    <li>
                        After answering all questions, you'll see your final score.
                    </li>
                </ol>
            </div>
            <div className="auth-info">
                <p>
                    Before you start the quiz, please LogIn
                    or SignIn
                    so that we can track your score and provide you with a personalized
                    experience.
                </p>
            </div>
            <div className="cta-buttons">
                <Link to="/login" className="cta-button">
                    Login
                </Link>
                <Link to="/signup" className="cta-button">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Instructions;
