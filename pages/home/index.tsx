import React, { useEffect, useState, useTransition } from "react";
import NotesContainer from "../../components/Notes/Notes";
import { Note } from "../_types";
import { recieveNotes } from "..";

function index() {
  const [notes, setNotes] = useState<Note[]>();
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   const stringedNotes = localStorage.getItem("NOTES");
  //   if (stringedNotes) {
  //     const jsonedNotes = JSON.parse(stringedNotes);
  //     startTransition(() => {
  //       setNotes(jsonedNotes);
  //     });
  //   }
  // }, []);

  // if(isPending) {
  //   return <p>Loading notes.</p>
  // }

  return (
    <NotesContainer title="All Notes" Notes={notes ?? []} setNotes={setNotes} />
  );
}

index.auth = true;

export default index;
