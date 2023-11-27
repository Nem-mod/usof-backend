import {UserModel} from "../models/index.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    try {
        const data = await UserModel.findAll({
            attributes: ["id", "login", "fname", "lname", "rating", "profile_picture_url"],
            where: {
                isVerified: true
            }
        })

        res.json({
            data
        })

    } catch (error) {
        res.status(500).json({
            message: 'error'
        });
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            attributes: ["id", "login", "fname", "lname", "rating", "profile_picture_url"],
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            return res.status(400).json({
                message: 'User is not found'
            });
        }

        const userData = user.dataValues;
        res.json(userData);

    } catch (error) {
        return res.status(500).json({
            message: 'Permission denied'
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        await UserModel.create({
            ...data,
            password: hash
        }).catch(error => {
            throw "Bad request";
        })

        res.json({
            message: "success"
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

export const uploadAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findOne({
            where: {id: userId}
        })
        await user.update({profile_picture_url: `${req.fileName}`});

        res.json(user)

    } catch (error) {
        res.status(500).json({
            message: 'Error upload img'
        })
    }
}

export const editMe = async (req, res) => {
    try {
        const data = req.body;

        const user = await UserModel.findOne({
            where: {
                id: req.userId
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'User is not found'
            });
        }

        if (data?.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash
        }
        await user.update(data)

        const {password, createdAt, updatedAt, email, ...userData} = user.dataValues;
        res.json(userData);
    } catch (error) {
        return res.status(401).json({
            message: 'error update user'
        });
    }
}


export const updateUser = async (req, res) => {
    try {
        const data = req.body;

        const user = await UserModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'User is not found'
            });
        }

        if (data?.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash
        }
        await user.update(data)

        const {password, createdAt, updatedAt, email, ...userData} = user.dataValues;
        res.json(userData);
    } catch (error) {
        return res.status(401).json({
            message: 'error update user'
        });
    }
}



export const deleteUser = async (req, res) => {
    try {
        await UserModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: 'successes'
        })

    } catch (e) {
        return res.status(500).json({
            message: 'error delete user'
        });
    }
}
