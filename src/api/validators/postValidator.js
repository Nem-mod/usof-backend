import { body } from "express-validator";

const postValidator = [
    body('title', 'Incorrect title length').isLength({min: 5, max: 255}),
    body('content' ,'Incorrect content length').isLength({ min: 5 }),
];

export default postValidator;