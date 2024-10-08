import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/app/store";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

interface User {
	id: number;
	name: string;
}

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const { data } = await axios.get(USERS_URL);
	return data;
});

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
