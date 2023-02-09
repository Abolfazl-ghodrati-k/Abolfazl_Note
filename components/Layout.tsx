import React, { ReactElement, ReactPortal } from "react";
import { Container } from "react-bootstrap";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNode = ReactChild | ReactPortal | boolean | undefined | JSX.Element[];

type Props = {
  children: ReactNode;
  onNote?: boolean
};

export const Layout = (props: Props) => {
  return (
    <Container className={`my-4 min-h-screen h-[100vh] bg-[red] ${props.onNote ? 'mx-4' : ''}`}>
      <div>{props.children}</div>
    </Container>
  );
};
