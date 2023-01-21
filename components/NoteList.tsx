import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Note, RawNoteData, SimplifiedNote, Tag } from "../pages/_types";
import NoteCard from "./NoteCard";
import dynamic from "next/dynamic";
import ReactSelect from 'react-select'
import EditTagsModal from "./EditTagsModal";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setselectedTags] = React.useState<Tag[]>([]);
  const [Title, setTitle] = React.useState("");


  const filteredNotes = React.useMemo(() => {
    if (notes) {
      return notes.filter((note) => {
        return (
          (Title === "" ||
            note.title.toLowerCase().includes(Title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tagIds.some((TagIds) => TagIds === tag.id)
            ))
        );
      });
    }
  }, [Title, selectedTags, notes]);

  return (
    <div>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                id="Tags"
                options={availableTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setselectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes &&
          filteredNotes.map((note) => (
            <Col key={note.id}>
              <NoteCard title={note.title} id={note.id} tagIds={note.tagIds} availableTags={availableTags} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default NoteList;
