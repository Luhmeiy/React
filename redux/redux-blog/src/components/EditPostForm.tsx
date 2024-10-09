import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "@/app/store";
import { selectAllUsers } from "@/features/users/usersSlice";
import {
	deletePost,
	selectPostById,
	updatePost,
} from "@/features/posts/postsSlice";

const EditPostForm = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const post = useSelector((state: RootState) =>
		selectPostById(state, Number(postId))
	);
	const users = useSelector(selectAllUsers);

	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.body);
	const [userId, setUserId] = useState(post?.userId);
	const [requestStatus, setRequestStatus] = useState("idle");

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	const canSave =
		[title, content, userId].every(Boolean) && requestStatus === "idle";

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus("pending");

				dispatch(
					updatePost({
						id: post.id,
						title: title!,
						body: content!,
						userId: userId!,
						reactions: post.reactions,
					})
				).unwrap();

				setTitle("");
				setContent("");
				setUserId(0);

				navigate(`/post/${postId}`);
			} catch (error) {
				console.error("Failed to save the post", error);
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	const onDeletePostClicked = () => {
		try {
			setRequestStatus("pending");
			dispatch(deletePost({ id: post.id })).unwrap();

			setTitle("");
			setContent("");
			setUserId(0);

			navigate("/");
		} catch (err) {
			console.error("Failed to delete the post", err);
		} finally {
			setRequestStatus("idle");
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
