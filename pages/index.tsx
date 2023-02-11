import React from "react";
import { Layout } from "../components/Layout";
import { Button, Col, Row, Stack } from "react-bootstrap";
import Link from "next/link";
import { SimplifiedNote, Tag } from "./_types";
import dynamic from "next/dynamic";
import EditTagsModal from "../components/EditTagsModal";
import Router, { useRouter } from "next/router";
import { userService } from "../services/user-service";
const NoteList = dynamic(() => import("../components/NoteList"), {
  ssr: false,
});

type HomeProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onAddTag: (tag: Tag) => void;
};

export type User = {
  firstname: string
  id: string
  lastName: string
  token: string
  username: string
}

export default function Home({ availableTags, notes, onAddTag }: HomeProps) {
  const [ShowEditModal, setShowEditModal] = React.useState(false);
  const [User, userSet] = React.useState(userService.userValue)
  const router = useRouter();
  console.log(User)

  return (
    <>
      <main className="min-h-screen border">
        <Layout>
          <EditTagsModal
            ShowEditModal={ShowEditModal}
            setShowEditModal={setShowEditModal}
            onAddTag={onAddTag}
          />
          {User ? (
            <div>{User.username}</div>
          ) : (
            <div
              className="d-flex align-items-center  gap-2  mb-2"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                onClick={() => Router.push("/login")}
                className="btn btn-outline-secondary"
              >
                Login
              </button>
              <button
                onClick={() => Router.push("/login")}
                className="btn btn-outline-primary"
              >
                SignUp
              </button>
            </div>
          )}
          <Row className="align-items-center mb-4">
            <Col>
              <h1>Notes</h1>
            </Col>
            <Col xs="auto">
              <Stack gap={2} direction="horizontal">
                <Button variant="primary">
                  <Link href={"/new"}>Create</Link>
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Tags
                </Button>
              </Stack>
            </Col>
          </Row>
          <NoteList availableTags={availableTags} notes={notes} />
        </Layout>
      </main>
    </>
  );
}
