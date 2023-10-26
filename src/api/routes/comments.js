import {Router} from "express";
import {CommentController} from "../controllers/controllers.js"
import checkAuth from "../middlewares/checkAuth.js";
import {createLike, deleteLike} from "../controllers/utils/likes.js";
const router = Router();

router.get('/:id', CommentController.getById);
router.patch('/:id', checkAuth, CommentController.update);
router.patch('/:id', checkAuth, CommentController.remove);

router.post('/:id/like', checkAuth, createLike);
router.delete('/:id/like', checkAuth, deleteLike);


export default router;