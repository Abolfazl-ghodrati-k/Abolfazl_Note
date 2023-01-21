import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Note, Tag } from "../_types";
import useNote from "../../hooks/useNote";
import { Layout } from "../../components/Layout";
import { Badge, Button, Col, Form, Row, Stack } from "react-bootstrap";
import styles from "./Note.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import CustomModal from "../../components/CustomModal";
import Link from "next/link";
import Image from "next/image";

//icon
import EditIcon from '../../public/Images/Icons/editTag.png'

interface PostPageProps {
  context: {
    title: string;
    id: string;
    markdown: string;
    tags: Tag[];
  };
}

const Note = () => {
  //Hooks
  const [notes, setnotes] = useLocalStorage<Note[]>("NOTES", []);
  const router = useRouter();
  const { id: Id } = router.query;
  const note = useNote(Id);
  // console.log(note);
  //States
  const [MarkdownState, setMarkdownState] = useState<string>(() => {
    if (note) {
      return note.markdown;
    } else {
      return "";
    }
  });
  const [ShowEditModal, setShowEditModal] = useState<boolean>(false);
  const [Tags, setTags] = useState<Tag[]>(() => {
    if (note) {
      return note.tags;
    } else {
      return [];
    }
  });
const [TitleState, setTitleState] = useState<string>(() => {
  if(note) {
    return note.title
  }
  else {
    return ""
  }
})

  useEffect(() => {
      console.log(note)
    
  }, [note]);

  //Methods
  const ChangeMarkdown = (value: string) => {
    setMarkdownState((markdown) => (markdown = value));
    setnotes((notes) => {
      return notes.map((note) => {
        if (note.id == Id) {
          return {
            ...note,
            markdown: value,
          };
        } else {
          return { ...note };
        }
      });
    });
  };

  const ChangeTitle = (value: string) => {
    setTitleState(title => title = value);
    setnotes(notes => {
      return notes.map(note => {
        if(note.id == Id){
          return {
            ...note,
            title: value
          }
        } else {
          return { ...note }
        }
      })
    })
  }

  const ControllEditModal = () => {
    setShowEditModal(!ShowEditModal);
  };

  if (note) {
    return (
      <>
        <CustomModal
          ShowEditModal={ShowEditModal}
          setShowEditModal={setShowEditModal}
          Data={Tags}
          setData={setTags}
          Usednote={note}
        />
        <Layout onNote={true}>
          <Row className="align-items-center mb-4">
            <Col>
              <input value={TitleState ? TitleState: note?.title} onChange={(e) => ChangeTitle(e.target.value)} className={styles.title}/>
              {note.tags.length ? (
                <Stack gap={1} direction="horizontal" className="flex-wrap">
                  {Tags.length> 0
                    ? Tags.map((tag) => (
                        <Badge className="text-truncate" key={tag.id}>
                          {tag.label}
                        </Badge>
                      ))
                    : note.tags.map((tag) => (
                        <Badge className="text-truncate" key={tag.id}>
                          {tag.label}
                        </Badge>
                      ))
                  }
                  <div onClick={ControllEditModal} className={styles.editIcon}>
                    <Image width={24} height={24} src={EditIcon} alt="edit"/>
                  </div>
                </Stack>
              ) : <Stack>
                <Button onClick={ControllEditModal}>Add Tag</Button>
                </Stack>}
            </Col>
          </Row>
        </Layout>
        <textarea
          className={styles.markdown}
          value={MarkdownState ? MarkdownState : note.markdown}
          onChange={(e) => ChangeMarkdown(e.target.value)}
        />
      </>
    );
  } else {
    return (
      <p>
        There is no note in here <Link href={"/"}>Back to notes</Link>
      </p>
    );
  }
};

export default Note;
