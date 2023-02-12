import React, { useState } from "react";
import styles from "../pages/home/Home.module.css";
import { Note } from "../pages/_types";
import Router from "next/router";

function NoteCard({ text, id, title, clock, date }: Note) {
  const [Title, setTitle] = useState(title);
  const [Clock, setClock] = useState(clock);
  const [Text, setText] = useState(() => {
    return text?.substring(0, 100) + " ...";
  });

  const ShowNote = () => {
    Router.push(`/notes/${id}`);
  };

  return (
    <div className={styles.note_card} key={id} onClick={ShowNote}>
      {Title ? (
        <div>
          <h1 className={styles.note_card_title}>{Title}</h1>
          <p className={styles.note_card_date}>{Clock}</p>
        </div>
      ) : (
        <p className={styles.note_card_date}>{date}</p>
      )}
      <p className={styles.note_card_markdown}>{Text}</p>
    </div>
  );
}

export default NoteCard;
