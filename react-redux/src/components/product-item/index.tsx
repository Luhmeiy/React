import { BsCartPlus } from "react-icons/bs";
import * as Styles from "./styles";
import CustomButton from "../custom-button/index";
import { Product } from "../../interfaces/Product";

const ProductItem = ({ product }: { product: Product }) => {
	return (
		<Styles.ProductContainer>
			<Styles.ProductImage imageUrl={product.imageUrl}>
				<CustomButton startIcon={<BsCartPlus />}>
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
