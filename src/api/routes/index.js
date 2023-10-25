import { Router } from 'express';
import auth from "./auth.js";
import users from "./users.js"

const router = Router();


router.use('/auth', auth)
router.use('/users', users)


export default router