import {Router} from "express";
import {createPost, getPost, getPosts} from "../controllers/PostsController.js";
import {postValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";
import checkAuth from "../middlewares/checkAuth.js";
import {CommentController} from "../controllers/controllers.js"
const router = Router();

router.post('/', ...postValidator, handleErrors, checkAuth, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);

router.get('/:id/comments', CommentController.getComments)
router.post('/:id/comments', checkAuth, CommentController.createComment)
export default router;