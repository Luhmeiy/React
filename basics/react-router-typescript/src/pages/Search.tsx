// libraries
import { useSearchParams, Link } from "react-router-dom";

// React
import { useFetch } from "../hooks/useFetch";

const Search = () => {
	const [searchParams] = useSearchParams();

	const url = `http://localhost:3000/products?${searchParams}`;

	const { data: items, loading, error } = useFetch(url);

	return (
		<div>
			<h1>Resultados disponíveis</h1>
			{items &&
				items.map((item) => (
					<li key={item.id}>
						<h2>{item.name}</h2>
						<p>R$: {item.price}</p>
						<Link to={`/products/${item.id}`}>Mais informações</Link>
					</li>
				))
				}
		</div>
	)
}

export default Search;