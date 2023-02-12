import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import NoteCard from "../../components/NoteCard";
import Router from "next/router";
import SideBar from "../../components/SideBar";
import { Note } from "../_types";

type Props = {
  Notes: Note[] | [];
  title: string;
};

function NotesContainer({ Notes, title }: Props) {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showSidebarCopy, setshowSidebarCopy] = useState(false);
  const [ShowMenu, setShowMenu] = useState(false);

  const ShowNote = (id: string) => {
    Router.push(`/notes/${id}`);
  };

  function show() {
    if (ShowMenu) {
      return styles.opened_menu;
    } else {
      return styles.menu;
    }
  }

  return (
    <div
      className={
        showSidebar
          ? `${styles.note_app_container} ${styles.overflow_hidden}`
          : `${styles.note_app_container}`
      }
    >
      <div className={show()}>
        <ul>
          <li>Share</li>
          <li>Delete</li>
          <li>Add to Favorites</li>
        </ul>
      </div>
      {showSidebar && <SideBar showSidebar={showSidebarCopy} />}
      <div className={styles.note_app}>
        {/* Title */}
        <div
          className={styles.note_title}
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <h1>{title}</h1>
          <small>{"11"} notes</small>
        </div>
        {/* NavBar */}
        <div
          className={styles.note_navbar}
          onClick={() => {
            if (ShowMenu) {
              setShowMenu(false);
            }
          }}
        >
          <div className={styles.main_nav}>
            {/* Search Handling --------------------------------------------------------------------------------- */}
            <div
              className={styles.search_icon}
              onClick={() => {
                Router.push("/search");
                setShowMenu(false);
              }}
            >
              <Image
                src={"/Images/Icons/search.svg"}
                width={20}
                height={20}
                alt="search"
              />
            </div>
            {/* Mini Menu --------------------------------------------------------------------------------------- */}
            <div
              className={styles.search_icon}
              onClick={() => {
                setShowMenu(!ShowMenu);
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
          {/* Show side bar action handling --------------------------------------------------------------------- */}
          <div
            onClick={() => {
              if (showSidebar) {
                setshowSidebarCopy(false);
                setTimeout(() => {
                  setshowSidebar(false);
                }, 300);
              } else {
                setshowSidebarCopy(true);
                setshowSidebar(true);
              }
              setShowMenu(false);
            }}
            style={{ cursor: "pointer", marginLeft: "8px" }}
          >
            <Image
              src={"/Images/Icons/menu-rounded.png"}
              width={20}
              height={20}
              alt="search"
            />
          </div>
        </div>
        {/* Notes */}
        <div
          className={styles.notes_container}
          onClick={() => {
            setShowMenu(false);
          }}
        >
          {Notes.map((note) => (
            <div
              className={styles.note_card}
              key={note.id}
              onClick={() => {
                ShowNote(note.id);
              }}
            >
              <NoteCard
                id={note.id}
                title={note.title}
                clock={note.clock}
                date={note.date}
                text={note.text}
              />
            </div>
          ))}
        </div>
        {!showSidebarCopy && title != "Recycle bin" && (
          <button
            className={styles.add_btn}
            onClick={() => {
              Router.push("/newNote");
            }}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default NotesContainer;
