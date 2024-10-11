import { useSelector } from "react-redux";

import { selectPostIds, useGetPostsQuery } from "@/features/posts/postsSlice";
import PostsExcerpt from "@/components/PostsExcerpt";

const PostsList = () => {
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery(null);

	const orderedPostsIds = useSelector(selectPostIds);

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = orderedPostsIds.map((postId) => (
			<PostsExcerpt key={postId} postId={postId} />
		));
	} else if (isError) {
		content = <p>{error.toString()}</p>;
	}

	return <section>{content}</section>;
};

export default PostsList;
