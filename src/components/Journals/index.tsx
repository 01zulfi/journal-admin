import React, { FC, useState, useEffect } from 'react';
import JournalInterface from '../../interfaces/journal';
import { endpoint } from '../../endpoint.const';

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
        const response = await fetch(`${endpoint}/journal`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`,
          },
        });
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
    <section className="flex flex-col gap-4">
      {journals.map((journal) => (
        <div
          key={journal._id}
          className={`flex justify-between sm:w-4/5 outline-2 outline-purple-50 rounded shadow-md hover:bg-gray-100 p-2 align-center border-l-4 border-solid ${
            journal.publish ? 'border-green-400' : 'border-red-400'
          }`}
        >
          <h3 className="text-xl">{journal.title}</h3>
          <button
            className="button w-fit h-fit"
            type="button"
            onClick={editHandler(journal._id)}
          >
            Edit
          </button>
        </div>
      ))}
    </section>
  );
};

export default Journals;
