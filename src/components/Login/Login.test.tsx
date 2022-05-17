import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from './index';

describe('tests login component', () => {
  it('shows correct username on input field after typing', () => {
    render(<Login onLogin={() => {}} />);
    const usernameField = screen.getByLabelText('Username:');

    userEvent.type(usernameField, 'cool-username');

    expect(usernameField).toHaveValue('cool-username');
  });

  it('shows correct password on input field after typing', () => {
    render(<Login onLogin={() => {}} />);
    const passwordField = screen.getByLabelText('Password:');

    userEvent.type(passwordField, 'secret-password');

    expect(passwordField).toHaveValue('secret-password');
  });

  /* eslint-disable */
  it('calls onLogin prop when login is successful', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'secret' }),
        status: 200,
      }),
    ) as jest.Mock;
    const mockOnLogin = jest.fn();

    render(<Login onLogin={mockOnLogin} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.click(loginButton);

    await waitFor(() => expect(mockOnLogin).toBeCalledTimes(1));
  });

  it('renders error message when login is unsuccessful', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ message: 'Incorrect username or password' }),
        status: 401,
      }),
    ) as jest.Mock;

    render(<Login onLogin={() => {}} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.click(loginButton);

    const errorText = await screen.findByText('Incorrect username or password');
    expect(errorText).toBeInTheDocument();
  });
});
