import React, { ReactElement, ReactPortal } from "react";
import { Container } from "react-bootstrap";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNode = ReactChild | ReactPortal | boolean | undefined | JSX.Element[];

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  return (
    <Container className="my-4">
      <div>{props.children}</div>
    </Container>
  );
};
