import {Router} from "express";
import {PostController} from "../controllers/controllers.js";
import {postValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";
import checkAuth from "../middlewares/checkAuth.js";
import {createLike, deleteLike} from "../controllers/utils/likes.js"
const router = Router();

router.post('/', ...postValidator, handleErrors, checkAuth, PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);

router.get('/:id/comments', PostController.getComments)
router.post('/:id/comments', checkAuth, PostController.createComment);

router.get('/:id/categories', PostController.getCategories);
router.patch('/:id', checkAuth, PostController.update);
router.delete('/:id', checkAuth, PostController.remove);

router.post('/:id/like', checkAuth, createLike);
router.delete('/:id/like', checkAuth, deleteLike);

export default router;