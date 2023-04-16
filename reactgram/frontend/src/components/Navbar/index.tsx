import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { BsHouseDoorFill, BsSearch } from "react-icons/bs";

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<Link to="/">ReactGram</Link>

			<form className={styles["search-form"]}>
				<BsSearch />
				<input type="text" placeholder="Pesquisar" />
			</form>

			<ul className={styles["nav-links"]}>
				<li>
					<NavLink to="/">
						<BsHouseDoorFill />
					</NavLink>
				</li>

				<li>
					<NavLink to="/login">Entrar</NavLink>
				</li>

				<li>
					<NavLink to="/register">Cadastrar</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
