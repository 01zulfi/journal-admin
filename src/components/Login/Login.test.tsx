import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from './index';

describe('tests login component', () => {
  it('shows correct username on input field after typing', () => {
    render(<Login />);
    const usernameField = screen.getByLabelText('Username:');

    userEvent.type(usernameField, 'cool-username');

    expect(usernameField).toHaveValue('cool-username');
  });

  it('shows correct password on input field after typing', () => {
    render(<Login />);
    const passwordField = screen.getByLabelText('Password:');

    userEvent.type(passwordField, 'secret-password');

    expect(passwordField).toHaveValue('secret-password');
  });
});
