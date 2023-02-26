import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id: string) => {
	return bcrypt.hash(id, jwtSecret!);
};

export const register = (req: FastifyRequest, res: FastifyReply) => {
	res.send("Registro");
};
