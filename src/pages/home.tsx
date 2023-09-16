
import React from 'react';
import { Link } from 'react-router-dom';
import './instructionPage'
import '../pages/home'

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Quiz App</h1>
            <p>Test your knowledge with fun and challenging quizzes!</p>
            <div className="cta-buttons">
                <Link to="/instructionPage" className="cta-button">
                    Start Quiz
                </Link>
            </div>
            <p>Challenge yourself and see how much you know.</p>
        </div>
    );
};

export default Home;
