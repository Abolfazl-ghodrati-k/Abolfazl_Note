import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../helpers/api";
import db from "../../utils/db";
import NOTES, { INotes } from "../../models/Data";
import User, { IUser } from "../../models/User";

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return saveNote();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function saveNote() {
    try {
      await db.connect();
    } catch (error) {
      res.end(error);
    }

    const { Notes, deletedNotes, username } = req.body;

    if (!Notes && !deletedNotes) {
      return res.status(200).json({
        saved: false,
        message: "Nothing to save ... ^_^",
      });
    }

    var update = {} as INotes;

    if (Notes && deletedNotes) {
      update = {
        Notes,
        deletedNotes,
      } as INotes;
    }

    if (Notes && !deletedNotes) {
      update = { Notes } as INotes;
    }

    if (!Notes && deletedNotes) {
      update = { deletedNotes } as INotes;
    }

    const filter = {
      user: {
        username,
      },
    };

    const user = await User.findOne({ username });

    const note = await NOTES.find().populate({
      path: "user",
      match: {
        username,
      },
    });

    if (note.length > 0) {
      await updateDataStorage(update!, user!);
    } else {
      await createDataStorage(update!, user!);
    }
  }

  async function updateDataStorage(update: INotes, user: IUser) {
    const username = user.username;
    // return res.send({...update})
    const DataStorage = await NOTES.findOneAndUpdate(
      {},
      { ...update },
      { returnOriginal: false }
    ).populate({
      path: "user",
      match: { username },
    });
    return res.send({ saved:true, DataStorage });
  }

  async function createDataStorage(update: INotes, user: IUser) {
    const DataStorage = new NOTES({
      ...update,
      user,
    });
    try {
      await DataStorage.save();
      return res.send({ saved: true, message: DataStorage });
    } catch (error) {
      res.status(401).send({
        saved: false,
        message: error,
      });
    }
  }
}
