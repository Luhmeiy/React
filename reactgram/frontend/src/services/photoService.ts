import { api, requestConfig } from "./../utils/config";

// Publish an user photo
const publichPhoto = async (data: any, token: any) => {
	const config = requestConfig("POST", data, token, true);

	try {
		const res = await fetch(`${api}/photos`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Get user photos
const getUserPhotos = async (id: string, token: any) => {
	const config = requestConfig("GET", null, token);

	try {
		const res = await fetch(`${api}/photos/user/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Delete a photo
const deletePhoto = async (id: string, token: any) => {
	const config = requestConfig("DELETE", null, token);

	try {
		const res = await fetch(`${api}/photos/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Update a photo
const updatePhoto = async (data: any, id: string, token: any) => {
	const config = requestConfig("PUT", data, token);

	try {
		const res = await fetch(`${api}/photos/${id}`, config)
			.then((res) => res.json)
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Get a photo by id
const getPhoto = async (id: string, token: any) => {
	const config = requestConfig("GET", null, token);

	try {
		const res = await fetch(`${api}/photos/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Like a photo
const like = async (id: string, token: any) => {
	const config = requestConfig("PUT", null, token);

	try {
		const res = await fetch(`${api}/photos/like/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Add comment to a photo
const comment = async (data: any, id: string, token: any) => {
	const config = requestConfig("PUT", data, token);

	try {
		const res = await fetch(`${api}/photos/comment/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Get all photos
const getPhotos = async (token: any) => {
	const config = requestConfig("GET", null, token);

	try {
		const res = await fetch(`${api}/photos`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

const photoService = {
	publichPhoto,
	getUserPhotos,
	deletePhoto,
	updatePhoto,
	getPhoto,
	like,
	comment,
	getPhotos,
};

export default photoService;
