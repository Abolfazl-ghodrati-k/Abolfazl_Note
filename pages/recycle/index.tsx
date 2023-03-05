import React, { useEffect, useState } from 'react'
import NotesContainer from '../home/Notes'
import { Note } from '../_types'

function index() {
  const [Notes, setNotes] = useState<Note[]>()

  useEffect(() => {
    const stringedNotes = localStorage.getItem("DELETED_NOTES");
    if (stringedNotes) {
      const jsonedNotes = JSON.parse(stringedNotes);
      setNotes(jsonedNotes)
    }
  },[])

  return (
    <NotesContainer title="Recycle bin" Notes={Notes ?? []} setNotes={setNotes} />
  )
}

export default index