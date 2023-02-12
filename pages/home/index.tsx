import React from "react";
import NotesContainer from "./Notes";

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
  return <NotesContainer title="All Notes" Notes={Notes} />;
}

export default index;
