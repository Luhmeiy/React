import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id: mongoose.Types.ObjectId) => {
	return jwt.sign({ id }, jwtSecret!, {
		expiresIn: "7d",
	});
};

// Register user and sign in
export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	// Check if user exists
	const user = await User.findOne({ email });

	if (user) {
		res.status(422).json({ errors: ["Por favor, utilize outro email."] });
	}

	// Generate password hash
	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);

	// Create user
	const newUser = await User.create({
		name,
		email,
		password: passwordHash,
	});

	// If user was created successfully, return token
	if (!newUser) {
		res.status(422).json({
			errors: ["Houve um erro, por favor, tente mais tarde."],
		});

		return;
	}

	res.status(201).json({
		_id: newUser._id,
		token: generateToken(newUser._id),
	});
};

// Sing user in
export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Check if user exists
	if (!user) {
		res.status(404).json({ errors: ["Usuário não encontrado."] });
	}

	// Check if password matches
	if (!(await bcrypt.compare(password, user!.password!))) {
		res.status(422).json({ errors: ["Senha inválida."] });
	}

	// Return user with token
	res.status(201).json({
		_id: user!._id,
		profileImage: user!.profileImage,
		token: generateToken(user!._id),
	});
};
