// hooks
import { useFetch } from "../hooks/useFetch";

// libraries
import { Link } from "react-router-dom";

// styles
import styles from './Home.module.scss';

const Home = () => {
	const url = 'http://localhost:3000/products';

	const { data: items, loading, error } = useFetch(url);

	return (
		<div>
			<h1>Produtos</h1>
			{error && <p>{error}</p>}
			<ul className={styles.products}>
				{items &&
					items.map((item) => (
						<li key={item.id}>
							<h2>{item.name}</h2>
							<p>R$: {item.price}</p>
							<Link to={`/products/${item.id}`}>Mais informações</Link>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default Home;