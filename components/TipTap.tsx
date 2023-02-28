import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import React, { useCallback, useEffect, useState } from "react";
import MenuBar from "./Menubar";
import { Note } from "../pages/_types";
import { createNewNote, getDate } from "./Note";
import { v4 as uuid } from "uuid";

type Props = {
  id?: string;
  Id?: string;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  markdown: string | undefined;
};

export default function TipTap({ id, Id, setId, markdown }: Props) {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, TextStyle, Color],
    content: `${markdown??""}`,
    editorProps: {
      attributes: {
        class:
          " editor prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  })!;

  const json = editor?.getHTML()!;

  // useEffect(() => {
  //   const Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
  //   const Markdown = Notes?.find(
  //     (note) => note.id == Id || note.id == id
  //   )!.text;
  //   console.log(Markdown);
  //   setTimeout(() => {
  //     !editor?.isDestroyed &&
  //       editor?.commands?.setContent(
  //         `<p><span style="color: #ffffff">aaaaa</span></p>`
  //       );
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
    const Markdown = Notes?.find(
      (note) => note.id == Id || note.id == id
    )!.text;
    console.log("markdown", Markdown);
    console.log("proped markdown", markdown)
  }, []);

  // useEffect(() => {
  //   const Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
  //   const Markdown = Notes?.find(
  //     (note) => note.id == Id || note.id == id
  //   )!.text;
  //   // if (json?.length > 7) {
  //   //   setmarkdown(json);
  //   // } else {
  //   //   setmarkdown(Markdown);
  //   // }
  // }, [json]);

  useEffect(() => {
    saveContent(id, Id);
  }, [json, Id, id]);

  function saveContent(id: string | undefined, Id: string | undefined) {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!) as Note[];
    const Markdown = Notes?.find(
      (note) => note.id == Id || note.id == id
    )!.text;
    const { date, clock } = getDate();
    if (id) {
      const UpdatedNotes = Notes?.map((note) => {
        if (note.id == id) {
            (note.text = json?.length > 7 ? json : Markdown),
            (note.clock = clock),
            (note.date = date);
        }
        return note;
      });
      localStorage.setItem("NOTES", JSON.stringify(UpdatedNotes));
    } else {
      if (Id) {
        console.log("id exists");
        const UpdatedNotes = Notes?.map((note) => {
          if (note.id == Id) {
            (note.text = json?.length > 7 ? json : Markdown),
              (note.clock = clock),
              (note.date = date);
          }
          return note;
        });
        localStorage.setItem("NOTES", JSON.stringify(UpdatedNotes));
      } else if (!Id || !id) {
        console.log("id not found");
        var newId = uuid();
        setId(newId);
        createNewNote(newId, {
          title: "",
          text: json,
        });
      }
    }
  }

  if (!editor) {
    return null;
  }

  return (
    <div>
      <MenuBar editor={editor} />
      {/* {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus()?.toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus()?.toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus()?.toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}  */}

      <EditorContent editor={editor} spellCheck={false} />
    </div>
  );
}
