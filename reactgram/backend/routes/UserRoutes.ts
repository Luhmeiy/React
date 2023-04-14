import express from "express";

const router = express.Router();

// Controller
import { login, register } from "../controllers/userController";

// Middlewares
import { validate } from "../middlewares/handleValidation";
import {
	loginValidation,
	userCreateValidation,
} from "../middlewares/userValidation";

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;
