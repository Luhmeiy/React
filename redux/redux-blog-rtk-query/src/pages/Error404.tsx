import { Link } from "react-router-dom";

const Error404 = () => {
	return (
		<div>
			<h2>Page not Found</h2>
			<Link to="/">Go back to homepage</Link>
		</div>
	);
};

export default Error404;
