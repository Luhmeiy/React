import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		return next();
	}

	const extractedErrors: Array<Error> = [];

	errors.array().map((error) => extractedErrors.push(error.msg));

	return res.status(422).json({ errors: extractedErrors });
};
