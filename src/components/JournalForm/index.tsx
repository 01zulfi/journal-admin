import React, { FC, useState } from 'react';
import JournalInterface from '../../interfaces/journal';
import onTextInputChange from '../../utils/on-text-input-change';

interface JournalFormProps {
  heading: string;
  journal?: JournalInterface;
  onFormSubmit: any;
}

const JournalForm: FC<JournalFormProps> = function JournalForm({
  heading,
  journal,
  onFormSubmit,
}) {
  const [title, setTitle] = useState(journal?.title || '');
  const [content, setContent] = useState(journal?.content || '');
  const [publish, setPublish] = useState(journal?.publish || false);

  const onSubmitButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onFormSubmit({ title, content, publish });
  };

  return (
    <section>
      <h2>{heading}</h2>
      <form>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={onTextInputChange(setTitle)}
          />
        </label>
        <label htmlFor="content">
          Content:
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            value={content}
            onChange={onTextInputChange(setContent)}
          />
        </label>
        <label htmlFor="publish">
          Publish
          <input
            type="checkbox"
            name="publish"
            id="publish"
            checked={publish}
            onChange={(event) => {
              setPublish(event.target.checked);
            }}
          />
        </label>
        <button type="submit" onClick={onSubmitButtonClick}>
          Submit
        </button>
      </form>
    </section>
  );
};

JournalForm.defaultProps = {
  journal: {
    title: '',
    content: '',
    publish: false,
    date: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: '',
    author: '',
  },
};

export default JournalForm;
