import axios from "axios";
import { sub } from "date-fns";
import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Types / Interfaces
export type Reactions = "thumbsUp" | "wow" | "heart" | "rocket" | "coffee";

export interface Post {
	id: number;
	title: string;
	body: string;
	userId?: number;
	date: string;
	reactions: Record<Reactions, number>;
}

// Initial state
const postsAdapter = createEntityAdapter<Post>({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
	status: "idle",
	error: "",
	count: 0,
});

// Functions
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POSTS_URL);
	return [...response.data];
});

export const addNewPost = createAsyncThunk(
	"posts/addNewPost",
	async (initialPost: { title: string; body: string; userId: number }) => {
		const { data } = await axios.post(POSTS_URL, initialPost);
		return data;
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async (initialPost: {
		id: number;
		title: string;
		body: string;
		userId: number;
		reactions: Record<Reactions, number>;
	}) => {
		const { id } = initialPost;

		try {
			const { data } = await axios.put(`${POSTS_URL}/${id}`, initialPost);

			return data;
		} catch (error) {
			return error;
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (initialPost: { id: number }) => {
		const { id } = initialPost;

		try {
			const response = await axios.delete(`${POSTS_URL}/${id}`);

			if (response?.status === 200) return initialPost;

			return `${response?.status}: ${response?.statusText}`;
		} catch (error) {
			return error instanceof Error ? error.message : "Unknown error";
		}
	}
);

// Slice
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		reactionAdded(
			state,
			action: PayloadAction<{ postId: number; reaction: Reactions }>
		) {
			const { postId, reaction } = action.payload;
			const existingPost = state.entities[postId] as Post;

			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
		increaseCount(state) {
			state.count = state.count + 1;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				let min = 1;

				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), {
						minutes: min++,
					}).toISOString();

					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};

					return post;
				});

				postsAdapter.upsertMany(state, loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message!;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.id = state.ids[state.ids.length - 1] + 1;

				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};

				postsAdapter.addOne(state, action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Update could not complete.");
					console.log(action.payload);

					return;
				}

				action.payload.date = new Date().toISOString();
				postsAdapter.upsertOne(state, action.payload);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (typeof action.payload === "object" && action.payload?.id) {
					const { id } = action.payload;
					postsAdapter.removeOne(state, id);
				} else {
					console.log("Delete could not complete.");
					console.log(action.payload);
				}
			});
	},
});

// Exports
export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const getCount = (state: RootState) => state.posts.count;

export const selectPostsByUser = createSelector(
	[selectAllPosts, (state, userId) => userId],
	(posts, userId: number) => posts.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
