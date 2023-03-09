import React, { useEffect, useState } from "react";
import styles from "../../pages/home/Home.module.css";
import { Note } from "../../pages/_types";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import useIsToday from "../../hooks/useIsToday";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item"
import useLongPress from "../../hooks/useLongPress";

type NoteCardProps = {
  selectedNotes?: Note[] | undefined;
  onSelecting?: boolean;
  setonDelete: React.Dispatch<React.SetStateAction<boolean>>
  selectNote: (note: Note) => void
} & Note;

function NoteCard({
  text,
  id,
  title,
  clock,
  date,
  selectedNotes,
  onSelecting,
  setonDelete,
  selectNote
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
    editable: false,
    content: `${TEXT ?? ""}`,
  });
  const isToday = useIsToday(date);
  

  const backspaceLongPress = useLongPress({
    onLongPress(e) {
      if (onSelecting) {
        return;
      }
      else {
        setonDelete(true)
      }
    },
    onClick(e) {
      const note = {
        text,id,title,clock,date
      }
      selectNote(note)
      // console.error("your calling meeeeee")
    },
  });

  useEffect(() => {
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
    <div className={styles.note_card_container} {...backspaceLongPress} >
      {onSelecting && <div className={isSelected()}></div>}
      {Title ? (
        <div>
          <h1 className={styles.note_card_title}>{Title}</h1>
          <p className={styles.note_card_date}>{isToday ? Clock: date}</p>
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
