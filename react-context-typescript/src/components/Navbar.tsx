// libraries
import { NavLink } from 'react-router-dom';

// styles
import styles from "./Navbar.module.scss";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
			<NavLink to="/products" className={({isActive}) => (isActive ? styles.active : '')}>Products</NavLink>
			<NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>About</NavLink>
		</nav>
	)
}

export default Navbar;