import {Router} from "express";
import brandController from "../controllers/brandController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
router.get('/', brandController.getAll);

export default router;