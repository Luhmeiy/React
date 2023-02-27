import { FastifyInstance } from "fastify";
import { login, register } from "../controllers/UserController";
import {
	registerValidation,
	loginValidation,
} from "../middlewares/userValidation";
import { UserProps } from "../interfaces/UserProps";

export async function userRoutes(app: FastifyInstance) {
	app.post("/register", { schema: registerValidation }, (req, res) => {
		const { name, email, password, confirmPassword } =
			req.body as UserProps;

		res.send({ name, email, password, confirmPassword }).then(
			() => register(req, res),
			(err) => console.log(err)
		);
	});

	app.post("/login", { schema: loginValidation }, (req, res) => {
		const { name, email, password, confirmPassword } =
			req.body as UserProps;

		res.send({ name, email, password, confirmPassword }).then(
			() => login(req, res),
			(err) => console.log(err)
		);
	});
}
