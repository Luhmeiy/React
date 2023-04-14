import express from "express";

export const router = express();

router.use("/api/users", require("./UserRoutes"));

router.get("/", (req, res) => {
	res.send("API working!");
});
