import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
	const user = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);

	return (
		<section className="welcome">
			<h1>{user ? `Welcome ${user}!` : "Welcome!"}</h1>
			<p>Token: {`${token!.slice(0, 9)}...`}</p>
			<p>
				<Link to="/userslist">Go to the Users List</Link>
			</p>
		</section>
	);
};

export default Welcome;
