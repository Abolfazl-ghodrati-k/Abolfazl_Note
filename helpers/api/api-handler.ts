import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { errorHandler, jwtMiddleware } from "./index";

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
			errorHandler(err, res);
		}
	};
}
