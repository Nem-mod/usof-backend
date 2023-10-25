import {Router} from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    editMe,
    uploadAvatar,
    updateUser,
    deleteUser
} from "../controllers/UsersController.js";
import {upload} from "../../storage.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkIsAdmin from "../middlewares/checkIsAdmin.js";
import {registerValidator} from "../validators/validators.js";
import {handleErrors} from "../../utils/utils.js";

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', ...registerValidator, handleErrors, checkAuth, checkIsAdmin, createUser);
router.patch("/avatar", checkAuth, upload.single('file'), uploadAvatar);
router.patch('/me', checkAuth, editMe);
router.patch('/:id', checkAuth, checkIsAdmin, updateUser);
router.delete('/:id', checkAuth, checkIsAdmin, deleteUser);
export default router