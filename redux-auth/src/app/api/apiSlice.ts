import {
	BaseQueryApi,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "@/features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3500",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

const baseQueryWithReauth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 403) {
		console.log("sending refresh token");

		const refreshResult = await baseQuery("/refresh", api, extraOptions);

		if (refreshResult?.data) {
			const user = (api.getState() as RootState).auth.user;

			api.dispatch(setCredentials({ ...refreshResult.data, user }));

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});
