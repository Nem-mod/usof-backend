import { Router } from 'express';
import authRouter from "./auth.js";
import usersRouter from "./users.js"
import postsRouter from "./posts.js"
import categoriesRouter from "./categories.js"
const router = Router();


router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/categories', categoriesRouter)
export default router