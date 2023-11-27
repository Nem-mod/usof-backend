import {Router} from "express";
import * as UtilsController from "../controllers/UtilsController.js";

const router = Router();

router.get("/:fileName", UtilsController.getFile);

export default router