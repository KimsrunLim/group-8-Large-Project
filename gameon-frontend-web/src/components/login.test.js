import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Login from './Login';

describe('Login Form', () => {
    const { getByTestId } = render(<Login />);

    it('handels input change for username', () => {
        const inputElement = getByTestId('username-input');

        // Checks for proper input detection
        fireEvent.change(inputElement, {target: {value : 'testuser'}});
        expect(inputElement.value).toBe('testuser');
    });

    it('handels input change for password', () => {
        // const { getByTestId } = render(<Login />);
        const inputElement = getByTestId('password-input');
        expect(inputElement).toBeInTheDocument();

        // Checks for proper input detection
        fireEvent.change(inputElement, {target: {value : 'thisIsMyPassword'}});
        expect(inputElement.value).toBe('thisIsMyPassword');

        // Ensures password is type 'password'
        expect(inputElement.type).toBe('password');
    });

    it('handles submit form', () => {
        // const { getByTestId } = render(<Login />);
        const submitButton = getByTestId('submit-button');
        expect(submitButton).toBeInTheDocument();

        // Click submit button without inputs
        fireEvent.click();

        const errorMessage = getByTestId('error-message');
        expect(errorMessage).toBeInTheDocument();
    });
});