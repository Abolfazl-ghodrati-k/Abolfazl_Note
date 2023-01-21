import React, { useEffect, useState } from "react";
import { SimplifiedNote, Tag } from "../pages/_types";
import { Badge, Card, Stack } from "react-bootstrap";
import styles from "../styles/NoteList.module.css";
import Link from "next/link";

type NoteCardProps = {
  availableTags: Tag[];
} & SimplifiedNote;

const NoteCard = ({ title, id, tagIds, availableTags }: NoteCardProps) => {
  const [TagLabels, setTagLabels] = useState<string[]>(() => {
    var Labels: string[] = [];
    availableTags.map((Tag) => {
      tagIds.map((tagid) => {
        if (tagid == Tag.id) {
          Labels.push(Tag.label);
        }
      });
    });
    return Labels;
  });

  return (
    <Card as={Link} href={`/notes/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <div className="fs-5">{title}</div>
          <Stack
            gap={1}
            direction="horizontal"
            className="justify-content-center flex-wrap"
          >
            {TagLabels.length > 0 &&
              TagLabels.map((label) => (
                <Badge className="text-truncate" key={label}>
                  {label}
                </Badge>
              ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
