import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { Note } from "../_types";
import Result from "../../components/Result";
import NoteCard from "../../components/Notes/NoteCard";

function index() {
  const [results, setresults] = useState<Note[]>();
  const [searchParam, setsearchParam] = useState<string>("");
  const [notes, setnotes] = useState<Note[] | undefined>();
  const router = useRouter();

  // useEffect(() => {
  //   if (results) {
  //     setresults((results) => {
  //       var copy = [...new Set()]
  //     });
  //   }
  // }, [searchParam]);

  useEffect(() => {
    setnotes(() => {
      switch (router.query.redirect) {
        case "/home":
          return JSON.parse(localStorage.getItem("NOTES")!) as Note[];
        case "/recycle":
          return JSON.parse(localStorage.getItem("DELETED_NOTES")!) as Note[];
      }
    });
    console.log(router?.query);
  }, [router]);

  function search(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setsearchParam(e?.target?.value)
    if (e?.target?.value) {
      setresults(() => {
        var foundByTitle = notes?.filter((note) => {
          if (
            note.title?.toLowerCase().includes((e?.target?.value).toLowerCase())
          ) {
            return note;
          } else {
            return false;
          }
        })!;
        var foundByText = notes?.filter((note) => {
          if (
            note.text?.toLowerCase().includes((e?.target?.value).toLowerCase())
          ) {
            return note;
          } else {
            return false;
          }
        })!;
        const returnVal = [...foundByText, ...foundByTitle];
        return ([...new Set(returnVal)])
      });
    } else {
      setresults([]);
    }
  }

  if (!notes) {
    return <div>no notes</div>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.searchbar}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`${router.query.redirect}`);
            }}
          >
            <Image
              src={"/Images/Icons/back.png"}
              width={20}
              height={20}
              alt="search"
            />
          </div>
          <input
            placeholder="Title"
            className={styles.input}
            value={searchParam}
            onChange={search}
          />
        </div>
        <div className={styles.results_container} style={{ color: "white" }}>
          {results?.map((result) => (
            <div
              key={result.id}
              className={styles.result}
              onClick={() =>
                router.push({
                  pathname: "/notes/" + result.id,
                  query: {
                    redirect: router.query.redirect,
                    fromSearch: true,
                  },
                })
              }
            >
              <NoteCard
                text={result.text}
                id={result.id}
                title={result.title}
                clock={result.clock}
                date={result.date}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default index;
