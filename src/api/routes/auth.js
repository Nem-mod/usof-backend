import {Router} from "express";
import {getVerificationCode, login, register, resetPassword, verifyAccount} from "../controllers/AuthController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router();

// AUTH
router.post('/register', register)

router.post('/register/verification', verifyAccount)

router.post('/send-verification-code', checkAuth, getVerificationCode)

router.post('/password-reset', checkAuth, resetPassword)

router.post('/login', login)
export default router