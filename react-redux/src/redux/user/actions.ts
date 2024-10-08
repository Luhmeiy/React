import UserActionTypes from "./action-types";

export const loginUser = (payload: any) => ({
	type: UserActionTypes.LOGIN,
	payload,
});

export const logoutUser = () => ({
	type: UserActionTypes.LOGOUT,
});
