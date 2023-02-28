import React, { useState } from "react";
import styles from "../pages/home/Home.module.css";
import { Note } from "../pages/_types";
import Router from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

function NoteCard({ text, id, title, clock, date }: Note) {
  const [Title, setTitle] = useState(title);
  const [Clock, setClock] = useState(clock);
  const [TEXT, setTEXT] = useState(() => {
    if (text?.length > 100) {
      return text?.substring(0, 100) + " ...";
    }else {
      return text
    }
  });
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, TextStyle, Color],
    content: `${TEXT}`,
  });

  return (
    <>
      {Title ? (
        <div>
          <h1 className={styles.note_card_title}>{Title}</h1>
          <p className={styles.note_card_date}>{Clock}</p>
        </div>
      ) : (
        <p className={styles.note_card_date}>{date}</p>
      )}
      <p className={styles.note_card_markdown}>
        <EditorContent editor={editor} />
      </p>
    </>
  );
}

export default NoteCard;
