import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import NoteCard from "../../components/NoteCard";
import Router from "next/router";

const Notes = [
  {
    id: "1233445653",
    title: "Title1",
    clock: "13:17",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.sfbngjhshghwkerrguthgstghwgqrrqeper dfgdfgdfg fgefgqtg sdfgwywt",
  },
  {
    id: "123344565hh3",
    title: "Title2",
    clock: "13:17",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.sfbngjhshghwkerrguthgstghwgqrrqeper dfgdfgdfg fgefgqtg sdfgwywt",
  },
  {
    id: "123344565hh3",
    title: "Title2",
    clock: "13:17",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.sfbngjhshghwkerrguthgstghwgqrrqeper dfgdfgdfg fgefgqtg sdfgwywt",
  },
  {
    id: "123344565hh3",
    title: "Title2",
    clock: "13:17",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.sfbngjhshghwkerrguthgstghwgqrrqeper dfgdfgdfg fgefgqtg sdfgwywt",
  },
  {
    id: "123344565hh3",
    title: "Title2",
    clock: "13:17",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.sfbngjhshghwkerrguthgstghwgqrrqeper dfgdfgdfg fgefgqtg sdfgwywt",
  },
  {
    id: "1233445hhh653",
    date: "31 Jan 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.sfbngjhshghwkerrguthgstghwgqrrqeper dfgdfgdfg fgefgqtg sdfgwywt",
  },
];

function index() {
  return (
    <div className={styles.note_app}>
      {/* Title */}
      <div className={styles.note_title}>
        <h1>All notes</h1>
        <small>{"11"} notes</small>
      </div>
      {/* NavBar */}
      <div className={styles.note_navbar}>
        <div className={styles.main_nav}>
          <div className={styles.search_icon}>
            <Image
              src={"/Images/Icons/search.svg"}
              width={20}
              height={20}
              alt="search"
            />
          </div>
          <div className={styles.search_icon}>
            <Image
              src={"/Images/Icons/menu-vertical.png"}
              width={20}
              height={20}
              alt="search"
            />
          </div>
        </div>
        <div>
          <Image
            src={"/Images/Icons/menu-rounded.png"}
            width={20}
            height={20}
            alt="search"
          />
        </div>
      </div>
      {/* Notes */}
      <div className={styles.notes_container}>
        {Notes.map((note) => (
          <NoteCard
            id={note.id}
            title={note.title}
            clock={note.clock}
            date={note.date}
            text={note.text}
          />
        ))}
      </div>
      <button
        className={styles.add_btn}
        onClick={() => {
          Router.push("/newNote");
        }}
      >
        +
      </button>
    </div>
  );
}

export default index;
