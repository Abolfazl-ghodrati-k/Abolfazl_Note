import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export interface INote {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
}

export type Tag = {
  label: string;
  tagIds: string[];
};

export class NotesStore {
  notes: INote[] = [];
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      notes: observable,
      fetchNotes: action,
      getNotes: computed,
      setNote: action,
    });
    this.rootStore = rootStore;
  }

  async fetchNotes() {
    const Notes = await fetch("/api/notes/recieve")
      .then((res) => res.json())
      .then((res) => res);
    this.notes = Notes ?? [];
  }

  async setNote(note: INote) {
    const response  = await fetchWrapper.post("/api/notes/save", note) as INote[]
    this.notes = response ?? [];
  }

  getNotes() {
    return this.notes;
  }
}
