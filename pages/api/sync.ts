import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../helpers/api";
import db from "../../utils/db";
import NOTES, { INotes } from "../../models/Data";
import User, { IUser } from "../../models/User";
import { UpdateQuery } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import getConfig from "next/config";
import Cors from 'cors'

const { serverRuntimeConfig } = getConfig();

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: { (req: Cors.CorsRequest, res: { statusCode?: number | undefined; setHeader(key: string, value: string): any; end(): any; }, next: (err?: any) => any): void; (arg0: any, arg1: any, arg2: (result: any) => void): void; }) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}


export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return saveNote();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function saveNote() {
    runMiddleware(req,res,cors)
    try {
      await db.connect();
    } catch (error) {
      res.end(error);
    }

    const { Notes, deletedNotes } = req.body;
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

    if (Notes == 0 && deletedNotes == 0) {
      return res.status(200).json({
        saved: false,
        message: "Nothing to save ... ^_^",
      });
    }

    var create: INotes = {};
    var update: UpdateQuery<INotes> = {};

    if (Notes?.length != 0 && deletedNotes?.length != 0) {
      create = { Notes, deletedNotes } as INotes;
      update = { $set: { Notes, deletedNotes } };
    }

    if (Notes?.length != 0 && deletedNotes == 0) {
      create = { Notes } as INotes;
      update = { $set: { Notes }, $unset: { deletedNotes: 1 } };
    }

    if (Notes == 0 && deletedNotes?.length != 0) {
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
    return res.send({ saved: true, DataStorage });
  }

  async function createDataStorage(create: INotes, user: IUser) {
    // return res.send(create)
    const DataStorage = new NOTES({
      ...create,
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
