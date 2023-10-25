import {Router} from "express";
import {getVerificationCode, login, register, resetPassword, verifyAccount} from "../controllers/AuthController.js";
import checkAuth from "../middlewares/checkAuth.js";
import {loginValidator, registerValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";

const router = Router();

// AUTH
router.post('/register', ...registerValidator, handleErrors, register);

router.post('/login', ...loginValidator, handleErrors, login);

router.post('/register/verification', verifyAccount);

router.post('/send-verification-code', checkAuth, getVerificationCode);

router.post('/password-reset', checkAuth, resetPassword);

export default router