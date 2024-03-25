import React, { useEffect, useState, useTransition } from "react";
import NotesContainer from "../../components/Notes/Notes";
import { Note } from "../_types";
import { recieveNotes } from "..";

function index() {
  const [notes, setNotes] = useState<Note[]>();

  useEffect(() => {
    const stringedNotes = localStorage.getItem("NOTES");
    if (stringedNotes) {
      const jsonedNotes = JSON.parse(stringedNotes);
      setNotes(jsonedNotes);
    }
  }, []);

  return (
    <NotesContainer title="All Notes" Notes={notes ?? []} setNotes={setNotes} />
  );
}

index.auth = true;

export default index;
