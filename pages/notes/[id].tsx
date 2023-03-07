import React from "react";
import Note from "../../components/Note";
import { useRouter } from "next/router";

function index() {
  const router = useRouter()

  return <Note id={router.query.id as string} redirect={router.query.redirect as string}/>;
}

index.auth = true

export default index;
