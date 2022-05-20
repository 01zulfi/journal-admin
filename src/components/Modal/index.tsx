import React, { FC } from 'react';

interface ModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = function Modal({ closeModal, children }) {
  return (
    <section className="m-4 sm:ml-16">
      <button
        className="my-4 button bg-red-400"
        type="button"
        onClick={closeModal}
      >
        Close
      </button>
      <section>{children}</section>
    </section>
  );
};

export default Modal;
