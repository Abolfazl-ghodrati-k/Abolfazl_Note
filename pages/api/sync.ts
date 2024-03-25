import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../helpers/api";
import db from "../../utils/db";
import NOTES, { INotes } from "../../models/Data";
import User, { IUser } from "../../models/User";
import { UpdateQuery } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import getConfig from "next/config";
import { apiResponse } from "../../helpers/api/apiResponse";

const { serverRuntimeConfig } = getConfig();

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
      return apiResponse(res, 500, "Error on connecting to databse", null);
    }

    const { notes, deletedNotes } = req.body;
    const token = req.headers.authorization?.split(" ")[1]!;
    // return res.send({token})
    const { username } = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtPayload;

    const user = await User.findOne({ username });

    const note = await NOTES.find().populate({
      path: "user",
      match: {
        username,
      },
    });

    if (notes.length === 0 && deletedNotes.length === 0) {
      return apiResponse(res, 403, "Nothing to save", null);
    }

    var create: INotes | null = null;
    var update: UpdateQuery<INotes> = {};

    if (notes?.length != 0 && deletedNotes?.length != 0) {
      create = { notes, deletedNotes } as INotes;
      update = { $set: { notes, deletedNotes } };
    }

    if (notes?.length != 0 && deletedNotes == 0) {
      create = { notes } as INotes;
      update = { $set: { notes }, $unset: { deletedNotes: 1 } };
    }

    if (notes.length === 0 && deletedNotes?.length !== 0) {
      create = { deletedNotes } as INotes;
      update = { $set: { deletedNotes }, $unset: { Notes: 1 } };
    }

    if (note.length > 0) {
      await updateDataStorage(update!, user!);
    } else {
      await createDataStorage(create!, user!);
    }
  }

  async function updateDataStorage(update: UpdateQuery<INotes>, user: IUser) {
    const username = user?.username;
    var DataStorage = await NOTES.findOneAndUpdate({}, update, {
      returnOriginal: false,
    }).populate({
      path: "user",
      match: { username },
    });
    return apiResponse(res, 200, "Notes updated successfylly", DataStorage);
  }

  async function createDataStorage(create: INotes, user: IUser) {
    // return res.send(create)
    const DataStorage = new NOTES({
      ...create,
      user,
    });

    await DataStorage.save();
    return apiResponse(res, 200, "Notes updated successfylly", DataStorage);
  }
}
