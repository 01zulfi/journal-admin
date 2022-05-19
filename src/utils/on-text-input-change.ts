import React from 'react';

/* eslint-disable indent */
const onTextInputChange =
  (stateFunction: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    stateFunction(event.target.value);
  };

export default onTextInputChange;
