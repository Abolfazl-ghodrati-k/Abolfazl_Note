import { NextApiResponse } from "next";

export default errorHandler;

type Error = {
	name: string;
	message: string;
};

function errorHandler(err: Error, res: NextApiResponse) {
	if (err.name === "UnauthorizedError") {
		// jwt authentication error
		return res.status(401).json({ message: "Invalid Token" });
	}

	if (typeof err === "string") {
		// custom application error
		return res.status(400).json({ message: err });
	}

	// default to 500 server error
	return res.status(500).json({ message: err.message });
}
