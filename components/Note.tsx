import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../pages/newNote/NewNote.module.css";
import TipTap from "./TipTap";
import { Note, NoteData } from "../pages/_types";
import useStatus from "../hooks/useStatus";
import { v4 as uuid } from "uuid";
import useLoading from "../hooks/useLoading";
import { toast } from "react-toastify";

type Props = {
  note?: Note;
  id?: string;
  redirect: string;
};

function Note({ note, id, redirect }: Props) {
  const [showMenu, setshowMenu] = useState(false);

  const [Id, setId] = useState(() => {
    if (typeof window !== "undefined") {
      const storageId = localStorage.getItem("CURRENTID")!;
      if (storageId) {
        return storageId;
      }
    }
  });

  const [StoredNote, setNote] = useState(() => {
    if (typeof window !== "undefined") {
      var Notes = [] as Note[];
      if (redirect == "/recycle") {
        Notes = JSON.parse(localStorage.getItem("DELETED_NOTES")!) as Note[];
      } else {
        Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
      }
      if (id) {
        return Notes.find((note) => note.id == id);
      } else {
        return Notes?.find((note) => note.id == Id)!;
      }
    }
  });

  const [title, settitle] = useState(() => {
    if (typeof window !== "undefined") {
      var Notes = [] as Note[];
      if (redirect == "/recycle") {
        Notes = JSON.parse(localStorage.getItem("DELETED_NOTES")!) as Note[];
      } else {
        Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
      }
      if (Notes) {
        if (id) {
          return Notes.find((note) => note.id == id)?.title;
        }
        const title = Notes.find((note) => note.id == Id)?.title;
        return title;
      }
      return "";
    }
  });
  
  const router = useRouter()
  function show() {
    if (showMenu) {
      return styles.opened_menu;
    } else {
      return styles.menu;
    }
  }

  function saveTitle(e: React.ChangeEvent<HTMLInputElement>) {
    settitle(e.target.value);
    const Notes = (JSON.parse(localStorage.getItem("NOTES")!) as Note[])!;
    const { date, clock } = getDate();
    if (id) {
      const UpdatedNotes = Notes.map((note) => {
        if (note.id == id) {
          note.title = e.target.value;
          note.clock = clock;
          note.date = date;
        }
        return note;
      });
      localStorage.setItem("NOTES", JSON.stringify(UpdatedNotes));
    } else {
      if (Id) {
        var UpdatedNotes = Notes?.map((note) => {
          if (note.id == Id) {
            note.title = e.target.value;
            note.clock = clock;
            note.date = date;
          }
          return note;
        });
        localStorage.setItem("NOTES", JSON.stringify(UpdatedNotes));
      } else {
        var CURRENTID = localStorage.getItem("CURRENTID") as null | string;
        if (CURRENTID) {
          setId(CURRENTID);
          var UpdatedNotes = Notes?.map((note) => {
            if (note.id == CURRENTID) {
              note.title = e.target.value;
              note.clock = clock;
              note.date = date;
            }
            return note;
          });
          localStorage.setItem("NOTES", JSON.stringify(UpdatedNotes));
        } else {
          var newId = uuid();
          console.log("new note from title");
          setId(newId);
          createNewNote(newId, {
            title: e.target.value,
            text: "",
          });
        }
      }
    }
  }

  const { startLoading, finishLoading } = useLoading();

  function handleNote() {
    switch (router.query.redirect) {
      case "/recycle":
        restoreNote();
        break;
      case "/home":
        deleteNote();
        break;
      default:
        break;
    }
  }

  function deleteNote() {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
    const filteredNotes = Notes?.filter((note) => note.id != id);
    localStorage.setItem("NOTES", JSON.stringify(filteredNotes));
    const foundNote = Notes?.find((note) => note.id == id)!;
    const deletedNotes = JSON.parse(
      localStorage.getItem("DELETED_NOTES")!
    ) as Note[];
    deletedNotes?.push(foundNote);
    localStorage.setItem("DELETED_NOTES", JSON.stringify(deletedNotes));
    toast.dark("note deleted successfully");
    setTimeout(() => {
      if (router.query.fromSearch) {
        router.push({
          pathname: "/search",
          query: {
            redirect: redirect,
          },
        });
      } else {
        router.push(`${redirect}`);
      }
    }, 1000);
  }

  function restoreNote() {
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!) as Note[];
    const filteredNotes = deletedNotes?.filter((note) => note.id != id);
    localStorage.setItem("DELETED_NOTES", JSON.stringify(filteredNotes));
    const foundNote = deletedNotes?.find((note) => note.id == id)!;
    const Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
    Notes?.push(foundNote);
    localStorage.setItem("NOTES", JSON.stringify(Notes));
    toast.dark("note restored successfully");
    setTimeout(() => {
      if (router.query.fromSearch) {
        router.push({
          pathname: "/search",
          query: {
            redirect: redirect,
          },
        });
      } else {
        router.push(`${redirect}`);
      }
    }, 1000);
  }

  return (
    <div className={styles.new_note_container}>
      {/* Menu */}
      <div className={show()}>
        <ul>
          <li>Share</li>
          <li onClick={handleNote}>
            {router.query.redirect == "/recycle" ? "Restore" : "Delete"}
          </li>
          <li>Add to Favorite</li>
        </ul>
      </div>
      {/* Title  */}
      <div className={styles.new_note_header}>
        <div className={styles.new_note_title}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              const Notes = JSON.parse(
                localStorage.getItem("NOTES")!
              ) as Note[];
              const note = Notes.find((n) => n.id == id || n.id == Id);
              if (note?.title || note?.text) {
                if (router.query.fromSearch) {
                  router.push({
                    pathname: "/search",
                    query: {
                      redirect: redirect,
                    },
                  });
                } else {
                  router.push(`${redirect}`);
                }
                localStorage.removeItem("CURRENTID");
                return;
              } else {
                const updatedNotes = Notes.filter(
                  (n) => (id && n.id != id) || (Id && n.id != Id)
                );
                localStorage.setItem("NOTES", JSON.stringify(updatedNotes));
                localStorage.removeItem("CURRENTID");
                if (router.query.fromSearch) {
                  router.push({
                    pathname: "/search",
                    query: {
                      redirect: redirect,
                    },
                  });
                } else {
                  router.push(`${redirect}`);
                }
              }
            }}
          >
            <Image
              src={"/Images/Icons/back.png"}
              width={20}
              height={20}
              alt="search"
            />
          </div>
          <input
            placeholder="Title"
            className={styles.new_note_input}
            value={title}
            onChange={(e) => saveTitle(e)}
          />
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
        <TipTap id={id} Id={Id} setId={setId} markdown={StoredNote?.text} />
      </div>
    </div>
  );
}
export function getDate() {
  const newDate = new Date();
  const year = newDate.getFullYear().toString();
  const day = newDate.getDate().toString();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    newDate
  );
  const clock =
    newDate.getHours().toString() + ":" + newDate.getMinutes().toString();
  const date = year + " " + month + " " + day;
  return { date, clock };
}

export function createNewNote(id: string, value: NoteData) {
  console.log(id);
  localStorage.setItem("CURRENTID", id);
  const Notes =
    (JSON.parse(localStorage.getItem("NOTES")!) as Note[]) ?? ([] as Note[]);
  const { date, clock } = getDate();
  Notes?.push({
    id,
    title: value.title,
    date: date,
    text: value.text,
    clock: clock,
  });
  localStorage.setItem("NOTES", JSON.stringify(Notes));
}
export default Note;
