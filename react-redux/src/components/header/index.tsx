import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/root-reducer";
import { loginUser, logoutUser } from "../../redux/user/actions";

import * as Styles from "./styles";
import Cart from "../cart/index";
import { selectProductsCount } from "../../redux/cart/cart.selectors";

function Header() {
	const [cartIsVisible, setCartIsVisible] = useState(false);

	const { currentUser } = useSelector(
		(rootReducer: RootState) => rootReducer.userReducer
	);

	const productsCount = useSelector(selectProductsCount);

	const dispatch = useDispatch();

	const handleCartClick = () => {
		setCartIsVisible(true);
	};

	const handleLoginClick = () => {
		dispatch(loginUser({ name: "Luiz", email: "luiz@gmail.com" }));
	};

	const handleLogoutClick = () => {
		dispatch(logoutUser());
	};

	return (
		<Styles.Container>
			<Styles.Logo>Redux Shopping</Styles.Logo>
			<Styles.Buttons>
				{currentUser ? (
					<div onClick={handleLogoutClick}>Sair</div>
				) : (
					<div onClick={handleLoginClick}>Login</div>
				)}

				<div onClick={handleCartClick}>Carrinho ({productsCount})</div>
			</Styles.Buttons>

			<Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />
		</Styles.Container>
	);
}

export default Header;
