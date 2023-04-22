// libraries
import { Link, NavLink } from 'react-router-dom';

// styles / SCSS
import styles from './Navbar.module.scss';

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			{/* <Link to="/">Home</Link>
			<Link to="/about">About</Link> */}

			<NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
			<NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>About</NavLink>
		</nav>
	)
}

export default Navbar;