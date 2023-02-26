import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

export async function conn() {
	try {
		const dbConn = await mongoose.connect(
			`mongodb+srv://${dbUser}:${dbPassword}@cluster0.sgeuwyo.mongodb.net/?retryWrites=true&w=majority`
		);

		console.log("Conectou ao banco!");

		return dbConn;
	} catch (err) {
		console.log(err);
	}
}

conn();
