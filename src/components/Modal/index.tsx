import React, { FC } from 'react';

interface ModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = function Modal({ closeModal, children }) {
  return (
    <section>
      <button type="button" onClick={closeModal}>
        Close
      </button>
      <section>{children}</section>
    </section>
  );
};

export default Modal;
