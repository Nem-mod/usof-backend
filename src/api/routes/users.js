import {Router} from "express";
import {UserController} from "../controllers/controllers.js";
import {upload} from "../../storage.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
import {registerValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.post('/', ...registerValidator, handleErrors, checkAuth, checkIsAdmin, UserController.createUser);
router.patch("/avatar", checkAuth, upload.single('file'), UserController.uploadAvatar);
router.patch('/me', checkAuth, UserController.editMe);
router.patch('/:id', checkAuth, checkIsAdmin, UserController.updateUser);
router.delete('/:id', checkAuth, checkIsAdmin, UserController.deleteUser);
export default router