import React from "react";
import styles from "./Modals.module.css";
import SyncLoader from "react-spinners/SyncLoader";
import useLoading from "../hooks/useLoading";

function LoadingModal() {
  const { loading, text } = useLoading();
  return (
    <div className={`${loading? styles.modal_container: styles.hide_modal}`}>
      <div className={styles.modal_wrapper}>
        <SyncLoader
          color={"white"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p>{text ? text : "Loading..."}</p>
      </div>
    </div>
  );
}

export default LoadingModal;
