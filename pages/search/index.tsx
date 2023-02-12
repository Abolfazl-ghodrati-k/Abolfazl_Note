import Image from "next/image";
import Router from "next/router";
import React from "react";
import styles from "./Search.module.css";

function index() {
  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            Router.push("/home");
          }}
        >
          <Image
            src={"/Images/Icons/back.png"}
            width={20}
            height={20}
            alt="search"
          />
        </div>
        <input placeholder="Title" className={styles.input} />
      </div>
    </div>
  );
}

export default index;
