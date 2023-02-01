// hooks
import { usePrevious } from "../hooks/usePrevious";

// React
import { useState } from "react";

const HookCustom = () => {
	const [number, setNumber] = useState(0);
	const previousValue = usePrevious(number);

	return (
		<div>
			<h2>Custom Hook</h2>
			<p>Current: {number}</p>
			<p>Previous: {previousValue}</p>
			<button onClick={() => setNumber(Math.random())}>Change!</button>
		</div>
	);
};

export default HookCustom;
