// React
import React from 'react'

// styles / SCSS
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.header__title}>React + TS Todo</h1>
		</header>
	)
}

export default Header;