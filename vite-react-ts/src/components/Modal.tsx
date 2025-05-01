import { useContext, useRef, useEffect } from 'react';
import { DashboardContext } from '../contexts';
import Wrapper from '../assets/wrappers/modal';
import { FaXmark } from 'react-icons/fa6';

export default function Modal({ 
  isOpen, 
  content,
  onClose
} : { 
  isOpen: boolean; 
  content: ModalContent;
  onClose: () => void;
}) {  
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('Modal must be used within a DashboardContext.Provider');
  }
  const { toggleModal } = dashboardContext;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
        onClose();
      }
    }
  }, [isOpen]);

  return (
    <Wrapper>
      <dialog ref={dialogRef}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 style={{flexGrow: 1}}>{content && content.title}</h4>
            <button type="button" onClick={() => toggleModal()}>
              <FaXmark size={16}></FaXmark>
            </button>
          </div>
          <div className="modal-body">
            {content && content.body}
          </div>
        </div>
      </dialog>
    </Wrapper>
  );
};