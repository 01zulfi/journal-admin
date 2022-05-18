import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Modal from './index';

describe('test Modal component', () => {
  it('renders children correctly', () => {
    render(
      <Modal closeModal={() => {}}>
        <h1>Hello</h1>
      </Modal>,
    );
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('invokes closeModal function when close button is clicked', () => {
    const mockCloseModal = jest.fn();
    render(
      <Modal closeModal={mockCloseModal}>
        <h1>Hello</h1>
      </Modal>,
    );
    const closeButton = screen.getByRole('button', { name: 'Close' });

    userEvent.click(closeButton);

    expect(mockCloseModal).toBeCalledTimes(1);
  });
});
