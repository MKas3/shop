import ApiError from "../error/ApiError";
import {NextFunction, Request, Response} from "express";
import {Cart, User} from "../models/models";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {CustomRequest} from '../routes';

const generateJwt = (id: string, email: string, role: string) => {
	return jwt.sign(
		{id, email, role},
		process.env.SECRET_KEY as string,
		{expiresIn: '24h'}
	);
}

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		const {username, email, password, role} = req.body;
		if (role !== 'USER')
			return next(ApiError.badRequest("Not accept"));
		if (!email || !password)
			return next(ApiError.badRequest('AuthPage'));
		const candidate = await User.findOne({where: {email}});
		if (candidate)
			return next(ApiError.badRequest('AuthPage email exist'));
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({email, username, password: hashPassword, role});
		const cart = await Cart.create({userId: user.dataValues.id});
		const token = generateJwt(user.dataValues.id, email, user.dataValues.role);
		return res.json({token});
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const {emailUsername, password} = req.body;
		let user = await User.findOne({where: {email: emailUsername}}) || await User.findOne({where: {username: emailUsername}});
		if (!user)
			return next(ApiError.badRequest('Login email'));

		let comparePassword = bcrypt.compareSync(password, user.dataValues.password);
		if (!comparePassword)
			return next(ApiError.badRequest('Login password'));
		const token = generateJwt(user.dataValues.id, user.dataValues.email, user.dataValues.role);
		return res.json({token});
	}

	async check(req: Request, res: Response, next: NextFunction) {
		const user = (req as CustomRequest).user;
		const token = generateJwt(user!.id, user!.email, user!.role);
		return res.json({token});
	}
}

export default new UserController;