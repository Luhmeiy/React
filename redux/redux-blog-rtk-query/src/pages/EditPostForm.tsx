import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { RootState } from "@/app/store";
import { selectAllUsers, User } from "@/features/users/usersSlice";
import {
	selectPostById,
	useDeletePostMutation,
	useUpdatePostMutation,
} from "@/features/posts/postsSlice";

const EditPostForm = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const [updatePost, { isLoading }] = useUpdatePostMutation();
	const [deletePost] = useDeletePostMutation();

	const post = useSelector((state: RootState) =>
		selectPostById(state, Number(postId))
	);
	const users = useSelector(selectAllUsers) as User[];

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.body);
	const [userId, setUserId] = useState(post.userId);

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	const canSave = [title, content, userId].every(Boolean) && !isLoading;

	const onSavePostClicked = async () => {
		if (canSave) {
			try {
				await updatePost({
					id: post.id,
					title: title,
					body: content,
					userId: userId,
					reactions: post.reactions,
				}).unwrap();

				setTitle("");
				setContent("");
				setUserId(0);

				navigate(`/post/${postId}`);
			} catch (error) {
				console.error("Failed to save the post", error);
			}
		}
	};

	const onDeletePostClicked = async () => {
		try {
			await deletePost({ id: post.id }).unwrap();

			setTitle("");
			setContent("");
			setUserId(0);

			navigate("/");
		} catch (err) {
			console.error("Failed to delete the post", err);
		}
	};

	return (
		<section>
			<h2>Edit Post</h2>

			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor="postAuthor">Author:</label>
				<select
					id="postAuthor"
					value={userId}
					onChange={(e) => setUserId(Number(e.target.value))}
				>
					<option value=""></option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>

				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button onClick={onSavePostClicked} disabled={!canSave}>
					Save Post
				</button>

				<button onClick={onDeletePostClicked} className="deleteButton">
					Delete Post
				</button>
			</form>
		</section>
	);
};

export default EditPostForm;
