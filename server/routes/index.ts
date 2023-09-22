import {Router} from 'express';
import userRouter from './userRouter';
import typeRouter from './typeRouter';
import brandRouter from './brandRouter';
import productRouter from './productRouter';

export interface CustomRequest {
	user?: IUser
}

export interface IUser {
	id: string;
	email: string;
	role: string;
}

const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);

export default router;