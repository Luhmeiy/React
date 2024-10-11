import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectAllUsers } from "@/features/users/usersSlice";
import { useAddNewPostMutation } from "@/features/posts/postsSlice";

const AddPostForm = () => {
	const navigate = useNavigate();

	const [addNewPost] = useAddNewPostMutation();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState(0);
	const [addRequestStatus, setAddRequestStatus] = useState("idle");

	const users = useSelector(selectAllUsers);

	const canSave =
		[title, content, userId].every(Boolean) && addRequestStatus === "idle";

	const onSavePostClicked = async () => {
		if (canSave) {
			try {
				setAddRequestStatus("pending");
				await addNewPost({ title, body: content, userId }).unwrap();

				setTitle("");
				setContent("");
				setUserId(0);

				navigate("/");
			} catch (error) {
				console.log(`Failed to save the post ${error}`);
			} finally {
				setAddRequestStatus("idle");
			}
		}
	};

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
