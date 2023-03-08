import React, { useEffect, useState } from "react";
import NotesContainer from "../../components/Notes/Notes";
import { Note } from "../_types";

function index() {
  const [Notes, setNotes] = useState<Note[]>();

  useEffect(() => {
    const stringedNotes = localStorage.getItem("DELETED_NOTES");
    const Notes = localStorage.getItem("NOTES")!;
    if (stringedNotes) {
      const parsedNotes = JSON.parse(stringedNotes);
      const actualNotes = JSON.parse(Notes) as Note[];
      const filteredRecycles = parsedNotes.filter((element: Note, index: string) => {
        const buggedNote = actualNotes.find((n: Note) => n.id == element.id);
        if (buggedNote) {
          return element.id != buggedNote.id;
        } else {
          return true
        }
      });
      localStorage.setItem("DELETED_NOTES", JSON.stringify(filteredRecycles?? []))
      setNotes(filteredRecycles);
    }
  }, []);

  return (
    <NotesContainer
      title="Recycle bin"
      Notes={Notes ?? []}
      setNotes={setNotes}
    />
  );
}

index.auth = true;

export default index;
