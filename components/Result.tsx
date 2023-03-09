import React from "react";
import { Note } from "../pages/_types";

type props = {
  result: Note;
  styles: { readonly [key: string]: string };
};

function Result({ result, styles }: props) {
  return <>
  <div className={styles.title}>{result.title}</div>;
  </>
}

export default Result;
