import React, { FC, useState } from 'react';
import Login from './components/Login';
import Journals from './components/Journals';
import Modal from './components/Modal';
import NewJournalForm from './components/NewJournalForm';
import EditJournalForm from './components/EditJournalForm';

const App: FC = function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNewJournalForm, setShowNewJournalForm] = useState(false);
  const [showEditJournalForm, setShowEditJournalForm] = useState(false);
  const [editJournalId, setEditJournalId] = useState('');

  if (!isLoggedIn) {
    return (
      <section className="">
        <Login onLogin={() => setIsLoggedIn(true)} />
      </section>
    );
  }

  if (showNewJournalForm) {
    return (
      <section>
        <Modal closeModal={() => setShowNewJournalForm(false)}>
          <NewJournalForm />
        </Modal>
      </section>
    );
  }

  if (showEditJournalForm) {
    return (
      <section>
        <Modal closeModal={() => setShowEditJournalForm(false)}>
          <EditJournalForm journalId={editJournalId} />
        </Modal>
      </section>
    );
  }

  return (
    <section className="m-4 sm:ml-16">
      <button
        type="button"
        className="button bg-custom-yellow my-4 w-[10rem]"
        onClick={() => setShowNewJournalForm(true)}
      >
        New
      </button>
      <Journals
        onEditButtonClick={(journalId: string) => {
          setEditJournalId(journalId);
          setShowEditJournalForm(true);
        }}
      />
    </section>
  );
};

export default App;
