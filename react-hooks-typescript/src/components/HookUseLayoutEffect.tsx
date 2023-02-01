import { useEffect, useLayoutEffect, useState } from "react";

const HookUseLayoutEffect = () => {
	const [name, setName] = useState("Some name");

	useEffect(() => {
		console.log("2");
		setName("It changed again!");
	}, []);

	useLayoutEffect(() => {
		console.log("1");
		setName("Another name");
	}, []);

	console.log(name);

	return (
		<div>
			<h2>useLayoutEffect</h2>
			<p>Name: {name}</p>
		</div>
	);
};

export default HookUseLayoutEffect;
