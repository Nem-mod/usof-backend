import {Router} from "express";
import {CategoryController} from "../controllers/controllers.js"
import checkAuth from "../middlewares/checkAuth.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
const router = Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.get('/:id/posts', CategoryController.getPostsWithCategory);

router.post('/', checkAuth, checkIsAdmin, CategoryController.create);
router.patch('/:id', checkAuth, checkIsAdmin, CategoryController.update);
router.delete('/:id', checkAuth, checkIsAdmin, CategoryController.remove);
export default router