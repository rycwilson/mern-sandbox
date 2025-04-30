import { useEffect } from 'react';

export default function Widgets() {
  useEffect(() => {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    const openModalButton = document.getElementById('openModal') as HTMLButtonElement;
    const closeModalButton = document.getElementById('closeModal') as HTMLButtonElement;

    openModalButton.addEventListener('click', () => {
      modal.showModal();
    });

    closeModalButton.addEventListener('click', () => {
      modal.close();
    });

    return () => {
      openModalButton.removeEventListener('click', () => modal.showModal());
      closeModalButton.removeEventListener('click', () => modal.close());
    };
  }, []);
  
  return (
    <>
      <h4>Widgets</h4>

      <dialog id="modal">
        <h1>This is a modal.</h1>
        <button id="closeModal">Close modal</button>
      </dialog>
      <button id="openModal">Show modal</button>
    </>
  )
}
