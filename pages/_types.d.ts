export type Note = { id: string } & NoteData;

export type NoteData = {
  title: string | number;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string ;
  label: string;
};

export type RawNote = {
  id : string 
} & RawNoteData

export type RawNoteData = {
  title : string | number
  markdown: string
  tagIds: string[]
}