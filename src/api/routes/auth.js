import {Router} from "express";
import {AuthController} from "../controllers/controllers.js"
import checkAuth from "../middlewares/checkAuth.js";
import {loginValidator, registerValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";

const router = Router();

// AUTH
router.post('/register', ...registerValidator, handleErrors, AuthController.register);

router.post('/login', ...loginValidator, handleErrors, AuthController.login);

router.post('/register/verification', AuthController.verifyAccount);

router.post('/send-verification-code', checkAuth, AuthController.getVerificationCode);

router.post('/password-reset', checkAuth, AuthController.resetPassword);

export default router