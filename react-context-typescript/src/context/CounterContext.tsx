// interfaces
import { ICounterChildren } from "../interfaces/CounterChildren";

// React
import { createContext, useState } from "react";

type CounterType = {
	counter: number,
	setCounter: React.Dispatch<React.SetStateAction<number>>
}

const counterState = {
	counter: 0,
	setCounter: () => {}
}

export const CounterContext = createContext<CounterType>(counterState);

export const CounterContextProvider = ({children}: ICounterChildren) => {
	const [counter, setCounter] = useState(5);

	return (
		<CounterContext.Provider value={{ counter, setCounter }}>
			{children}
		</CounterContext.Provider>
	)
}