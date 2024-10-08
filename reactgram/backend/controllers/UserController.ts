import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { RequestData } from "../interfaces/RequestData";

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
		return;
	}

	// Check password
	if (!password) {
		res.status(422).json({ errors: ["Digite uma senha."] });
		return;
	}

	// Check if password matches
	if (!(await bcrypt.compare(password, user!.password!))) {
		res.status(422).json({ errors: ["Senha inválida."] });
		return;
	}

	// Return user with token
	res.status(201).json({
		_id: user!._id,
		profileImage: user!.profileImage,
		token: generateToken(user!._id),
	});
};

// Get current logged in user
export const getCurrentUser = async (req: RequestData, res: Response) => {
	const user = req.user;

	res.status(200).json(user);
};

// Update an user
export const update = async (req: RequestData, res: Response) => {
	const { name, password, bio } = req.body;

	let profileImage: string | null = null;

	if (req.file) {
		profileImage = req.file.filename;
	}

	const reqUser = req.user;

	const user = await User.findById(
		new mongoose.Types.ObjectId(reqUser._id)
	).select("-password");

	if (user) {
		if (name) {
			user.name = name;
		}

		if (password) {
			// Generate password hash
			const salt = await bcrypt.genSalt();
			const passwordHash = await bcrypt.hash(password, salt);

			user.password = passwordHash;
		}

		if (profileImage) {
			user.profileImage = profileImage;
		}

		if (bio) {
			user.bio = bio;
		}

		await user.save();

		res.status(200).json(user);
	}
};

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findById(
			new mongoose.Types.ObjectId(id)
		).select("-password");

		// Check if user exists
		if (!user) {
			res.status(404).json({ errors: ["Usuário não encontrado"] });

			return;
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ errors: ["Usuário não encontrado"] });

		return;
	}
};
