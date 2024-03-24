import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler, jwtMiddleware } from "../../../helpers/api";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getUsers();
    default:
      return res.status(405).json({
        message: "Method not allowed"
      });
  }

  function getUsers() {
    const { authorization } = req.headers;
    var token: string;
    if (authorization) {
      token = authorization.split(" ")[1];
    } else {
      return res.status(401).json({ message: "No token found" });
    }
    const response = jwt.verify(
      token,
      serverRuntimeConfig.secret
    );

    return res.status(200).json({ message: response });
  }
}
