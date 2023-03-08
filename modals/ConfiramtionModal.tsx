import React, { useEffect } from "react";
import styles from "./Modals.module.css";
import useModal from "../hooks/useModal";

function ConfiramtionModal() {
  const { closemodal, sethalat, onmodal, text,isYes,setyes,setno } = useModal();

  return (
    <div
      className={`${
        onmodal ? styles.confirm_modal_container : styles.hide_modal
      }`}
    >
      <div className={styles.confirm_modal_wrapper}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "1.5rem auto 1rem",
            gap:'5px',
            maxWidth: "254px",
            fontSize: "1.4rem"
          }}
        >
          {text.split("\n").map((part,index) => (
            <p style={{fontSize: index==1? '1.2rem': '1.4rem',color: index==1? 'gray': 'white'}}>{part}</p>
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.yes_button} ${styles.button}`}
            onClick={() => {
              sethalat('yes')
              closemodal();
            }}
          >
            Yes
          </button>
          <button
            className={`${styles.no_button} ${styles.button}`}
            onClick={() => {
              sethalat('no')
              closemodal();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfiramtionModal;
