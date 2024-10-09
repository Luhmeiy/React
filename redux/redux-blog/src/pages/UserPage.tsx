import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "@/app/store";
import { selectUserById } from "@/features/users/usersSlice";
import { selectPostsByUser } from "@/features/posts/postsSlice";

const UserPage = () => {
	const { userId } = useParams();

	const user = useSelector((state: RootState) =>
		selectUserById(state, Number(userId))
	);

	const posts = useSelector((state: RootState) =>
		selectPostsByUser(state, Number(userId))
	);

	return (
		<section>
			<h2>{user?.name}</h2>

			<ol>
				{posts.map((post) => (
					<li key={post.id}>
						<Link to={`/post/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ol>
		</section>
	);
};

export default UserPage;
