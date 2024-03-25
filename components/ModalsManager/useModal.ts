import { useCallback, useContext, useEffect, useState } from 'react';
import ModalContext, { ModalStack, ModalContextType } from './components/ModalContext';
import { uniqBy, isEqual } from 'lodash';

export const useModal = <T>() => {
   const { modalsStack, setModalsStack } = useContext<ModalContextType<T>>(
      ModalContext as unknown as React.Context<ModalContextType<T>>
   );
   const [activeModal, setActiveModal] = useState<ModalStack<T>>(modalsStack[0] || { id: '' });

   useEffect(() => {
      const newStack = modalsStack[0] || { id: '' };

      if (!isEqual(newStack, activeModal)) {
         setActiveModal(newStack);
      }
   }, [modalsStack, activeModal]);

   const closeModal = useCallback(
      (id: string) => {
         setModalsStack((previousStacks) => {
            const clone = [...previousStacks];
            const index = clone.findIndex((m) => m.id === id);
            if (index >= 0) {
               clone.splice(index, 1);
            }

            return clone;
         });
      },
      [setModalsStack]
   );

   const addToModalsStack = useCallback(
      (newStacks: ModalStack<T>[], removeDuplicates: boolean = true) => {
         setModalsStack((previousStacks) =>
            removeDuplicates ? uniqBy([...previousStacks, ...newStacks], 'id') : [...previousStacks, ...newStacks]
         );
      },
      [setModalsStack]
   );

   return {
      activeModal,
      closeModal,
      addToModalsStack,
   };
};
