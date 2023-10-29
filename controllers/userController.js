import User from '../models/user.js';
import _ from 'lodash';

const userController = {
    getUser: async function(req, res) {
        const id = parseInt(req.query.id);
        let result;
        try {
            result = await User.findOne({
                where: {
                    id: id
                }
            });
        }
        catch {
            res.status(500).json({ error: "INTERNAL" });
        }
        if (_.isEmpty(result)) res.status(404).json({ error: 'NOT_FOUND' })
        else res.status(200).json({ user: result });
    },

    createUser: async function(req, res) {
        const data = req.body;
        try {
            await User.create({...data});
            res.status(200).json({ result: "OK" });
        }
        catch {
            res.status(500).json({ error: "INTERNAL" });
        }
    },

    updateUser: async function(req, res) {
        const data = req.body;
        try {
            await User.update(data, {
                where: {
                    id: data.id
                }
            });
            res.status(200).json({ result: "OK" });
        }
        catch {
            res.status(500).json({ error: "INTERNAL" });
        }
    },

    deleteUser: async function(req, res) {
        const id = parseInt(req.query.id);
        try {
            await User.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({ result: "OK" });
        }
        catch {
            res.status(500).json({ error: "INTERNAL" });
        }
    }
}

export default userController;