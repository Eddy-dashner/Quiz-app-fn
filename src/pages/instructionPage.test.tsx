import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Instructions from './instructionPage';

test('renders instruction heading', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Instructions />
        </BrowserRouter>
    );

    const headingElement = getByText(/Welcome to the Quiz/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders instruction list items', () => {
    const { getAllByRole } = render(
        <BrowserRouter>
            <Instructions />
        </BrowserRouter>
    );

    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
});


