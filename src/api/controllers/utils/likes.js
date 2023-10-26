import {LikeModel} from "../../models/index.js";

export const createLike = async (req, res) => {
    try {
        const {type, entityType} = req.body;
        const postId = req.params.id;
        const userId = req.userId;

        await LikeModel.findOrCreate({
            where: {
                userId: userId,
                entityId: postId,
                entityType: entityType,
            },
            defaults: {
                userId: userId,
                entityId: postId,
                entityType: entityType,
                type: type
            }
        });


        res.json({message: "success"});
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


export const deleteLike = async (req, res) => {
    try {
        const {type} = req.body;
        const postId = req.params.id;
        const userId = req.userId;

        const like = await LikeModel.findOne({
            userId: userId,
            entityId: postId,
            entityType: "post",
            type: type
        });
        await like.destroy();

        res.json({message: "success"});
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}
