import {CommentModel, LikeModel, PostModel} from "../../models/index.js";

export const createLike = async (req, res) => {
    try {
        const {type, entityType} = req.body;
        const entityId = req.params.id;
        const userId = req.userId;
        let entity = null;

        if (entityType === "post")
            entity = await PostModel.findOne({
                where: {id: entityId}
            })
        else if (entityType === "comment")
            entity = await CommentModel.findOne({
                where: {id: entityId}
            })


        if (!entity)
            return res.status(400).json({message: "invalid object"});

        const like = await LikeModel.findOne({
            where: {
                userId: userId,
                entityId: entityId,
                entityType: entityType,
            },

        });

        if (!like) {
            await LikeModel.create({
                userId: userId,
                entityId: entityId,
                entityType: entityType,
                type: type
            })

            if (type === "like") {
                await entity.increment("rating", {by: 1});
            } else {
                await entity.decrement("rating", {by: 1});
            }

        } else {
            if (like.dataValues.type != type) {
                if (type === "like") {
                    await entity.increment("rating", {by: 1});
                } else {
                    await entity.decrement("rating", {by: 1});
                }
            }
            await like.update({type: type});
        }


        await entity.save()


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
