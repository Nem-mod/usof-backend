import { body } from "express-validator";
const loginValidator = [
    body('login', 'Incorrect email').isString(),
    body('password' ,'Incorrect password').isLength({ min: 5 }),
];

export default loginValidator;
