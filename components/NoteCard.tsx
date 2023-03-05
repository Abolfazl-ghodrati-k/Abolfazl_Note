import React, { useEffect, useState } from "react";
import styles from "../pages/home/Home.module.css";
import { Note } from "../pages/_types";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import useIsToday from "../hooks/useIsToday";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item"

type NoteCardProps = {
  selectedNotes: Note[] | undefined;
  onSelecting: boolean;
} & Note;

function NoteCard({
  text,
  id,
  title,
  clock,
  date,
  selectedNotes,
  onSelecting,
}: NoteCardProps) {
  const [selected, setselected] = useState<boolean>();
  const [Title, setTitle] = useState(title);
  const [Clock, setClock] = useState(clock);
  const [TEXT, setTEXT] = useState(() => {
    if (text?.length > 100) {
      return text?.substring(0, 100) + " ...";
    } else {
      return text;
    }
  });
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      Color,
      BulletList.configure({ HTMLAttributes: { class: "my-custom-class" } }),
      ListItem,
    ],
    content: `${TEXT ?? ""}`,
  });
  const isToday = useIsToday();

  useEffect(() => {
    console.log(selectedNotes)
    setselected(() =>
      selectedNotes?.find((note) => note.id == id) ? true : false
    );
  },[selectedNotes]);

  function isSelected() {
    if (selected) {
      return styles.checked_check_box;
    } else {
      return styles.check_box;
    }
  }

  return (
    <div className={styles.note_card_container}>
      {onSelecting && <div className={isSelected()}></div>}
      {Title ? (
        <div>
          <h1 className={styles.note_card_title}>{Title}</h1>
          <p className={styles.note_card_date}>{Clock}</p>
        </div>
      ) : (
        <p className={styles.note_card_date}>{date}</p>
      )}
      <div className={styles.note_card_markdown}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default NoteCard;
