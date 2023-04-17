import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data: any) => {
	const config = requestConfig("POST", data);

	try {
		const res = await fetch(api + "/users/register", config)
			.then((res) => res.json())
			.catch((err) => err);

		if (res) {
			localStorage.setItem("user", JSON.stringify(res));
			return res;
		}
	} catch (error) {
		console.log(error);
	}
};

export const authService = {
	register,
};