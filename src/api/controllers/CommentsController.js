import {CommentModel, UserModel} from "../models/index.js";


export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await CommentModel.findOne({where: {id: id}});
        res.json(comment);
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const update = async (req, res) => {
    try {
        const {content} = req.body;
        const id = req.params.id;
        const userId = req.userId;

        const comment = await CommentModel.findOne({where: {id: id}});

        if (userId !== comment.dataValues.author)
            res.json({message: "accesses denied"});

        await comment.update({content: content});
        res.json(comment);
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const comment = await CommentModel.findOne({where: {id: id}});
        const user = await UserModel.findOne({where:{id: userId}});

        if (userId !== comment.dataValues.author && user.dataValues.role !== "admin")
            res.json({message: "accesses denied"});

        await comment.destroy();
        res.json({message: "success"});
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

