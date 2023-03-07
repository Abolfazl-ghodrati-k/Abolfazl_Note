import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcryptjs";

import { apiHandler } from "../../../helpers/api";

const { serverRuntimeConfig } = getConfig();

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";
import User from "../../../models/User";
import { Types } from 'mongoose'
import Cors from 'cors'
import { runMiddleware } from "../sync";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export default apiHandler(handler);


interface NewUser {
  _id: Types.ObjectId
  firstName?: string
  lastName?: string
  username: string
  password: string
  token: string
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return createUser();
    default:
      break;
  }

  async function createUser() {
    runMiddleware(req,res,cors)
    await db.connect();
    
    const { username } = req.body;
    const user = await User.findOne({ username });
    
    
    if(user){
      return res.status(200).send({message:"user name already exists"})
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
    var newuser = {...newUser._doc}
    try {
      await newUser.save();
      var SavedUser: NewUser = {
        ...newuser, token
      }
      res.status(201).json({...SavedUser});
    } catch (error) {
      res.status(401).json({ message: error });
    }
  
  }
}
