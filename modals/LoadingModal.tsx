import React, { useEffect } from "react";
import styles from "./Modals.module.css";
import SyncLoader from "react-spinners/SyncLoader";
import useLoading, { LoadingModalOptions } from "../hooks/useLoading";
import router from "next/router";
import { useModal } from "../components/ModalsManager/useModal";

function LoadingModal() {
  const { activeModal } = useModal<LoadingModalOptions>();
  // useEffect(() => {
  //   router.events.on("routeChangeStart", () => startLoading("loading..."));
  //   router.events.on("routeChangeComplete", () => finishLoading());
  //   router.events.on("routeChangeError", () => finishLoading());

  //   return () => {
  //     router.events.off("routeChangeStart", () => startLoading("loading..."));
  //     router.events.off("routeChangeComplete", () => finishLoading());
  //     router.events.off("routeChangeError", () => finishLoading());
  //   };
  // });

  return (
    <div className={styles.modal_wrapper}>
      <SyncLoader
        color={"white"}
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>
        {activeModal.options?.text ? activeModal.options?.text : "Loading..."}
      </p>
    </div>
  );
}

export default LoadingModal;
