import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { RawNote, RawNoteData, Tag, NoteData } from "./_types";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import '../styles/global.css'

// const  useLocalStorage = dynamic(() => import('../hooks/useLocalStorage'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTags = React.useMemo(() => {
    if (notes) {
      return notes.map((note) => {
        return {
          ...note,
          tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
        };
      });
    }
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((notes) => {
      return [
        ...notes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }


  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return <Component {...pageProps} onCreateNote={onCreateNote} onAddTag={addTag} availableTags={tags} notes={notes} noteWithTags={noteWithTags}/>;
}
