// context
import { CounterContext } from "../context/CounterContext";

// React
import { useContext } from "react";

export const useCounterContext = () => {
	const context = useContext(CounterContext);

	if (!context) {
		console.log("Contexto não encontrado!");
	}

	return context;
}