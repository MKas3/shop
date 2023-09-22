import {Router} from "express";
import productController from "../controllers/productController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

export default router;