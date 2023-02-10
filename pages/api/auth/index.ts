import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../helpers/api';

// users in JSON file for simplicity, store in a db for production applications

export default apiHandler(handler);

function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getUsers() {
        // return users without passwords in the response
        var users = {
            "id": 1,
            "username": "test",
            "password": "test",
            "firstName": "Test",
            "lastName": "User"
        }
        return res.status(200).json(users);
    }
}
 