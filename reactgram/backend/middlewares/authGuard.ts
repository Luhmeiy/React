import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

import { RequestData } from "../interfaces/RequestData";

const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async (
	req: RequestData,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	// Check if header has a token
	if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

	// Check if token is valid
	try {
		const verified = jwt.verify(token, jwtSecret!) as jwt.JwtPayload;

		req.user = await User.findById(verified.id).select("-password");

		next();
	} catch (error) {
		res.status(401).json({ errors: ["Token inválido"] });
	}
};
