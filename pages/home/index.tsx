import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import NoteCard from "../../components/NoteCard";
import Router from "next/router";
import SideBar from "../../components/SideBar";

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
  const [showSidebar, setshowSidebar] = useState(true);
  const [showSidebarCopy, setshowSidebarCopy] = useState(true);

  useEffect(() => {
    window.history.pushState({}, "");
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault()
      setTimeout(() => {
        setshowSidebar(false);
      }, 300);
      setshowSidebarCopy(false);
      return 'Are you sure you want to leave?'
    });
  }, []);

  return (
    <div
      className={
        showSidebar
          ? `${styles.note_app_container} ${styles.overflow_hidden}`
          : `${styles.note_app_container}`
      }
    >
      {showSidebar && <SideBar showSidebar={showSidebarCopy} />}
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
          <div
            onClick={() => {
              if (showSidebar) {
                setshowSidebarCopy(false);
                setTimeout(() => {
                  setshowSidebar(false);
                }, 300);
              } else {
                setshowSidebarCopy(true);
                setshowSidebar(true);
              }
            }}
            style={{ cursor: "pointer" }}
          >
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
        {!showSidebarCopy && (
          <button
            className={styles.add_btn}
            onClick={() => {
              Router.push("/newNote");
            }}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default index;
