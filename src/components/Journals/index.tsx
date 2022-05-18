import React, { FC, useState, useEffect } from 'react';
import JournalInterface from '../../interfaces/journal';

const Journals: FC = function Journals() {
  const [journals, setJournals] = useState<JournalInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://journal-rest-api.herokuapp.com/journal',
        );
        const data = await response.json();
        setIsLoading(false);
        if (response.status === 200) {
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

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (errorMessage) {
    return <section>{errorMessage}</section>;
  }

  return (
    <section>
      {journals.map((journal) => (
        <div>
          <h3>{journal.title}</h3>
          <button type="button">Edit</button>
        </div>
      ))}
    </section>
  );
};

export default Journals;
