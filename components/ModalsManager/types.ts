import { ModalStack } from "./components/ModalContext";

export type ModalProviderProps = {
  defaultStack?: ModalStack<any>[];
  children: React.ReactNode
};

export type ModalProps = {
  children: React.ReactNode
  index: string;
  renderOnOpen?: boolean;
  closeButton?: React.ReactNode | false;
  extraButtons?: { id: string; button: React.FC<any> }[];
  clickOverlayClose?: boolean;
  escClose?: boolean;
  buttonsPosition?: { x: string; y: string };
  backgroundColor?: string;
  showExitButton?: boolean
};
