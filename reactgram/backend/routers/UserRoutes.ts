import { FastifyInstance } from "fastify";
import { register } from "../controllers/UserController";

export async function userRoutes(app: FastifyInstance) {
	app.post("/register", register);
}
