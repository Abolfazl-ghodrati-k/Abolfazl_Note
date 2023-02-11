import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler, jwtMiddleware } from "../../../helpers/api";
import jwt from 'jsonwebtoken'
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();


// users in JSON file for simplicity, store in a db for production applications
interface JwtPayload {
  token: string
}

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUsers() {
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1]
    const response = jwt.verify(token, serverRuntimeConfig.secret) as JwtPayload
    
    return res.status(200).json({ message: response });
  }
}
