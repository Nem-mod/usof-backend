import {Router} from "express";
import {PostController} from "../controllers/controllers.js";
import {postValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";
import checkAuth from "../middlewares/checkAuth.js";
import {CommentController} from "../controllers/controllers.js"
const router = Router();

router.post('/', ...postValidator, handleErrors, checkAuth, PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);

router.get('/:id/comments', CommentController.getComments)
router.post('/:id/comments', checkAuth, CommentController.createComment)
export default router;