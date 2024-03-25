import React, { useState } from 'react';
import { ModalProviderProps } from '../types';
import ModalContext, { ModalStack } from './ModalContext';

const ModalsManager = ({ children }: ModalProviderProps) => {
   const [modalsStack, setModalsStack] = useState<ModalStack<{}>[]>([]);

   return <ModalContext.Provider value={{ modalsStack, setModalsStack }}>{children}</ModalContext.Provider>;
};

export default ModalsManager;
