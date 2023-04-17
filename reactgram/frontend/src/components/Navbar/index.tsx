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
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { AppDispatch } from "../../types/AppDispatch";

const Navbar = () => {
	const { auth } = useAuth();
	const { user } = useSelector((state: initialStateData) => state.auth);

	const navigate = useNavigate();

	const dispatch: AppDispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());

		navigate("/login");
	};

	return (
		<nav className={styles.nav}>
			<Link to="/">ReactGram</Link>

			<form className={styles["search-form"]}>
				<BsSearch />
				<input type="text" placeholder="Pesquisar" />
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
