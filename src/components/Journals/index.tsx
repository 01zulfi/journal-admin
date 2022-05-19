import React, { FC, useState, useEffect } from 'react';
import JournalInterface from '../../interfaces/journal';

interface JournalsProps {
  onEditButtonClick: any;
}

const Journals: FC<JournalsProps> = function Journals({ onEditButtonClick }) {
  const [journals, setJournals] = useState<JournalInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://journal-rest-api.herokuapp.com/journal',
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const data = await response.json();
        setIsLoading(false);
        if (response.status === 200) {
          setErrorMessage('');
          setJournals(data.journals);
          return;
        }
        setErrorMessage(data.message);
      } catch (error: any) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    })();
  }, []);

  const editHandler = (id: string) => () => onEditButtonClick(id);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage) {
    return <section>{errorMessage}</section>;
  }

  return (
    <section>
      {journals.map((journal) => (
        <div key={journal._id}>
          <h3>{journal.title}</h3>
          <button type="button" onClick={editHandler(journal._id)}>
            Edit
          </button>
        </div>
      ))}
    </section>
  );
};

export default Journals;
