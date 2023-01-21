import React from "react";import useLocalStorage from "./useLocalStorage";
import { Note, Tag } from "../pages/_types";

function useNote(Id: string | undefined | string[]) {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  //   console.log(noteid);
  let note: Note | undefined;

  const noteWithTags = React.useMemo(() => {
    if (notes) {
      return notes.map((not) => {
        return {
          ...not,
          tags: tags.filter((tag) => not.tagIds.includes(tag.id)),
        };
      });
    }
  }, [notes, tags]);

  if (Id && noteWithTags) {
    note = noteWithTags.find((n) => n.id == Id);
    // console.log(note);
  }
  return note && note;
}

export default useNote;
