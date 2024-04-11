import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('Login Form', () => {

    it('handels input change for username', () => {
        const { getByTestId } = render(<SignUp />);
        const inputElement = getByTestId('username-input');

        // Checks for proper input detection
        fireEvent.change(inputElement, { target: { value: 'testuser' } });
        expect(inputElement.value).toBe('testuser');
    });

    it('handels input change for password', () => {
        const { getByTestId } = render(<SignUp />);
        const inputElement = getByTestId('password-input');
        expect(inputElement).toBeInTheDocument();

        // Checks for proper input detection
        fireEvent.change(inputElement, { target: { value: 'thisIsMyPassword' } });
        expect(inputElement.value).toBe('thisIsMyPassword');

        // Ensures password is type 'password'
        expect(inputElement.type).toBe('password');
    });

    it('handles empty submit form', () => {
        const { getByTestId } = render(<SignUp />);
        const inputElement = getByTestId('confirm-password-input');
        expect(inputElement).toBeInTheDocument();

        // Checks for proper input detection
        fireEvent.change(inputElement, { target: { value: 'thisIsMyPassword' } });
        expect(inputElement.value).toBe('thisIsMyPassword');

        // Ensures password is type 'password'
        expect(inputElement.type).toBe('password');
    });
});