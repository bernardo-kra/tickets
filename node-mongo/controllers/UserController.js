const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserController {
    static async createUser(req, res) {
        const { firstName, lastName, email, phone, password } = req.body;

        try {
            const userExists = await UserModel.findOneByEmail(email);
            if (userExists) {
                return res.status(400).json({ message: 'E-mail already in use' });
            }
            const insertedId = await UserModel.create({
                firstName,
                lastName,
                email,
                phone,
                password,
            });
            res.json({ message: `User created with _id: ${insertedId}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await UserModel.findOneById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;
