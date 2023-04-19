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

const photoService = {
	publichPhoto,
	getUserPhotos,
};

export default photoService;
