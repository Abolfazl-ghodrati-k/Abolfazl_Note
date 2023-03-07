import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../helpers/api";
import db from "../../utils/db";
import NOTES, { INotes } from "../../models/Data";
import User, { IUser } from "../../models/User";
import { UpdateQuery } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import getConfig from "next/config";
import Cors from "cors";
import { runMiddleware } from "./sync";
const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});


function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return recieveNotes();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function recieveNotes() {
    runMiddleware(req,res,cors)
    try {
      await db.connect();
    } catch (error) {
      res.end(error);
    }
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

    return res.send(note);
  }
}
