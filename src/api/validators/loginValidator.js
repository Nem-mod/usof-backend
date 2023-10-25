import { body } from "express-validator";
const loginValidator = [
    body('email', 'Incorrect email').isEmail(),
    body('password' ,'Incorrect password').isLength({ min: 5 }),
];

export default loginValidator;
