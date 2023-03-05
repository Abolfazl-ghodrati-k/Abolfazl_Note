import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import NoteCard from "../../components/NoteCard";
import Router from "next/router";
import SideBar from "../../components/SideBar";
import { Note } from "../_types";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { MdOutlineRestoreFromTrash } from "react-icons/md";

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
        redirect: Router.asPath
      }
    });
  };

  function show() {
    if (ShowMenu) {
      return styles.opened_menu;
    } else {
      return styles.menu;
    }
  }

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

  function removeFromNotes() {
    const updatedNotes = Notes.filter(
      ({ id: id1 }) => !selectedNotes.some(({ id: id2 }) => id1 == id2)
    );
    setNotes(updatedNotes);
    if (title == "Recycle bin") {
      localStorage.setItem("DELETED_NOTES", JSON.stringify(updatedNotes))
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

  return (
    <div
      className={
        showSidebar
          ? `${styles.note_app_container} ${styles.overflow_hidden}`
          : `${styles.note_app_container}`
      }
    >
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
          <small>
            {Notes.length > 0
              ? Notes.length == 1
                ? Notes.length + title == "Recycle bin"
                  ? "deleted"
                  : "" + " note"
                : Notes.length +
                  (title == "Recycle bin" ? " deleted" : "") +
                  " notes"
              : title == "Recycle bin"
              ? "No deleted Notes"
              : "No notes try adding one"}
          </small>
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
              <div className={show()} onClick={() => setShowMenu(false)}>
                <ul>
                  <li>Share</li>
                  {title == "Recycle bin" ? (
                    <li
                      onClick={() => {
                        setonDelete(true);
                        setonFavorite(false);
                      }}
                    >
                      Restore
                    </li>
                  ) : (
                    <li
                      onClick={() => {
                        setonDelete(true);
                        setonFavorite(false);
                      }}
                    >
                      Delete
                    </li>
                  )}
                  <li
                    onClick={() => {
                      setonDelete(false);
                      setonFavorite(true);
                    }}
                  >
                    Add to Favorites
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Show side bar action handling --------------------------------------------------------------------- */}
          {onDelete || onFavorite ? (
            <div>selected items</div>
          ) : (
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
          )}
        </div>
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
              onClick={() => {
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
              }}
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
        {title == "Recycle bin" && (
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
      </div>
    </div>
  );
}

export default NotesContainer;
