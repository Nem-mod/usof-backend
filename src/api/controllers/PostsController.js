import {getPagination, getPagingData} from "../../utils/utils.js";
import {CategoryModel, CommentModel, PostModel, UserModel} from "../models/index.js";


export const getPost = async (req, res) => {
    try {
       const id = req.params.id;
       const post = await PostModel.findOne({
           where: {
               id: id
           },
           include: [
               {
                   attributes: ["id", "title"],
                   model: CategoryModel,
                   as: "postCategories",
                   nested: true
               },
               {
                   attributes: ["id", "login", "rating", "role"],
                   model: UserModel
               }
           ]


       })
       res.json({
           post
       })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getPosts = async (req, res) => {
    try {
        const {page, size} = req.query;
        const {limit, offset} = getPagination(page, size);
        await PostModel.findAndCountAll({
            include: {
                attributes: ["id", "title"],
                model: CategoryModel,
                as: "postCategories",
                nested: true
            },
            limit,
            offset
        }).then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const {title, content, categories} = req.body;
        const userId = req.userId;

        const post = await PostModel.create({
            title: title,
            content: content,
            author: userId,
            status: 'active'
        });

        const categoriesIds = categories.map(e => {
            return e.id
        })

        await post.addPostCategories(categoriesIds);

        res.json({
            post: post.dataValues
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


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