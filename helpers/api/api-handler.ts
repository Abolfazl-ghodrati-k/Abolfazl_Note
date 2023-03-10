import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { errorHandler, jwtMiddleware } from "./index";
import { Error } from "./error-handler";
import Cors from 'cors'
import  runMiddleware  from "../../pages/api/sync";
import NextCors from "nextjs-cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export default apiHandler;

function apiHandler(handler: NextApiHandler) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			await NextCors(req, res, {
				// Options
				methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
				origin: '*',
				optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
			 });
			// global middleware
			await jwtMiddleware(req, res);

			// route handler
			await handler(req, res);
		} catch (err) {
			// global error handler
			if(err){
				errorHandler(err as Error, res);
			}
		}
	};
}
