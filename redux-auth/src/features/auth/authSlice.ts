import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	user: string | null;
	token: string | null;
}

const initialState: InitialState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.token = accessToken;
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
