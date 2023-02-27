// interfaces
import { UserProps } from "../interfaces/UserProps";

// libraries
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongoose";

// models
import { User } from "../models/User";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id: ObjectId) => {
	const userId = id.toString();
	return bcrypt.hash(userId, jwtSecret!);
};

export const register = async (req: FastifyRequest, res: FastifyReply) => {
	const { name, email, password } = req.body as UserProps;

	const user = await User.findOne({ email });

	if (user) {
		res.send(new Error("Por favor, utilize outro email."));
		return;
	}

	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: passwordHash,
	});

	if (!newUser) {
		res.status(422).send({
			errors: "Houve um erro, por favor tente mais tarde.",
		});
		return;
	}

	res.status(201).send({
		_id: newUser._id,
		token: generateToken(newUser._id),
	});
};

export const login = async (req: FastifyRequest, res: FastifyReply) => {
	const { email, password } = req.body as UserProps;
	const user = await User.findOne({ email });

	if (!user) {
		console.log("A");
		res.status(404).send(new Error("Usuário não encontrado."));
		return;
	}

	if (!(await bcrypt.compare(password, user.password!))) {
		console.log(password, user.password);
		res.status(422).send(new Error("Senha inválida."));
		return;
	}

	res.send("Sucesso");
};
