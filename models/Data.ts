import mongoose, { Types } from "mongoose";
import { Note } from "../pages/_types";
import User from "./User";

export interface Idata extends INotes {
  _id: Types.ObjectId;
  user: {
    username: string;
  };
}

export interface INotes {
  Notes?: Note[];
  deletedNotes?: Note[];
}

const dataSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  Notes: [
    {
      id: { type: String, default: "",  },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
      date: { type: String,  },
      clock: { type: String,  },
      required: false
    },
  ],
  deletedNotes: [
    {
      id: { type: String, default: "", required: true },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
      date: { type: String, required: true },
      clock: { type: String, required: true },
      required: false
    },
  ],
});

const NOTES = mongoose.models.NOTES || mongoose.model("NOTES", dataSchema);
export default NOTES;
