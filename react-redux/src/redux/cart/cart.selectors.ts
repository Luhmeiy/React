import { RootState } from "../root-reducer";

export const selectProductsCount = (rootReducer: RootState) => {
	return rootReducer.cartReducer.products.reduce(
		(acc, curr) => acc + curr.quantity,
		0
	);
};

export const selectProductsTotalPrice = (rootReducer: RootState) => {
	return rootReducer.cartReducer.products.reduce(
		(acc, curr) => acc + curr.price * curr.quantity,
		0
	);
};
