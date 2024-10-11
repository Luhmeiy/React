import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "@/app/store";
import { selectUserById, User } from "@/features/users/usersSlice";
import { useGetPostsByUserIdQuery } from "@/features/posts/postsSlice";

const UserPage = () => {
	const { userId } = useParams();
	const user = useSelector(
		(state: RootState) => selectUserById(state, Number(userId)) as User
	);

	const {
		data: postsForUser,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPostsByUserIdQuery(userId);

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		const { ids, entities } = postsForUser;

		content = ids.map((id) => (
			<li key={id}>
				<Link to={`/post/${id}`}>{entities[id].title}</Link>
			</li>
		));
	} else if (isError) {
		content = <p>{error.toString()}</p>;
	}

	return (
		<section>
			<h2>{user?.name}</h2>

			<ol>{content}</ol>
		</section>
	);
};

export default UserPage;
