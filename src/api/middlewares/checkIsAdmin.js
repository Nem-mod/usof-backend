import {UserModel} from "../models/index.js";

export default async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id: req.userId
            }
        })

        if (!user || user.role !== "admin") {
            throw "Permission denied";
        }

        next();
    } catch (error) {
        res.status(403).json({
            message: "No permissions"
        });
    }
}