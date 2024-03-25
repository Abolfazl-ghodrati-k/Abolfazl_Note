import React from 'react';

export type ModalContextType<T> = {
   modalsStack: ModalStack<T>[];
   setModalsStack: React.Dispatch<React.SetStateAction<ModalStack<T>[]>>;
};

export type ModalStack<T> = {
   id: string;
   options?: T;
};

export default React.createContext<ModalContextType<{}>>({
   modalsStack: [],
   setModalsStack: () => {},
});
