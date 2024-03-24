import { NextApiResponse } from "next"

export const apiResponse = <T>(res: NextApiResponse, status: number, message: string, data: T) => {
    return res.status(status).json({status, message, data})
}