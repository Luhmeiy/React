import { useEffect, useMemo, useState } from "react";

const HookUseMemo = () => {
	const [number, setNumber] = useState(0);

	const premiumNumbers = useMemo(() => {
		return [0, 100, 200];
	}, []);

	useEffect(() => {
		console.log("Premium numbers was altered!");
	}, [premiumNumbers]);

	return (
		<div>
			<h2>useMemo</h2>
			<input type="text" onChange={(e) => setNumber(+e.target.value)} />

			{premiumNumbers.includes(number) ? (
				<p>The number was right!</p>
			) : (
				""
			)}
		</div>
	);
};

export default HookUseMemo;
