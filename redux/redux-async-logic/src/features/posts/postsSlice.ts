import axios from "axios";
import { sub } from "date-fns";
import {
	createAsyncThunk,
	createSlice,
	nanoid,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export type Reactions = "thumbsUp" | "wow" | "heart" | "rocket" | "coffee";

export interface Post {
	id: string;
	title: string;
	body: string;
	userId?: number;
	date: string;
	reactions: Record<Reactions, number>;
}

interface InitialState {
	posts: Post[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null | undefined;
}

const initialState: InitialState = {
	posts: [],
	status: "idle",
	error: null,
};

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

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action: PayloadAction<Post>) {
				state.posts.push(action.payload);
			},
			prepare(title: string, content: string, userId: number) {
				return {
					payload: {
						id: nanoid(),
						title,
						body: content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		reactionAdded(
			state,
			action: PayloadAction<{ postId: string; reaction: Reactions }>
		) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find(
				(post) => post.id === postId
			) as Post;

			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
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

				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				const sortedPosts = state.posts.sort((a, b) => {
					if (a.id > b.id) return 1;
					if (a.id < b.id) return -1;

					return 0;
				});

				action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};

				state.posts.push(action.payload);
			});
	},
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
