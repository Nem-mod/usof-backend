import {CommentModel, UserModel} from "../models/index.js";

export const createComment = async (req, res) => {
    try {
        const {content} = req.body;
        const postId = req.params.id;
        const userId = req.userId;
        const comment = await CommentModel.create({
                content: content,
                parent: postId,
                author: userId
        });

        res.json(comment)

    } catch (error) {
        res.status(400).json({
            message: "create comment error"
        })
    }
}

export const getComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await CommentModel.findAndCountAll( {
                where: {
                    parent: postId
                }
        });

        res.json(comments)

    } catch (error) {
        res.status(400).json({
            message: "get comments error"
        })
    }
}