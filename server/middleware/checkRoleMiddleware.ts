import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {CustomRequest, IUser} from '../routes';

export default function (role: string) {
	return function (req: Request, res: Response, next: NextFunction) {
		if (req.method === "OPTIONS")
			next();

		try {
			const token = req.headers.authorization?.split(' ')[1];
			if (!token)
				return res.status(401).json({message: 'Please auth'});
			const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
			if ((decoded as { id: string, email: string, role: string }).role !== role)
				return res.status(403).json({message: 'Not accept'});
			(req as CustomRequest).user = decoded as IUser;
			next();
		} catch (e) {
			res.status(401).json({message: 'Please auth'});
		}
	}
}