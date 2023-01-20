import React from "react";
import { Layout } from "../../components/Layout";
import NoteForm from "../../components/NoteForm";
import { NoteData, Tag } from "../_types";

type NewNoteProps = {
  onCreateNote: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function NewNote({
  onCreateNote,
  onAddTag,
  availableTags,
}: NewNoteProps) {
  return (
    <Layout>
      <div>New note</div>
      <NoteForm onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={availableTags} />
    </Layout>
  );
}
