import Fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import { routes } from "./routers/Router";
import { conn } from "./config/db";
import path from "path";
import ajvErrors from "ajv-errors";

dotenv.config();

const app = Fastify({
	ajv: {
		customOptions: {
			coerceTypes: false,
			allErrors: true,
		},
		plugins: [ajvErrors],
	},
});

app.register(cors);
app.register(routes);
app.register(conn);
app.register(require("@fastify/static"), {
	root: path.join(__dirname, "/uploads"),
	prefix: "/uploads",
});

const serverPort = process.env.PORT;

app.listen({
	host: "0.0.0.0",
	port: +serverPort!,
})
	.then(() => {
		console.log(`App rodando na porta ${serverPort}`);
	})
	.catch((err) => console.log(err));
