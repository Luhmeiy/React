import { Request, Response } from "express";
import { Photo } from "./../models/Photo";
import mongoose from "mongoose";
import { Readable } from "stream";

import { RequestData } from "./../interfaces/RequestData";
import { User } from "../models/User";

interface MulterFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	size: number;
	destination: string;
	filename: string;
	path: string;
	buffer: Buffer;
	stream: Readable;
}

interface RequestFileData extends Request, RequestData {
	file?: MulterFile;
}

// Insert a photo, with an user related to it
export const insertPhoto = async (req: RequestFileData, res: Response) => {
	const { title } = req.body;
	const image = req.file!.filename;

	const reqUser = req.user;

	const user = await User.findById(reqUser._id);

	if (user) {
		// Create a photo
		const newPhoto = await Photo.create({
			image,
			title,
			userId: user._id,
			userName: user.name,
		});

		// If photo was created successfully, return data
		if (!newPhoto) {
			res.status(422).json({
				errors: [
					"Houve um problema, por favor tente novamente mais tarde.",
				],
			});

			return;
		}

		res.status(201).json(newPhoto);
	}
};

// Remove a photo from DB
export const deletePhoto = async (req: RequestData, res: Response) => {
	const { id } = req.params;
	const reqUser = req.user;

	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

		// Check if photo exists
		if (!photo) {
			res.status(404).json({ errors: ["Foto não encontrada!"] });

			return;
		}

		// Check if photo belongs to user
		if (!photo.userId.equals(reqUser._id)) {
			res.status(422).json({
				errors: [
					"Ocorreu um erro, por favor tente novamente mais tarde.",
				],
			});
		}

		await Photo.findByIdAndDelete(photo._id);

		res.status(200).json({
			id: photo._id,
			message: "Foto excluída com sucesso.",
		});
	} catch (error) {
		res.status(404).json({ errors: ["Foto não encontrada!"] });

		return;
	}
};

// Get all photos
export const getAllPhotos = async (req: Request, res: Response) => {
	const photos = await Photo.find({})
		.sort([["createdAt", -1]])
		.exec();

	return res.status(200).json(photos);
};

// Get user photos
export const getUserPhotos = async (req: Request, res: Response) => {
	const { id } = req.params;

	const photos = await Photo.find({ userId: id })
		.sort([["createdAt", -1]])
		.exec();

	return res.status(200).json(photos);
};

// Get photo by id
export const getPhotoById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

	// Check if photo exists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });

		return;
	}

	res.status(200).json(photo);
};

// Update a photo
export const updatePhoto = async (req: RequestData, res: Response) => {
	const { id } = req.params;
	const { title } = req.body;

	const reqUser = req.user;

	const photo = await Photo.findById(id);

	// Check if photo exists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });

		return;
	}

	// Check if photo belongs to user
	if (!photo.userId.equals(reqUser._id)) {
		res.status(422).json({
			errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
		});

		return;
	}

	if (title) {
		photo.title = title;
	}

	await photo.save();

	res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

// Like functionality
export const likePhoto = async (req: RequestData, res: Response) => {
	const { id } = req.params;

	const reqUser = req.user;

	const photo = await Photo.findById(id);

	// Check if photo exists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });

		return;
	}

	// Check if user already liked the photo
	if (photo.likes.includes(reqUser._id)) {
		res.status(422).json({ errors: ["Você já curtiu a foto."] });

		return;
	}

	// Put user id in likes array
	photo.likes.push(reqUser._id);

	photo.save();

	res.status(200).json({
		photoId: id,
		userId: reqUser._id,
		message: "A foto foi curtida.",
	});
};

// Comment functionality
export const commentPhoto = async (req: RequestData, res: Response) => {
	const { id } = req.params;
	const { comment } = req.body;

	const reqUser = req.user;

	const user = await User.findById(reqUser._id);

	const photo = await Photo.findById(id);

	// Check if photo exists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });

		return;
	}

	if (user) {
		// Put comment in the array of comments
		const userComment = {
			comment,
			userName: user.name,
			userImage: user.profileImage,
			userId: user._id,
		};

		photo.comments.push(userComment);

		await photo.save();

		res.status(200).json({
			comment: userComment,
			message: "O comentário foi adicionado com sucesso!",
		});
	}
};

// Search photos by title
export const searchPhotos = async (req: Request, res: Response) => {
	const { q } = req.query;

	const photos = await Photo.find({
		title: new RegExp(String(q), "i"),
	}).exec();

	res.status(200).json(photos);
};
