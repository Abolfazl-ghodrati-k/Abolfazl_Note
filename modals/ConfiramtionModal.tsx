import React, { useEffect } from "react";
import styles from "./Modals.module.css";
import { useModal } from "../components/ModalsManager/useModal";

export type ConfirmModalOptions = {
  callBack: () => Promise<void>
  body: string
}

function ConfiramtionModal() {
  const { activeModal, closeModal } = useModal<ConfirmModalOptions>();
  const { options } = activeModal;

  return (
    <div className={styles.confirm_modal_wrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1.5rem auto 1rem",
          gap: "5px",
          maxWidth: "254px",
          fontSize: "1.4rem",
        }}
      >
        {options?.body.split("\n").map((part, index) => (
          <p
            style={{
              fontSize: index == 1 ? "1.2rem" : "1.4rem",
              color: index == 1 ? "gray" : "white",
            }}
            key={part}
          >
            {part}
          </p>
        ))}
      </div>
      <div className={styles.buttons}>
        <button
          className={`${styles.yes_button} ${styles.button}`}
          onClick={() => {
            options?.callBack()
            closeModal("confirm");
          }}
        >
          Yes
        </button>
        <button
          className={`${styles.no_button} ${styles.button}`}
          onClick={() => {
            closeModal("confirm");
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default ConfiramtionModal;
