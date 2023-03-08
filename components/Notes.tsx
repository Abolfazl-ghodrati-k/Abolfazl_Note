import React, { useEffect, useState } from "react";
import styles from "../pages/home/Home.module.css";
import NoteCard from "./NoteCard";
import Router from "next/router";
import SideBar from "./SideBar";
import { Note } from "../pages/_types";
import NotesTitle from "./NotesTitle";
import NotesNav from "./NotesNav";
import NotesButton from "./NotesButton";

type Props = {
  Notes: Note[] | [];
  setNotes: React.Dispatch<React.SetStateAction<Note[] | undefined>>;
  title: string;
};

function NotesContainer({ Notes, title, setNotes }: Props) {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showSidebarCopy, setshowSidebarCopy] = useState(false);
  const [ShowMenu, setShowMenu] = useState(false);
  const [onDelete, setonDelete] = useState(false);
  const [onFavorite, setonFavorite] = useState(false);
  const [selectedNotes, setselectedNotes] = useState<Note[]>([]);

  const ShowNote = (id: string) => {
    Router.push({
      pathname: `/notes/${id}`,
      query: {
        redirect: Router.asPath,
      },
    });
  };

  function isSelected(note_id: string) {
    const found_note = selectedNotes.find(
      (selectednote) => selectednote.id == note_id
    );
    if (found_note) {
      return true;
    } else {
      return false;
    }
  }

  const selectNote = (e: React.MouseEvent<HTMLDivElement>,note: Note) => {
    if (!onDelete && !onFavorite) {
      ShowNote(note.id);
    } else {
      const is_selected = isSelected(note.id);
      console.log(is_selected);
      if (is_selected) {
        const filteredNotes = selectedNotes.filter(
          (selectednote) => selectednote.id != note.id
        );
        console.log(`filterednotes ${filteredNotes}`);
        setselectedNotes([...filteredNotes]);
      } else {
        console.log(`how you dare`);
        setselectedNotes([...selectedNotes, { ...note }]);
      }
    }
  }

  function removeJunkNote() {
    localStorage.removeItem("CURRENTID");
    if (Notes) {
      console.log(Notes);
      const updatedNotes = Notes.filter((n) => {
        if (n?.text || n?.title) {
          return n;
        }
      });
      if (updatedNotes?.length == Notes.length) return;
      else {
        setNotes(updatedNotes);
        localStorage.setItem("NOTES", JSON.stringify(updatedNotes));
      }
    }
  }

  useEffect(() => {
    removeJunkNote()
  }, [Notes]);

  return (
    <div
      className={
        showSidebar
          ? `${styles.note_app_container} ${styles.overflow_hidden}`
          : `${styles.note_app_container}`
      }
    >
      {showSidebar && (
        <SideBar showSidebar={showSidebarCopy} setNotes={setNotes} />
      )}
      <div className={styles.note_app}>
        {/* Title */}
        <NotesTitle
          title={title}
          Notes={Notes}
          styles={styles}
          setShowMenu={setShowMenu}
        />
        {/* NavBar */}
        <NotesNav
          title={title}
          selectedNotes={selectedNotes}
          setselectedNotes={setselectedNotes}
          setShowMenu={setShowMenu}
          setonDelete={setonDelete}
          setonFavorite={setonFavorite}
          setshowSidebar={setshowSidebar}
          setshowSidebarCopy={setshowSidebarCopy}
          onDelete={onDelete}
          onFavorite={onFavorite}
          showSidebar={showSidebar}
          ShowMenu={ShowMenu}
          styles={styles}
        />
        {/* Notes */}
        <div
          className={styles.notes_container}
          onClick={() => {
            setShowMenu(false);
          }}
        >
          {Notes?.map((note) => (
            <div
              className={styles.note_card}
              key={note.id}
              onClick={(e) => selectNote(e,note)}
            >
              <NoteCard
                onSelecting={onDelete || onFavorite}
                selectedNotes={selectedNotes}
                id={note.id}
                title={note.title}
                clock={note.clock}
                date={note.date}
                text={note.text}
              />
            </div>
          ))}
        </div>
        {/* Notes functionality */}
        <NotesButton
          Notes={Notes}
          setNotes={setNotes}
          setonDelete={setonDelete}
          selectedNotes={selectedNotes}
          styles={styles}
          onDelete={onDelete}
          onFavorite={onFavorite}
          title={title}
          showSidebarCopy={showSidebarCopy}
        />
      </div>
    </div>
  );
}

export default NotesContainer;
