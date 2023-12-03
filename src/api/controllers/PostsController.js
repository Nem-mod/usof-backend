import {getPagination, getPagingData} from "../../utils/utils.js";
import {CategoryModel, CommentModel, LikeModel, PostModel, UserModel} from "../models/index.js";


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
                    attributes: ["id", "login", "fname", "lname", "rating", "profile_picture_url", "rating"],
                    model: UserModel
                }
            ]


        })
        res.json({...post.dataValues})
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
            where: {
                status: "active"
            },
            // distinct: true,
            include: [
                {
                    attributes: ["id", "login", "fname", "lname", "rating", "profile_picture_url", "rating"],
                    model: UserModel,
                    as: "user",
                    nested: true
                },
                {
                    attributes: ["id", "title"],
                    model: CategoryModel,
                    as: "postCategories",
                    nested: true
                },
            ],
            order: [
                ["id", "DESC"],
            ],
            offset: offset,
            limit: limit,

            subQuery: false,
        }).then(data => {
            const response = getPagingData(data, page, limit);
            res.status(200).json(response);
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

        res.json(post)

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
        const comments = await CommentModel.findAndCountAll({
            where: {
                parent: postId
            },
            include: [
                {
                    attributes: ["id", "login", "fname", "lname", "rating", "profile_picture_url", "rating"],
                    model: UserModel,
                    as: "user",
                    nested: true
                }
            ],
        });

        res.json(comments)

    } catch (error) {
        res.status(500).json({
            message: "get comments error"
        })
    }
}


export const update = async (req, res) => {
    try {
        const {title, content, status, categories} = req.body;
        const postId = req.params.id;
        let post = await PostModel.findOne({
            where: {id: postId},
            include: {
                attributes: ["id", "title"],
                model: CategoryModel,
                as: "postCategories",
                nested: true
            },
        });

        // TODO: Needs to super refactor. Idk how to update relations in const post clindamycin
        if (categories) {

            const newCategories = categories.map(e => e.id);

            const oldCategories = post.dataValues.postCategories;
            const categoriesOnDelete = oldCategories.map(x => {
                    if (!newCategories.includes(x.dataValues.id))
                        return x.dataValues.id;
                }
            )
            await post.removePostCategories(categoriesOnDelete);
            await post.addPostCategories(newCategories);
        }

        await post.update({title: title, content: content, status: status});

        const newPost = await PostModel.findOne({
            where: {id: postId},
            include: {
                attributes: ["id", "title"],
                model: CategoryModel,
                as: "postCategories",
                nested: true
            },
        });

        res.json(newPost);

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const post = await PostModel.findOne({where: {id: id}});
        const user = await UserModel.findOne({where: {id: userId}});

        if (userId !== post.dataValues.author && user.dataValues.role !== "admin")
            res.json({message: "accesses denied"});

        await post.destroy();
        res.json({message: "success"});

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const getCategories = async (req, res) => {
    try {
        const id = req.params.id;
        const categories = await CategoryModel.findAndCountAll({
            include: {
                attributes: [],
                model: PostModel,
                as: "categoryPosts",
                where: {id: id},
            },
        });

        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}
