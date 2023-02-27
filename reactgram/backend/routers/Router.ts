import { FastifyInstance } from "fastify";
import { userRoutes } from "./UserRoutes";

export async function routes(app: FastifyInstance) {
	app.register(userRoutes, {
		prefix: "/api/users",
	});

	app.get("/", async (req, res) => {
		return "Hello";
	});
}
