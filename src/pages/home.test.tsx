import React from 'react'
import { render } from '@testing-library/react'
import Home from './home'

describe('Home Component', () => {
    it('renders welcome message and start quiz button', () => {
        const { getByText } = render(
            <React.StrictMode>
                <Home />
            </React.StrictMode>
        );

        const welcomeMessage = getByText('Welcome to the Quiz App');
        const startQuizButton = getByText('Start Quiz') as HTMLButtonElement;

        expect(welcomeMessage).toBeTruthy();
        expect(startQuizButton).toBeTruthy();
        expect(startQuizButton.tagName).toBe('BUTTON');
    });

    it('renders challenge message', () => {
        const { getByText } = render(
            <React.StrictMode>
                <Home />
            </React.StrictMode>
        );

        const challengeMessage = getByText('Challenge yourself and see how much you know.');

        expect(challengeMessage).toBeTruthy();
    });
});






