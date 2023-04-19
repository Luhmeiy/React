export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

interface configData {
	method: any;
	body?: any;
	headers: {
		"Content-Type"?: string;
		Authorization?: string;
	};
}

export const requestConfig = (
	method: any,
	data?: any,
	token = null,
	image: boolean | null = null
) => {
	let config: configData;

	if (image) {
		config = {
			method: method,
			body: data,
			headers: {},
		};
	} else if (method === "DELETE" || data === null) {
		config = {
			method: method,
			headers: {},
		};
	} else {
		config = {
			method: method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
	}

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
};
