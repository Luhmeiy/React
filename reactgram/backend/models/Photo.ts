import mongoose, { Schema } from "mongoose";

const photoSchema = new Schema(
	{
		image: String,
		title: String,
		likes: Array,
		comments: Array,
		userId: mongoose.Types.ObjectId,
		userName: String,
	},
	{
		timestamps: true,
	}
);

export const Photo = mongoose.model("Photo", photoSchema);
