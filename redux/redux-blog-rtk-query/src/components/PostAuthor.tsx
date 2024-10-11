import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers, User } from "@/features/users/usersSlice";

const PostAuthor = ({ userId }: { userId?: number }) => {
	const users = useSelector(selectAllUsers);
	const author = users.find((user) => +user.id === userId) as User;

	return (
		<span>
			by{" "}
			{author ? (
				<Link to={`/user/${userId}`}>{author.name}</Link>
			) : (
				"Unknown author"
			)}
		</span>
	);
};
export default PostAuthor;
