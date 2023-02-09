import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { RawNote, RawNoteData, Tag, NoteData } from "./_types";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import "../styles/global.css";

// const  useLocalStorage = dynamic(() => import('../hooks/useLocalStorage'), { ssr: false })
// function urlBase64ToUint8Array(base64String: string): Uint8Array {
// 	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
// 	const base64 = (base64String + padding)
// 		.replace(/\-/g, "+")
// 		.replace(/_/g, "/");

// 	const rawData = window.atob(base64);
// 	const outputArray = new Uint8Array(rawData.length);

// 	for (let i = 0; i < rawData.length; ++i) {
// 		outputArray[i] = rawData.charCodeAt(i);
// 	}
// 	return outputArray;
// }

// async function send() {
// 	//register service worker
// 	const register = await navigator.serviceWorker.register("/sw.js");

// 	//register push
// 	const subscription = await register.pushManager.subscribe({
// 		userVisibleOnly: true,

// 		//public vapid key
// 		applicationServerKey: urlBase64ToUint8Array(
// 			"BAu-TfmAVhNAnp9-i1X-LDN9EkkaeIaH71gTXiWuqWsf2zag_XjCgd5RZYUHy1cPQCqG8m7FxDt4IAI0HEod5XM"
// 		),
// 	});

// 	//Send push notification
// 	await fetch("http://localhost:300/subscribe", {
// 		method: "POST",
// 		body: JSON.stringify(subscription),
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 	});
// }

export default function App({ Component, pageProps }: AppProps) {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

	// useEffect(() => {
	// 	// if ("serviceWorker" in navigator) {
	// 	// 	const  send = async() =>  {
	// 	// 		//register service worker
	// 	// 		const register = await navigator.serviceWorker.register(
	// 	// 			"/sw.js"
	// 	// 		);

	// 	// 		//register push
	// 	// 		const subscription = await register.pushManager.subscribe({
	// 	// 			userVisibleOnly: true,

	// 	// 			//public vapid key
	// 	// 			applicationServerKey:
	// 	// 				"BOJbNAs15gxY3Fj75-HbUzBEqyp7I40uG5yHSYIqRQYIf2b9MfZwod9g_Lb16GG2asT304tPTBMlcKAC_NXQj7g",
	// 	// 		});

	// 	// 		console.log("subscription: ", JSON.stringify(subscription));

	// 	// 		// //Send push notification
	// 	// 		// await fetch("http://localhost:3000/api/hello", {
	// 	// 		// 	method: "POST",
	// 	// 		// 	body: JSON.stringify(subscription),
	// 	// 		// 	headers: {
	// 	// 		// 		"content-type": "application/json",
	// 	// 		// 	},
	// 	// 		// });
	// 	// 	}

	// 	// 	send()
	// 	// 		.catch((err) => console.log("err",err))
	// 	// 		.then((res) => console.log("res",res));
	// 	// }
	// }, []);

	const noteWithTags = React.useMemo(() => {
		if (notes) {
			return notes.map((note) => {
				return {
					...note,
					tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
				};
			});
		}
	}, [notes, tags]);

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes((notes) => {
			return [
				...notes,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			];
		});
	}

	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag]);
	}

	return (
		<Component
			{...pageProps}
			onCreateNote={onCreateNote}
			onAddTag={addTag}
			availableTags={tags}
			notes={notes}
			noteWithTags={noteWithTags}
		/>
	);
}
