import bcrypt from "bcrypt";
import {User, VerificationCode} from "../models/User.js";
import jwt from "jsonwebtoken";
import {jwtSecretKey} from "../../config/index.js";
import {sendCodeToEmail, generateRandomCode} from "../../utils/utils.js"

export const register = async (req, res) => {
    try {
        const data = req.body;

        const confirmCode = generateRandomCode(5);
        await sendCodeToEmail(data.email, confirmCode);

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);

        const {dataValues: user} = await User.create({
            ...data,
            password: hash
        })


        await VerificationCode.create({
            code: confirmCode,
            userId: user.id
        })


        res.json({
            message: "Verification code was sent to your email.",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Registration error'
        });
    };
}

export const verifyAccount = async (req, res) => {
    try {
        const {confirmCode} = req.body;
        const verification = await VerificationCode.findOne({
            where: {
                code: confirmCode
            }
        })

        if(verification?.dataValues?.code !== confirmCode)
            throw "code is invalid";

        const user = await User.findOne({
            where: {
                id: verification.userId
            }
        });

        await user.update({isVerified: true})
        await verification.destroy();


        res.json({
            message: "success"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Verification error: ${error}`
        });
    };
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user.dataValues || user?.dataValues?.isVerified != true) {
            return res.status(404).json({
                message: 'Error'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.dataValues.password);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Incorrect login or password'
            })
        }

        const token = jwt.sign(
            {
                _id: user.id
            },
            jwtSecretKey,
            {
                expiresIn: '30d'
            }
        );

        const {password, createdAt, updatedAt, email, ...userData} = user.dataValues;

        res.json({
            ...userData,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'Authorization error'
        });
    }
};


export const getVerificationCode = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        const confirmCode = generateRandomCode(5);
        await sendCodeToEmail(user.dataValues.email,  confirmCode)

        await VerificationCode.sync().then(() => {
            VerificationCode.findOrCreate({
                where: {
                    userId: userId
                },

                defaults: {
                    userId: userId,
                    code: confirmCode,
                }

            }).then((result) => {
                const verificationCode = result[0];
                const created = result[1];

                if(!created) {
                    verificationCode.update({code: confirmCode})
                }
            })
        })

        res.json({
            message: "Verification code was sent to your email.",

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Get verification code error: ${error}`
        });
    };
}



export const resetPassword = async (req, res) => {
    try {
        const {confirmCode, ...data} = req.body;
        const userId = req.userId;
        const verification = await VerificationCode.findOne({
            where: {
                userId: userId
            }
        })

        if(!verification)
            throw "reset password error"


        if(verification.dataValues.code !== confirmCode)
            throw "code is invalid";

        const user = await User.findOne({
            where: {
                id: verification.dataValues.userId
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        await user.update({password: hash})

        await verification.destroy();
        const {password, createdAt, updatedAt, email, ...userData} = user.dataValues;

        res.json({
            ...userData
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Code is invalid'
        });
    }


}

export const getUser = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(400).json({
                message: 'User is not found'
            });
        }

        const {password, createdAt, updatedAt, email, ...userData} = user;
        res.json(userData);

    } catch (error) {
        return res.status(500).json({
            message: 'Permission denied'
        });
    }
}
