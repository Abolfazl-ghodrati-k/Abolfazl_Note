import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcryptjs";

import { apiHandler } from "../../../helpers/api";

const { serverRuntimeConfig } = getConfig();

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";
import User from "../../../models/User";
import { apiResponse } from "../../../helpers/api/apiResponse";

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    try {
      await db.connect();
    } catch (error) {
      return apiResponse<null>(
        res,
        500,
        "Error on connecting to data base",
        null
      );
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    // const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return apiResponse<null>(res, 404, "No user Found", null);
    }

    const isSamePass = await bcrypt.compare(password, user.password);

    // // create a jwt token that is valid for 7 days
    if (isSamePass) {
      const token = jwt.sign(
        {
          username: req.body.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        serverRuntimeConfig.secret,
        { expiresIn: "30d" }
      );

      // // return basic user details and token
      user.token = token
      await user.save()

      const createdUser = {
        username: user.username,
        token
      }
      
      return apiResponse<any>(res, 200, "Hello dear user", createdUser);
    } else if (!isSamePass) {
      return apiResponse<null>(res, 400, "Wrong username or password", null);
    }
  }
}
