export type Note = { id: string } & NoteData;

export type SimplifiedNote = {
  tagIds: string[];
  title: string;
  id: string;
  markdown?: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
