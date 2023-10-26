import {CategoryModel, PostModel} from "../models/index.js";
import {getPagination, getPagingData} from "../../utils/helpers/pagination.js";

export const getAll = async (req, res) => {
    try {
        const categories = await CategoryModel.findAndCountAll()
        res.json(categories)
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const categories = await CategoryModel.findOne({
            where: {id: id}
        });
        res.json(categories)
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const getPostsWithCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const {page, size} = req.query;
        const {limit, offset} = getPagination(page, size);
        await PostModel.findAndCountAll({
            include: {
                attributes: [],
                model: CategoryModel,
                as: "postCategories",
                where: {id: id},
                nested: true
            },
            limit,
            offset
        }).then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        });
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


export const create = async (req, res) => {
    try {
        const {title, description} = req.body;
        const category = await CategoryModel.create({
            title: title,
            description: description
        });

        res.json(category)
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const update = async (req, res) => {
    try {
        const {description} = req.body;
        const id = req.params.id;
        const category = await CategoryModel.findOne({where: {id: id}});
        await category.update({description: description})
        res.json(category)
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await CategoryModel.destroy({where: {id: id}});
        res.json({message: "success"})
    } catch (e) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}