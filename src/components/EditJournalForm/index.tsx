import React, { FC, useEffect, useState } from 'react';
import JournalForm from '../JournalForm';

interface EditJournalFormProps {
  journalId: string;
}

const EditJournalForm: FC<EditJournalFormProps> = function EditJournalForm({
  journalId,
}) {
  const [journalData, setJournalData] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://journal-rest-api.herokuapp.com/journal/${journalId}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const responseData = await response.json();
        if (response.status === 200) {
          setJournalData(responseData.journal);
          setIsLoading(false);
          return;
        }
        setErrorMessage(responseData.message);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(JSON.stringify(error));
        setIsLoading(false);
      }
    })();
  }, []);

  const editJournal = async (data: {
    title: string;
    content: string;
    publish: boolean;
  }) => {
    setIsLoading(true);
    setJournalData(data);
    try {
      const response = await fetch(
        `https://journal-rest-api.herokuapp.com/journal/${journalId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        },
      );
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
        <h2>Journal updated successfully!</h2>
      </section>
    );
  }

  return (
    <section>
      <JournalForm
        heading="Edit Journal"
        journal={journalData}
        onFormSubmit={editJournal}
      />
      <div>{errorMessage}</div>
    </section>
  );
};

export default EditJournalForm;
