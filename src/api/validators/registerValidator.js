import { body } from "express-validator";

const registerValidator = [
    body('email', 'Incorrect email').isEmail(),
    body('password' ,'Incorrect password').isLength({ min: 5 }),
    body('login', 'Incorrect login length').isLength({ min: 3 }),
    body('fname', 'Incorrect fname length').exists(),
    body('lname', 'Incorrect lname length').exists(),
];

export default registerValidator;