import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcryptjs";

import { apiHandler } from "../../../helpers/api";

const { serverRuntimeConfig } = getConfig();

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";
import User from "../../../models/User";
import { Types } from "mongoose";
import { apiResponse } from "../../../helpers/api/apiResponse";

export default apiHandler(handler);

export interface UserValue {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  token: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return createUser();
    default:
      break;
  }

  async function createUser() {
    try {
      await db.connect();
    } catch (error) {
      return apiResponse(res, 500, "Error on connecting to Database", null);
    }

    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return apiResponse(res, 400, "Username already exists", null);
    }

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
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      username: req.body.username,
      password: hashedPass,
    });
    var newuser = { ...newUser._doc };
    
    try {
      await newUser.save();
      const savedUser: UserValue = {
        ...newuser,
        token,
      };
      return apiResponse<UserValue>(
        res,
        201,
        "User saved successfully",
        savedUser
      );
    } catch (error) {
      return apiResponse<null>(res, 401, "Error on saving user", null);
    }
  }
}
