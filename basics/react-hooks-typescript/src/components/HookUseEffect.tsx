import { useEffect, useState } from "react";

const HookUseEffect = () => {
	const [number, setNumber] = useState(1);
	const [anotherNumber, setAnotherNumber] = useState(0);

	useEffect(() => {
		console.log("I'm running!");
	}, []);

	useEffect(() => {
		if (anotherNumber > 0) {
			console.log("I'm ran when anotherNumber changes!");
		}
	}, [anotherNumber]);

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log("Hello world");

			setAnotherNumber(anotherNumber + 1);
		}, 2000);

		return () => clearTimeout(timer);
	}, [anotherNumber]);

	return (
		<div>
			<h2>useEffect</h2>

			<p>Number: {number}</p>
			<button onClick={() => setNumber(number + 1)}>
				Change number!
			</button>

			<p>Number: {anotherNumber}</p>
			<button onClick={() => setAnotherNumber(anotherNumber + 1)}>
				Change number!
			</button>
		</div>
	);
};

export default HookUseEffect;
