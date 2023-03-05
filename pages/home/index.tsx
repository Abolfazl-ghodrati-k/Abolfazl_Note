import React, { useEffect, useState } from "react";
import NotesContainer from "./Notes";
import { Note } from "../_types";

function index() {
  const [Notes, setNotes] = useState<Note[]>();

  useEffect(() => {
    const stringedNotes = localStorage.getItem("NOTES");
    if (stringedNotes) {
      const jsonedNotes = JSON.parse(stringedNotes);
      setNotes(jsonedNotes)
    }
  }, []);

  return <NotesContainer title="All Notes" Notes={Notes ?? []} setNotes={setNotes} />;
}

export default index;
