import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	fetchPosts,
	getPostsError,
	getPostsStatus,
	selectAllPosts,
} from "@/features/posts/postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { AppDispatch } from "@/app/store";

const PostsList = () => {
	const dispatch = useDispatch<AppDispatch>();

	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const postsError = useSelector(getPostsError);

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

	let content;
	if (postsStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postsStatus === "succeeded") {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));

		content = orderedPosts.map((post) => (
			<PostsExcerpt key={post.id} post={post} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{postsError}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default PostsList;
