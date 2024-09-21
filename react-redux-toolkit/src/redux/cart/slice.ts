import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../../interfaces/Product";

const initialState = {
	products: [] as CartProduct[],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			const productIsAlreadyInCart = state.products.some(
				({ id }) => id === action.payload.id
			);

			if (productIsAlreadyInCart) {
				state.products = state.products.map((product) =>
					product.id === action.payload.id
						? { ...product, quantity: product.quantity + 1 }
						: product
				);

				return;
			}

			state.products = [
				...state.products,
				{ ...action.payload, quantity: 1 },
			];
		},
		removeProduct: (state, action) => {
			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
		},
		increaseProductQuantity: (state, action) => {
			state.products = state.products.map((product) =>
				product.id === action.payload
					? { ...product, quantity: product.quantity + 1 }
					: product
			);
		},
		decreaseProductQuantity: (state, action) => {
			state.products = state.products
				.map((product) =>
					product.id === action.payload
						? { ...product, quantity: product.quantity - 1 }
						: product
				)
				.filter((product) => product.quantity > 0);
		},
	},
});

export const {
	addProduct,
	removeProduct,
	increaseProductQuantity,
	decreaseProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
