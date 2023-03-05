import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { errorHandler, jwtMiddleware } from "./index";
import { Error } from "./error-handler";

export default apiHandler;

function apiHandler(handler: NextApiHandler) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
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
