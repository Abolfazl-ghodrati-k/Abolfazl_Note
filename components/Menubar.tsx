import { Editor } from "@tiptap/react";
import Image from "next/image";
import { useEffect } from "react";
import { BiCodeBlock } from "react-icons/bi";
import { FaBold, FaItalic } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiUndo, BiRedo } from "react-icons/bi";

type MenuProps = {
  editor: Editor;
};

const MenuBar = ({ editor }: MenuProps) => {
  if (!editor) {
    console.log("editor is undefined");
    return null;
  }

  useEffect(() => {
    editor.getAttributes("textStyle").color
      ? editor
          .chain()
          .focus()
          .setColor(editor!.getAttributes("textStyle").color)
          .run()
      : editor.chain().focus().setColor("#ffffff").run();
  }, [editor]);

  return (
    <div className="menubar">
      <input
        type="color"
        className="colorInput"
        onChange={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={
          editor.getAttributes("textStyle").color
            ? editor.getAttributes("textStyle").color
            : "#ffffff"
        }
      />
      <button
        onClick={() => editor.chain().focus()?.toggleBold()?.run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold size={20} color="white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic size={20} color="white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <AiOutlineUnorderedList size={20} color="white" />
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        className={editor?.isActive("codeBlock") ? "is-active" : ""}
      >
        <BiCodeBlock size={20} color="white" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <BiUndo size={20} color="white" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <BiRedo size={20} color="white" />
      </button>
    </div>
  );
};

export default MenuBar;
