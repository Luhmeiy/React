// context / hooks
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";

// libraries
import { NavLink } from "react-router-dom";

// styles
import styles from "./Navbar.module.scss";

const Navbar = () => {
	const user = useAuthValue()?.user ?? null;
	const { logout } = useAuthentication();

	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={styles.brand}>
				Mini <span>Blog</span>
			</NavLink>

			<ul className={styles.links_list}>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Home
					</NavLink>
				</li>

				{!user && (
					<>
						<li>
							<NavLink
								to="/login"
								className={({ isActive }) =>
									isActive ? styles.active : ""
								}
							>
								Entrar
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/register"
								className={({ isActive }) =>
									isActive ? styles.active : ""
								}
							>
								Cadastrar
							</NavLink>
						</li>
					</>
				)}

				{user && (
					<>
						<li>
							<NavLink
								to="/posts/create"
								className={({ isActive }) =>
									isActive ? styles.active : ""
								}
							>
								Novo post
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									isActive ? styles.active : ""
								}
							>
								Dashboard
							</NavLink>
						</li>
					</>
				)}

				<li>
					<NavLink
						to="/about"
						className={({ isActive }) =>
							isActive ? styles.active : ""
						}
					>
						Sobre
					</NavLink>
				</li>

				{user && (
					<li>
						<button onClick={logout}>Sair</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
