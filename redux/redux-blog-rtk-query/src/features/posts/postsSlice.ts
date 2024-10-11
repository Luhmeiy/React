import { sub } from "date-fns";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "@/app/store";

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

const initialState = postsAdapter.getInitialState();

// Slice
export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/posts",
			transformResponse: (responseData: Post[]) => {
				let min = 1;
				const loadedPosts = responseData.map((post) => {
					if (!post?.date)
						post.date = sub(new Date(), {
							minutes: min++,
						}).toISOString();
					if (!post?.reactions)
						post.reactions = {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						};
					return post;
				});
				return postsAdapter.setAll(initialState, loadedPosts);
			},
			providesTags: (result) => [
				{ type: "Post", id: "LIST" },
				...result!.ids.map((id) => ({ type: "Post" as const, id })),
			],
		}),
		getPostsByUserId: builder.query({
			query: (id) => `/posts/?userId=${id}`,
			transformResponse: (responseData: Post[]) => {
				let min = 1;
				const loadedPosts = responseData.map((post) => {
					if (!post?.date)
						post.date = sub(new Date(), {
							minutes: min++,
						}).toISOString();
					if (!post?.reactions)
						post.reactions = {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						};
					return post;
				});
				return postsAdapter.setAll(initialState, loadedPosts);
			},
			providesTags: (result) => [
				...result!.ids.map((id) => ({ type: "Post" as const, id })),
			],
		}),
		addNewPost: builder.mutation({
			query: (initialPost) => ({
				url: "/posts",
				method: "POST",
				body: {
					...initialPost,
					userId: Number(initialPost.userId),
					date: new Date().toISOString(),
					reactions: {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					},
				},
			}),
			invalidatesTags: [{ type: "Post", id: "LIST" }],
		}),
		updatePost: builder.mutation({
			query: (initialPost) => ({
				url: `/posts/${initialPost.id}`,
				method: "PUT",
				body: {
					...initialPost,
					date: new Date().toISOString(),
				},
			}),
			invalidatesTags: ({ arg }) => [{ type: "Post", id: arg.id }],
		}),
		deletePost: builder.mutation({
			query: ({ id }) => ({
				url: `/posts/${id}`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: ({ arg }) => [{ type: "Post", id: arg.id }],
		}),
		addReaction: builder.mutation({
			query: ({ postId, reactions }) => ({
				url: `posts/${postId}`,
				method: "PATCH",
				body: { reactions },
			}),
			async onQueryStarted(
				{ postId, reactions },
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					extendedApiSlice.util.updateQueryData(
						"getPosts",
						undefined,
						(draft) => {
							const post = draft.entities[postId];
							if (post) post.reactions = reactions;
						}
					)
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
	}),
});

// Exports
export const {
	useGetPostsQuery,
	useGetPostsByUserIdQuery,
	useAddNewPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
	useAddReactionMutation,
} = extendedApiSlice;

export const selectPostsResult =
	extendedApiSlice.endpoints.getPosts.select(null);

const selectPostsData = createSelector(
	selectPostsResult,
	(postsResult) => postsResult.data
);

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors(
	(state: RootState) => selectPostsData(state) ?? initialState
);
