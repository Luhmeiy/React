import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const port = process.env.PORT;
const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
import "./config/db";

/// routes
import { router } from "./routes/Router";
app.use(router);

app.listen(port, () => {
	console.log(`App rodando na porta ${port}`);
});
