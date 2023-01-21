import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Note, RawNote, Tag } from "../pages/_types";
import useLocalStorage from "../hooks/useLocalStorage";
import { Form } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

type ModalProps = {
  ShowEditModal: boolean;
  setShowEditModal: (ShowEditModal: boolean) => void;
  onAddTag: (tag: Tag) => void;
};

function EditTagsModal({
  ShowEditModal,
  setShowEditModal,
  onAddTag,
}: ModalProps) {
  const [tags, settags] = useLocalStorage<Tag[]>("TAGS", []);
  const [notes, setnotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [Tags, setTags] = useState<Tag[]>(()=>{
    if(tags){
      return tags
    } else {
      return []
    }
  });

  const handleClose = () => {
    setShowEditModal(false);
  };

  const onChange = () => {
    settags(Tags)
  };
  return (
    <Modal show={ShowEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editting Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="Tags">
          <Form.Label>Tags</Form.Label>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag: Tag = { id: uuidV4(), label };
              setTags((prevTags) => [...prevTags, newTag]);
            }}
            value={
              Tags.length > 0
                ? Tags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })
                : null
            }
            options={tags?.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onChange}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTagsModal;
