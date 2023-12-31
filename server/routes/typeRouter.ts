import {Router} from "express";
import typeController from "../controllers/typeController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

export default router;