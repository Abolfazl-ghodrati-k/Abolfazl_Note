import mongoose, { Model, SchemaDefinitionProperty, Types } from "mongoose";
import { Note } from "../pages/_types";
import User, { IUser } from "./User";
import { ObjectId } from "mongodb";

export interface INote {
  id?: string;
  title?: string;
  text?: string;
  date?: string;
  clock?: string;
}

export interface INotes extends Document {
  notes?: INote[];
  deletedNotes?: INote[];
  user:  SchemaDefinitionProperty<ObjectId> | undefined;
}

const dataSchema = new mongoose.Schema<INotes>({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  notes: [
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

const NOTES: Model<INotes> = mongoose.models.NOTES || mongoose.model<INotes>("NOTES", dataSchema);
export default NOTES;
