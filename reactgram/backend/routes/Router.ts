import express from "express";

import { router as UserRoutes } from "./UserRoutes";
import { router as PhotoRoutes } from "./PhotoRoutes";

export const router = express();

router.use("/api/users", UserRoutes);
router.use("/api/photos", PhotoRoutes);

router.get("/", (req, res) => {
	res.send("API working!");
});
