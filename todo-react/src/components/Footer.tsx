// React
import React from 'react'

// styles / SCSS
import styles from "./Footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p className={styles.footer__item}>
				<span className={styles.footer__span}>React + TS Todo</span> &copy; 2021
			</p>
		</footer>
	)
}

export default Footer;