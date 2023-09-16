import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { React.StrictMode } from 'react-router-dom';
import Login from './login';



describe('Login Component', () => {
    let mockAxios: any;

    beforeAll(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    afterAll(() => {
        mockAxios.restore();
    });

    it('displays success toast and navigates on successful login', async () => {
        const sessionToken = 'fakeSessionToken';
        mockAxios.onPost('http://localhost:5500/auth/login').reply(200, {
            Authentication: { sessiontoken: sessionToken },
            message: 'Login successful',
        });

        render(
            <React.StrictMode>
                <Login />
            </React.StrictMode>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText('Login successful')).toBeInTheDocument();
        });

        expect(localStorage.getItem('sessiontoken')).toBe(sessionToken);
    });

    it('displays error toast and stays on login page on failed login', async () => {
        mockAxios.onPost('http://localhost:5500/auth/login').reply(401, {
            message: 'Invalid credentials',
        });

        render(
            <React.StrictMode>
                <Login />
            </React.StrictMode>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
