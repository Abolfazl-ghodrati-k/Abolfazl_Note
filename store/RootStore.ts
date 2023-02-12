import { NotesStore } from "./notesStore";

export interface IRootStore {
    notesStore: NotesStore
}

export class RootStore implements IRootStore {
    notesStore: NotesStore;

    constructor() {
        this.notesStore = new NotesStore(this)
    }
}