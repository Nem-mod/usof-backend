import {User} from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: ["id", "login", "fname", "lname", "rating", "profile_picture_url"],
            where: {
                isVerified: true
            }
        })

        res.json({
            data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error'
        });
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
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
        const user = await User.create({
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
        // TODO: Update user avatar in db. Main problem is multiple req with json and file.
        res.json({
            url: `/uploads/${req.file.originalname}`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error upload img'
        })
    }
}

export const editMe = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({
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

        const user = await User.findOne({
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
        await User.destroy({
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