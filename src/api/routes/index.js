import { Router } from 'express';
import authRouter from "./auth.js";
import usersRouter from "./users.js"
import postsRouter from "./posts.js"

const router = Router();


router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);

export default router