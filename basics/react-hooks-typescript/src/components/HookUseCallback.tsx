// components
import List from "./List";

// React
import { useCallback, useState } from "react";

const HookUseCallback = () => {
	const [counter, setCounter] = useState(0);

	const getItemsFromDatabase = useCallback(() => {
		return ["a", "b", "c"];
	}, []);

	return (
		<div>
			<h2>useCallback</h2>
			<List getItems={getItemsFromDatabase} />
			<button onClick={() => setCounter(counter + 1)}>Change!</button>
			<p>{counter}</p>
		</div>
	);
};

export default HookUseCallback;
