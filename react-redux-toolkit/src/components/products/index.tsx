import products from "../../data/products";
import * as Styles from "./styles";
import ProductItem from "../product-item/index";

const Products = () => {
	return (
		<Styles.Container>
			{products.map((product) => (
				<ProductItem product={product} key={product.id} />
			))}
		</Styles.Container>
	);
};

export default Products;
