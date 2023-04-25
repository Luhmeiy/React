import styles from "./Navbar.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	BsFillCameraFill,
	BsFillPersonFill,
	BsHouseDoorFill,
	BsSearch,
} from "react-icons/bs";
import { initialStateData } from "../../interfaces/initialStateData";

// Hooks
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { AppDispatch } from "../../types/AppDispatch";

const Navbar = () => {
	const { auth } = useAuth();
	const { user } = useSelector((state: initialStateData) => state.auth);

	const [query, setQuery] = useState("");

	const navigate = useNavigate();

	const dispatch: AppDispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());

		navigate("/login");
	};

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<nav className={styles.nav}>
			<Link to="/">ReactGram</Link>

			<form className={styles["search-form"]} onSubmit={handleSearch}>
				<BsSearch />
				<input
					type="text"
					placeholder="Pesquisar"
					onChange={(e) => setQuery(e.target.value)}
				/>
			</form>

			<ul className={styles["nav-links"]}>
				{auth ? (
					<>
						<li>
							<NavLink to="/">
								<BsHouseDoorFill />
							</NavLink>
						</li>

						{user && (
							<li>
								<NavLink to={`/users/${user._id}`}>
									<BsFillCameraFill />
								</NavLink>
							</li>
						)}

						<li>
							<NavLink to="/profile">
								<BsFillPersonFill />
							</NavLink>
						</li>

						<li>
							<span onClick={handleLogout}>Sair</span>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/login">Entrar</NavLink>
						</li>

						<li>
							<NavLink to="/register">Cadastrar</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
