import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";

import * as Styles from "./styles";
import CustomButton from "../custom-button/index";
import { Product } from "../../interfaces/Product";
import { addProduct } from "../../redux/cart/slice";

const ProductItem = ({ product }: { product: Product }) => {
	const dispatch = useDispatch();

	const handleProductClick = () => {
		dispatch(addProduct(product));
	};

	return (
		<Styles.ProductContainer>
			<Styles.ProductImage imageUrl={product.imageUrl}>
				<CustomButton
					startIcon={<BsCartPlus />}
					onClick={handleProductClick}
				>
					Adicionar ao carrinho
				</CustomButton>
			</Styles.ProductImage>

			<Styles.ProductInfo>
				<p>{product.name}</p>
				<p>R${product.price}</p>
			</Styles.ProductInfo>
		</Styles.ProductContainer>
	);
};

export default ProductItem;
