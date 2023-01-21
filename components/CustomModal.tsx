import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Note, RawNote, Tag } from "../pages/_types";
import useLocalStorage from "../hooks/useLocalStorage";
import { Form } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

type ModalProps = {
  Data: Tag[];
  setData: React.Dispatch<React.SetStateAction<Tag[]>>;
  ShowEditModal: boolean;
  setShowEditModal: (ShowEditModal: boolean) => void;
  Usednote: Note;
};

export default function CustomModal({
  Data,
  setData,
  Usednote,
  ShowEditModal,
  setShowEditModal,
}: ModalProps) {
  const [tags, settags] = useLocalStorage<Tag[]>("TAGS", []);
  const [notes, setnotes] = useLocalStorage<RawNote[]>("NOTES", []);

  const handleClose = () => {
    setData(() => {
      return Usednote.tags.map((tag) => tag);
    });
    setShowEditModal(false);
  };
  const onChange = () => {
    Data.map((tag) => {
      settags((tags) => {
        tags.map((prevTag) => {
          if (prevTag.id != tag.id) {
            tags.push(prevTag);
          }
        });
        return tags;
      });
    });
    setnotes((notes) => {
      return notes.map((note) => {
        if (note.id == Usednote.id) {
          return {
            ...note,
            tagIds: Data.map((tag) => tag.id),
          };
        } else {
          return { ...note };
        }
      });
    });
    setShowEditModal(false);
  };

  console.log(tags.map(tag => tag.label));

  return (
    <>
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
                setData((prevValue) => {
                  return [...prevValue, newTag];
                });
              }}
              options={tags?.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              value={Data.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setData(
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
    </>
  );
}
