import Image from "next/image";
import React, { useState } from "react";
import styles from "./NewNote.module.css";
import Tiptap from "../../components/TipTap";
import Router from "next/router";

function index() {
  const [showMenu, setshowMenu] = useState(false);
  const [markdown, setmarkdown] = useState();

  function show() {
    if (showMenu) {
      return styles.opened_menu;
    } else {
      return styles.menu;
    }
  }

  return (
    <div className={styles.new_note_container}>
      {/* Menu */}
      <div className={show()}>
        <ul>
          <li>Share</li>
          <li>Delete</li>
          <li>Add to Favorites</li>
        </ul>
      </div>
      {/* Title  */}
      <div className={styles.new_note_header}>
        <div className={styles.new_note_title}>
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
          <input placeholder="Title" className={styles.new_note_input} />
        </div>
        <div
          onClick={() => {
            setshowMenu(true);
          }}
        >
          <Image
            src={"/Images/Icons/menu-vertical.png"}
            width={20}
            height={20}
            alt="search"
          />
        </div>
      </div>
      {/* body */}
      <div
        className={styles.note_markdown}
        onClick={() => {
          setshowMenu(false);
        }}
      >
        <Tiptap />
      </div>
    </div>
  );
}

export default index;
