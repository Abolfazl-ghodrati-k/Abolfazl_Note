import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler, jwtMiddleware } from "../../../helpers/api";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import { apiResponse } from "../../../helpers/api/apiResponse";
const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getUsers();
    default:
      return apiResponse(res, 405, "Method not allowed", null);
  }

  function getUsers() {
    const { authorization } = req.headers;
    var token: string;
    if (authorization) {
      token = authorization.split(" ")[1];
    } else {
      return apiResponse(res, 400, "No Token provided", null);
    }
    const response = jwt.verify(token, serverRuntimeConfig.secret);

    if (response) {
      return apiResponse(res, 200, "Authenticated", null);
    }

    return apiResponse(res, 401, "Not Authorized", null);
  }
}
