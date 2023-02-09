import jwt from "jsonwebtoken";
import getConfig from "next/config";

import { apiHandler } from "../../../helpers/api";

const { serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
import users from "./users.json";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/db";
import db from "../../../utils/db";
import User from "../../../models/User";

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    await db.connect();
    const user = new User({
      firstName: 'bill',
      lastName: 'lastname',
      username:'bill',
      password:'bill'
    })
    try {
      
      await user.save()
      res.json({"user saved"})
    } catch (error) {
      res.json({error})
    }
    
    
    // const { username, password } = req.body;
    // const user = users.find(u => u.username === username && u.password === password);

    // if (!user) throw 'Username or password is incorrect';

    // // create a jwt token that is valid for 7 days
    // const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // // return basic user details and token
    // return res.status(200).json({
    //     id: user.id,
    //     username: user.username,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     token
    // });
  }
}
