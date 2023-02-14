// libraries
import { Link } from "react-router-dom";

// styles
import styles from "./About.module.scss";

const About = () => {
	return (
		<div className={styles.about}>
			<h2>
				Sobre o Mini <span>Blog</span>
			</h2>
			<p>
				Esse projeto consiste em um blog feito com React no frontend e
				Firebase no backend
			</p>

			<Link to="/posts/create" className="btn">
				Criar post
			</Link>
		</div>
	);
};

export default About;
