import React, { useCallback, useRef } from 'react';
// @ts-ignore
import { Modal as ModalWrapper } from 'react-dialog-polyfill';
// import { useOnClickOutside } from '@avtkit/hooks/useOnClickOutside';
import { ModalProps } from '../types';
import DefaultCloseButton from './CloseButton';
import { useModal } from '../useModal';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
   const {
      index,
      children,
      closeButton: CloseButton = DefaultCloseButton,
      renderOnOpen = false,
      clickOverlayClose = true,
      escClose = true,
      showExitButton = true
   } = props;
   
   const { activeModal, closeModal } = useModal();
   const isActive = activeModal.id === index;

   const wrapperRef = useRef<HTMLDivElement | null>();

   const closeHandler = useCallback(() => {
      if (isActive) {
         closeModal(activeModal.id);
      }
   }, [isActive, activeModal.id, closeModal]);

   useOnClickOutside(wrapperRef, () => {
      if (clickOverlayClose && showExitButton) {
         closeHandler();
      }
   });
   
   return (
      <ModalWrapper
         className="modal-wrapper"
         open={isActive}
         onCancel={() => {
            if (escClose) {
               closeHandler();
            }
         }}
      >
         <div
            className='modal-buttons-container'
            ref={(ref) => {
               if (ref) {
                  wrapperRef.current = ref;
               }
            }}
         >
            <div className="ms-modal-buttons-container">
               {!!CloseButton && showExitButton && (
                  // @ts-ignore
                  <CloseButton onClick={() => closeHandler()} />
               )}
            </div>
            {(renderOnOpen || isActive) && children}
         </div>
      </ModalWrapper>
   );
};

Modal.defaultProps = {
   clickOverlayClose: true,
};

export default Modal