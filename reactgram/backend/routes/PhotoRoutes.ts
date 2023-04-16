import express from "express";
const router = express.Router();

// Controller
import {
	insertPhoto,
	deletePhoto,
	getAllPhotos,
	getUserPhotos,
	getPhotoById,
	updatePhoto,
	likePhoto,
	commentPhoto,
	searchPhotos,
} from "../controllers/PhotoController";

// Middlewares
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "./../middlewares/imageUpload";
import {
	commentValidation,
	photoInsertValidation,
	photoUpdateValidation,
} from "../middlewares/photoValidation";
import { validate } from "../middlewares/handleValidation";

// Routes
router.post(
	"/",
	authGuard,
	imageUpload.single("image"),
	photoInsertValidation(),
	validate,
	insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", authGuard, searchPhotos);

router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put(
	"/comment/:id",
	authGuard,
	commentValidation(),
	validate,
	commentPhoto
);

export { router };
