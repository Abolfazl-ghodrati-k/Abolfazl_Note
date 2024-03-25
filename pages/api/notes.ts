import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../helpers/api";
import db from "../../utils/db";
import NOTES from "../../models/Data";
import jwt, { JwtPayload } from "jsonwebtoken";
import getConfig from "next/config";
import { apiResponse } from "../../helpers/api/apiResponse";
const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return recieveNotes();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function recieveNotes() {
    try {
      await db.connect();
    } catch (error) {
      return apiResponse(res, 500, "Database connection error", null)
    }

    const token = req.headers.authorization?.split(" ")[1]!;
    if(!token) {
      return apiResponse(res, 400, "No token provided.", null)
    }
    
    const { username } = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtPayload;

    const notes = await NOTES.find().populate({
      path: "user",
      match: {
        username,
      },
    });

    return apiResponse(res, 200, "Found notes are attached", notes);
  }
}
