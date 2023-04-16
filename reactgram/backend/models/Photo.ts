import mongoose, { Schema } from "mongoose";

interface IPhoto extends mongoose.Document {
	image: String;
	title: String;
	likes: any[];
	comments: Object[];
	userId: mongoose.Types.ObjectId;
	userName: String;
}

const photoSchema = new Schema<IPhoto>(
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

export const Photo = mongoose.model<IPhoto>("Photo", photoSchema);
