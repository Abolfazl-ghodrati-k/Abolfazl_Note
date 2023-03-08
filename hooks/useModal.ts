import { useContext } from "react";
import { ModalContext } from "../context/Confirm";

function useModal() {
  const {
    text,
    settext,
    onmodal,
    setonmodal,
    halat,
    sethalat,
    isYes,
    setyes,
    setno,
  } = useContext(ModalContext)!;
  const openmodal = (t: string) => {
    setonmodal(true);
    settext(t);
  };
  const closemodal = () => {
    setonmodal(false);
    settext("");
  };

  return {
    onmodal,
    text,
    settext,
    openmodal,
    setonmodal,
    closemodal,
    halat,
    sethalat,
    isYes,
    setyes,
    setno,
  };
}

export default useModal;
