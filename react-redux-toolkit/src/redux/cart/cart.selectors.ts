import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../root-reducer";

const cartProducts = (state: RootState) => state.cartReducer.products;

export const selectProductsCount = createSelector([cartProducts], (products) =>
	products.reduce((acc, curr) => acc + curr.quantity, 0)
);

export const selectProductsTotalPrice = createSelector(
	[cartProducts],
	(products) =>
		products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
);
