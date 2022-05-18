import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Journals from './index';

const mockJournals = [
  {
    title: 'journal1',
    _id: '1',
  },
  {
    title: 'journal2',
    _id: '2',
  },
];

describe('tests Journal component', () => {
  it('renders Loading and then unmounts it', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'some message' }),
        status: 404,
      }),
    ) as jest.Mock;
    render(<Journals />);
    const loading = screen.getByText('Loading...');

    await waitFor(() => expect(loading).not.toBeInTheDocument());
  });

  it('renders journals when fetch response status is 200', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ journals: mockJournals }),
        status: 200,
      }),
    ) as jest.Mock;
    render(<Journals />);

    const journalOne = await screen.findByText('journal1');
    const journalTwo = await screen.findByText('journal2');

    expect(journalOne).toBeInTheDocument();
    expect(journalTwo).toBeInTheDocument();
  });

  it('renders error message when fetch response status is not 200', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'error error' }),
        status: 404,
      }),
    ) as jest.Mock;
    render(<Journals />);

    const errorMessage = await screen.findByText('error error');

    expect(errorMessage).toBeInTheDocument();
  });
});
