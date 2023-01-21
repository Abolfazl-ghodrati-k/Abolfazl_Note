import React, { ReactElement, ReactPortal } from "react";
import { Container } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import { Note } from "../pages/_types";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNode = ReactChild | ReactPortal | boolean | undefined | JSX.Element[];

type Props = {
  children: ReactNode;
};

const NoteLayout = ({ children }: Props) => {
  

  return (
    <Container>
      {children}
    </Container>
  );
};

export default NoteLayout;
