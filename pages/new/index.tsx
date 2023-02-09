import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import NoteForm from "../../components/NoteForm";
import { NoteData, Tag } from "../_types";

type NewNoteProps = {
	onCreateNote: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export default function NewNote({
	onCreateNote,
	onAddTag,
	availableTags,
}: NewNoteProps) {
	useEffect(() => {
		const fetchData =async () => {
      await fetch("https://dummyjson.com/products/1")
			.then((res) => res.json())
			.then((json) => console.log(json));
    }
    fetchData().catch(err => {
      console.log(err)
    })
	}, []);
	return (
		<Layout>
			<div>New note</div>
			<NoteForm
				onSubmit={onCreateNote}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</Layout>
	);
}
