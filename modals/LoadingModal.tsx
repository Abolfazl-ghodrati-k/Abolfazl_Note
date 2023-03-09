import React, {useEffect} from "react";
import styles from "./Modals.module.css";
import SyncLoader from "react-spinners/SyncLoader";
import useLoading from "../hooks/useLoading";
import router from "next/router";

const delay = (ms:number) => new Promise((res) => setTimeout(res,ms))

function LoadingModal() {
  const { loading, text, startLoading, finishLoading } = useLoading();
  useEffect(() => {
    
      router.events.on("routeChangeStart", () => startLoading('loading...'));
      router.events.on("routeChangeComplete", () => finishLoading());
      router.events.on("routeChangeError",  () => finishLoading());
  
    return () => {
      router.events.off("routeChangeStart", () => startLoading('loading...'));
      router.events.off("routeChangeComplete",  () => finishLoading());
      router.events.off("routeChangeError",  () => finishLoading());
    };
  });
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
