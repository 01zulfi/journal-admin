import React, { FC, useState } from 'react';
import JournalForm from '../JournalForm';
import { endpoint } from '../../endpoint.const';

const NewJournalForm: FC = function NewJournalForm() {
  const [journalData, setJournalData] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const createNewJournal = async (data: {
    title: string;
    urlName: string;
    content: string;
    publish: boolean;
  }) => {
    setIsLoading(true);
    setJournalData(data);
    try {
      const response = await fetch(`${endpoint}/journal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        setErrorMessage('');
        setSuccess(true);
        setIsLoading(false);
        return;
      }
      setErrorMessage(responseData.message);
      setSuccess(false);
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error));
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (success) {
    return (
      <section>
        <h2>Journal created successfully!</h2>
      </section>
    );
  }

  return (
    <section>
      <JournalForm
        heading="New Journal"
        journal={journalData}
        onFormSubmit={createNewJournal}
      />
      <div>{errorMessage}</div>
    </section>
  );
};

export default NewJournalForm;
