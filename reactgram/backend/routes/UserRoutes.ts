import express from "express";
const router = express.Router();

// Controller
import {
	getCurrentUser,
	getUserById,
	login,
	register,
	update,
} from "../controllers/UserController";

// Middlewares
import { authGuard } from "./../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import { imageUpload } from "./../middlewares/imageUpload";
import {
	loginValidation,
	userCreateValidation,
	userUpdateValidation,
} from "../middlewares/userValidation";

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
	"/",
	authGuard,
	userUpdateValidation(),
	validate,
	imageUpload.single("profileImage"),
	update
);
router.get("/:id", getUserById);

export { router };
