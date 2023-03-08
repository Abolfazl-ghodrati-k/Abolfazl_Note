import React from "react";
import { Note } from "../pages/_types";

type Props = {
    title: string,
    Notes: Note[],
    styles: { readonly [key: string]: string; }
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

function NotesTitle({title, Notes, styles, setShowMenu}: Props) {
  return (
    <div
      className={styles.note_title}
      onClick={() => {
        setShowMenu(false);
      }}
    >
      <h1>{title}</h1>
      <small>
        {Notes.length > 0
          ? Notes.length == 1
            ? Notes.length +
              (title === "Recycle bin" ? " deleted" : "") +
              " note"
            : Notes.length +
              (title == "Recycle bin" ? " deleted" : "") +
              " notes"
          : title == "Recycle bin"
          ? "No deleted Notes"
          : "No notes try adding one"}
      </small>
    </div>
  );
}

export default NotesTitle;
