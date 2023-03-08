import React from "react";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { Note } from "../pages/_types";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import Router from "next/router";

type Props = {
  Notes: Note[];
  setonDelete: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNotes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[] | undefined>>;
  title: string;
  showSidebarCopy: boolean;
  onDelete: boolean;
  onFavorite: boolean;
  styles: { readonly [key: string]: string };
};

function NotesButton({
  Notes,
  setonDelete,
  selectedNotes,
  setNotes,
  title,
  showSidebarCopy,
  onDelete,
  onFavorite,
  styles,
}: Props) {
  function restoreNotes() {
    setonDelete(false);
    const StoredNotes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
    if (selectedNotes.length == 0) {
      return;
    }
    if (StoredNotes && StoredNotes.length > 0) {
      removeFromNotes();
      var StoredNotesCopy = [...StoredNotes, ...selectedNotes];
      localStorage.setItem("NOTES", JSON.stringify(StoredNotesCopy));
    } else {
      removeFromNotes();
      var restoredNotes = [...selectedNotes];
      localStorage.setItem("NOTES", JSON.stringify(restoredNotes));
    }
  }

  function removeFromNotes() {
    const updatedNotes = Notes.filter(
      ({ id: id1 }) => !selectedNotes.some(({ id: id2 }) => id1 == id2)
    );
    setNotes(updatedNotes);
    if (title == "Recycle bin") {
      localStorage.setItem("DELETED_NOTES", JSON.stringify(updatedNotes));
    } else {
      localStorage.setItem("NOTES", JSON.stringify(updatedNotes));
    }
  }
  function deleteNotes() {
    setonDelete(false);
    const DeletedNotes = JSON.parse(
      localStorage.getItem("DELETED_NOTES")!
    ) as Note[];
    if (selectedNotes.length == 0) {
      return;
    }
    if (DeletedNotes && DeletedNotes.length > 0) {
      removeFromNotes();
      var DeletedNotesCopy = [...DeletedNotes, ...selectedNotes];
      localStorage.setItem("DELETED_NOTES", JSON.stringify(DeletedNotesCopy));
    } else {
      removeFromNotes();
      var deletedNotes = [...selectedNotes];
      localStorage.setItem("DELETED_NOTES", JSON.stringify(deletedNotes));
    }
  }
  return (
    <>
      {!showSidebarCopy &&
        title != "Recycle bin" &&
        (onDelete ? (
          <button
            className={styles.delete_btn}
            onClick={() => {
              deleteNotes();
            }}
          >
            <AiOutlineDelete size={30} color="black" />
          </button>
        ) : onFavorite ? (
          <button
            className={styles.favorite_btn}
            onClick={() => {
              console.log("deleted");
            }}
          >
            <AiOutlineStar size={30} color="gold" />
          </button>
        ) : (
          <button
            className={styles.add_btn}
            onClick={() => {
              Router.push("/newNote");
            }}
          >
            +
          </button>
        ))}
      {title == "Recycle bin" && Notes.length > 0 && (
        <button
          className={styles.delete_btn}
          style={{ backgroundColor: "greenyellow" }}
          onClick={() => {
            restoreNotes();
          }}
        >
          <MdOutlineRestoreFromTrash size={30} color="black" />
        </button>
      )}
    </>
  );
}

export default NotesButton;
