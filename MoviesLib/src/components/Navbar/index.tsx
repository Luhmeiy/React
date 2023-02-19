// icons
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

// libraries
import { Link, useNavigate } from "react-router-dom";

// React
import { FormEvent, useState } from "react";

// styles
import styles from "./Navbar.module.scss";

const Navbar = () => {
	const [search, setSearch] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!search) return;

		navigate(`/search?q=${search}`);

		setSearch("");
	};

	return (
		<nav className={styles.navbar}>
			<h2>
				<Link to="/">
					<BiCameraMovie />
					MoviesLib
				</Link>
			</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Busque um filme"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type="submit">
					<BiSearchAlt2 />
				</button>
			</form>
		</nav>
	);
};

export default Navbar;
