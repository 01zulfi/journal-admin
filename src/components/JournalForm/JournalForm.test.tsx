import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import JournalForm from '.';

describe('tests JournalForm component', () => {
  const mockHeading = 'Journal Form';
  const mockOnFormSubmit = jest.fn();

  describe('when journal is not provided', () => {
    it('shows correct heading', () => {
      render(
        <JournalForm heading={mockHeading} onFormSubmit={mockOnFormSubmit} />,
      );

      const heading = screen.getByRole('heading', { name: 'Journal Form' });
      expect(heading).toBeInTheDocument();
    });

    it('shows correct value in title field after typing', () => {
      render(
        <JournalForm heading={mockHeading} onFormSubmit={mockOnFormSubmit} />,
      );

      const titleInput = screen.getByLabelText('Title:');

      userEvent.type(titleInput, 'title-journal');

      expect(titleInput).toHaveValue('title-journal');
    });

    it('shows correct value in content field after typing', () => {
      render(
        <JournalForm heading={mockHeading} onFormSubmit={mockOnFormSubmit} />,
      );

      const contentInput = screen.getByLabelText('Content:');

      userEvent.type(contentInput, 'asdf');

      expect(contentInput).toHaveValue('asdf');
    });

    it('shows checked checkbox after clicking', () => {
      render(
        <JournalForm heading={mockHeading} onFormSubmit={mockOnFormSubmit} />,
      );

      const publishInput = screen.getByLabelText('Publish');

      userEvent.click(publishInput);

      expect(publishInput).toBeChecked();
    });

    it('calls onFormSubmit with correct values when form submits', () => {
      render(
        <JournalForm heading={mockHeading} onFormSubmit={mockOnFormSubmit} />,
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      userEvent.click(submitButton);

      expect(mockOnFormSubmit).toBeCalledWith({
        title: '',
        content: '',
        publish: false,
        urlName: '',
      });
    });
  });

  describe('when journal is provided', () => {
    const mockJournal = {
      title: 'Journal Title',
      urlName: 'journal-title',
      content: '### h',
      publish: false,
      author: '',
      date: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: 'wew',
    };

    it('shows correct title in title field', () => {
      render(
        <JournalForm
          heading={mockHeading}
          journal={mockJournal}
          onFormSubmit={mockOnFormSubmit}
        />,
      );

      const titleInput = screen.getByLabelText('Title:');

      expect(titleInput).toHaveValue('Journal Title');
    });

    it('shows correct content in content field', () => {
      render(
        <JournalForm
          heading={mockHeading}
          journal={mockJournal}
          onFormSubmit={mockOnFormSubmit}
        />,
      );

      const contentInput = screen.getByLabelText('Content:');

      expect(contentInput).toHaveValue('### h');
    });

    it('shows checkbox state based on publish value', () => {
      render(
        <JournalForm
          heading={mockHeading}
          journal={mockJournal}
          onFormSubmit={mockOnFormSubmit}
        />,
      );

      const publishInput = screen.getByLabelText('Publish');

      expect(publishInput).not.toBeChecked();
    });

    it('calls onFormSubmit with correct values when form submits', () => {
      render(
        <JournalForm
          heading={mockHeading}
          journal={mockJournal}
          onFormSubmit={mockOnFormSubmit}
        />,
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      userEvent.click(submitButton);

      expect(mockOnFormSubmit).toBeCalledWith({
        title: 'Journal Title',
        urlName: 'journal-title',
        content: '### h',
        publish: false,
      });
    });
  });
});
