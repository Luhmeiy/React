import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "@/app/store";

export interface User {
	id: number;
	name: string;
}

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			transformResponse: (responseData: User[]) => {
				return usersAdapter.setAll(initialState, responseData);
			},
			providesTags: (result) => [
				{ type: "User", id: "LIST" },
				...result!.ids.map((id) => ({ type: "User" as const, id })),
			],
		}),
	}),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(null);

const selectUsersData = createSelector(
	selectUsersResult,
	(usersResult) => usersResult.data
);

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
	selectIds: selectUserIds,
} = usersAdapter.getSelectors(
	(state: RootState) => selectUsersData(state) ?? initialState
);
