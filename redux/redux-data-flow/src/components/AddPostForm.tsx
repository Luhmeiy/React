import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "@/features/posts/postsSlice";
import { selectAllUsers } from "@/features/users/usersSlice";

const AddPostForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const users = useSelector(selectAllUsers);

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(postAdded(title, content, userId));

			setTitle("");
			setContent("");
		}
	};

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

	return (
		<section>
			<h2>Add a New Post</h2>
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
					onChange={(e) => setUserId(e.target.value)}
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

				<button
					type="button"
					onClick={onSavePostClicked}
					disabled={!canSave}
				>
					Save Post
				</button>
			</form>
		</section>
	);
};
export default AddPostForm;
