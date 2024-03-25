import { useContext } from "react";
import { LoadingContext } from "../context/Loading";
import { useModal } from "../components/ModalsManager/useModal";

export type LoadingModalOptions = {
  text: string;
};

function useLoading() {
  const { addToModalsStack, closeModal } = useModal<LoadingModalOptions>();
  const startLoading = (t: string) => {
    addToModalsStack([{ id: "loading", options: { text: t } }]);
  };
  const finishLoading = () => {
    closeModal('loading')
  };
  return { startLoading, finishLoading };
}

export default useLoading;
