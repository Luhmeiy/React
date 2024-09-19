import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";

import * as Styles from "./styles";
import { CartProduct } from "../../interfaces/Product";
import {
	decreaseProductQuantity,
	increaseProductQuantity,
	removeProductToCart,
} from "../../redux/cart/actions";

const CartItem = ({ product }: { product: CartProduct }) => {
	const dispatch = useDispatch();

	const handleRemoveClick = () => {
		dispatch(removeProductToCart(product.id));
	};

	const handleIncreaseClick = () => {
		dispatch(increaseProductQuantity(product.id));
	};

	const handleDecreaseClick = () => {
		dispatch(decreaseProductQuantity(product.id));
	};

	return (
		<Styles.CartItemContainer>
			<Styles.CartItemImage imageUrl={product.imageUrl} />

			<Styles.CartItemInfo>
				<p>{product.name}</p>
				<p>R${product.price}</p>

				<Styles.CartItemQuantity>
					<AiOutlineMinus
						size={20}
						onClick={handleDecreaseClick}
						aria-label={`Decrease quantity of ${product.name}`}
					/>
					<p>{product.quantity}</p>
					<AiOutlinePlus
						size={20}
						onClick={handleIncreaseClick}
						aria-label={`Increase quantity of ${product.name}`}
					/>
				</Styles.CartItemQuantity>
			</Styles.CartItemInfo>

			<Styles.RemoveButton
				onClick={handleRemoveClick}
				aria-label={`Remove ${product.name}`}
			>
				<AiOutlineClose size={25} />
			</Styles.RemoveButton>
		</Styles.CartItemContainer>
	);
};

export default CartItem;
