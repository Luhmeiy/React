import CartActionTypes from "./action-types";

export const addProductToCart = (payload: any) => ({
	type: CartActionTypes.ADD_PRODUCT,
	payload,
});

export const removeProductToCart = (payload: string) => ({
	type: CartActionTypes.REMOVE_PRODUCT,
	payload,
});

export const increaseProductQuantity = (payload: string) => ({
	type: CartActionTypes.INCREASE_PRODUCT_QUANTITY,
	payload,
});

export const decreaseProductQuantity = (payload: string) => ({
	type: CartActionTypes.DECREASE_PRODUCT_QUANTITY,
	payload,
});
