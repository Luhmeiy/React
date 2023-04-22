// hooks
import { useFetch } from "../hooks/useFetch";

// libraries
import { Link, useParams } from "react-router-dom";

interface fetchProps {
	data: {
		id: number;
		name: string;
		price: number;
	}[]
	loading: boolean;
	error: string | null;
}
	

const Product = () => {
	let { id } = useParams();

	const url = `http://localhost:3000/products/${id}`;

	const { data: product, loading, error }: fetchProps = useFetch(url);

	return (
		<>
			{error && <p>Ocorreu um erro...</p>}
			{loading && <p>Carregando...</p>}
			{product && (
				<div>
					<h1>{product.name}</h1>
					<p>R${product.price}</p>

					<Link to={`/products/${id}/info`}>Mais informações</Link>
				</div>
			)}
		</>
	)
}

export default Product;