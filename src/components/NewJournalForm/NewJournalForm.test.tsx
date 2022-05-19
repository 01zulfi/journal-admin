import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewJournalForm from '.';

jest.mock(
  '../JournalForm',
  () =>
    function MockJournalForm() {
      return <h1>Mock Journal Form</h1>;
    },
);

describe('test NewJournalForm', () => {
  describe('when mounts', () => {
    it('renders JournalForm component', () => {
      render(<NewJournalForm />);

      const journalForm = screen.getByRole('heading', {
        name: 'Mock Journal Form',
      });

      expect(journalForm).toBeInTheDocument();
    });
  });
});
