import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcryptjs";

import { apiHandler } from "../../../helpers/api";

const { serverRuntimeConfig } = getConfig();

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";
import User from "../../../models/User";

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return createUser();
    default:
      break;
  }

  async function createUser() {
    await db.connect();
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) throw "Account already exists";
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const token = await jwt.sign(
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      serverRuntimeConfig.secret,
      { expiresIn: "30d" }
    );
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPass,
      token,
    });
    try {
      newUser.save();
      res.status(201).json({ newUser });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}
