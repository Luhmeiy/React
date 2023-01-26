// interfaces
import { ICounterChildren } from "../interfaces/CounterChildren";

// React
import { createContext, useReducer } from "react";

interface IState {
    color: string;
}

interface IAction {
	type: string;
}

type TitleColorType = {
	color: string;
	dispatch: React.Dispatch<IAction>
}

const TitleColorState = {
	color: "purple",
	dispatch: () => {}
}

export const TitleColorContext = createContext<TitleColorType>(TitleColorState);

export const titleColorReducer = (state: IState, dispatch: IAction) => {
	switch(dispatch.type) {
		case "RED":
			return {...state, color: "red"};
		case "BLUE":
			return {...state, color: "blue"};
		default:
			return state;
	}
}

export const TitleColorContextProvider = ({ children }: ICounterChildren) => {
	const [state, dispatch] = useReducer(titleColorReducer, { color: "purple" });

	return (
		<TitleColorContext.Provider value={{ ...state, dispatch }}>
			{children}
		</TitleColorContext.Provider>
	)
}