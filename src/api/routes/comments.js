import {Router} from "express";
import {CommentController} from "../controllers/controllers.js"
import checkAuth from "../middlewares/checkAuth.js";
const router = Router();

router.get('/:id', CommentController.getById);
router.patch('/:id', checkAuth, CommentController.update);
router.patch('/:id', checkAuth, CommentController.remove);

export default router;