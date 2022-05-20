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
  const [urlName, setUrlName] = useState(journal?.urlName || '');
  const [content, setContent] = useState(journal?.content || '');
  const [publish, setPublish] = useState(journal?.publish || false);

  const onSubmitButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onFormSubmit({
      title,
      content,
      publish,
      urlName,
    });
  };

  return (
    <section className="">
      <h2 className="text-3xl underline font-bold text-purple-500">
        {heading}
      </h2>
      <form className="my-6 pb-4 sm:w-4/5 shadow-md bg-purple-50 flex flex-col rounded p-2 gap-2">
        <label htmlFor="title" className="label-input">
          Title:
          <input
            className="input"
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={onTextInputChange(setTitle)}
          />
        </label>
        <label htmlFor="url-name" className="label-input">
          Url Name:
          <input
            className="input"
            type="text"
            name="urlName"
            id="url-name"
            required
            value={urlName}
            onChange={onTextInputChange(setUrlName)}
          />
        </label>
        <label htmlFor="content" className="label-input">
          Content:
          <textarea
            className="input"
            name="content"
            id="content"
            cols={50}
            rows={20}
            value={content}
            onChange={onTextInputChange(setContent)}
          />
        </label>
        <hr className="my-2" />
        <label htmlFor="publish" className="flex gap-2 items-center w-fit">
          Publish
          <input
            className=" h-6 w-4"
            type="checkbox"
            name="publish"
            id="publish"
            checked={publish}
            onChange={(event) => {
              setPublish(event.target.checked);
            }}
          />
        </label>
        <hr className="my-2" />
        <button
          type="submit"
          className="button bg-custom-green"
          onClick={onSubmitButtonClick}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

JournalForm.defaultProps = {
  journal: {
    title: '',
    urlName: '',
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
