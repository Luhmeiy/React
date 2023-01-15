// hooks
import { useFetch } from './hooks/useFetch';

// React
import { useState } from 'react';

// styles // SCSS
import styles from './App.module.scss';

const url: string = "http://localhost:3000/products";

interface Product {
	name: string,
	price: string
}

function App() {
	const { data: items, httpConfig, loading, error } = useFetch(url);

	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const product: Product = {
			name,
			price
		}

		httpConfig(product, "POST");

		setName("");
		setPrice("");
	}

	return (
		<div className={styles.App}>
			<h1>Product List</h1>

			{ loading && <p>Loading data...</p>  }
			{ error && <p>{error}</p> }
			{ !error && (
				<ul className={styles['product-list']}>
					{items && items.map(product => (
						<li key={product.id}>{product.name} - R$ {product.price}</li>
					))}
				</ul>
			) }
			
			<div className={styles['add-product']}>
				<form className={styles['add-product__form']} onSubmit={handleSubmit}>
					<label>
						Name:
						<input className={styles['add-product__input']} type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
					</label>
					<label>
						Price:
						<input className={styles['add-product__input']} type="number" name="price" value={price} onChange={e => setPrice(e.target.value)} />
					</label>

					{ loading && <input className={styles['add-product__input']} type="submit" value="Wait" disabled /> }
					{ !loading && <input className={styles['add-product__input']} type="submit" value="Create" /> }
				</form>
			</div>
		</div>
	);
}

export default App;