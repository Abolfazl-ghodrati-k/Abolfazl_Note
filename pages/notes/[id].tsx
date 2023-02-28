import React from "react";
import Note from "../../components/Note";
import { useRouter } from "next/router";

function index() {
  const router = useRouter()

  return <Note id={router.query.id as string}/>;
}

export default index;
