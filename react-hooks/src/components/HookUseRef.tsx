import { useEffect, useRef, useState } from "react";

const HookUseRef = () => {
	const numberRef = useRef(0);
	const [counter, setCounter] = useState(0);
	const [counterB, setCounterB] = useState(0);
	const [text, setText] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		numberRef.current = numberRef.current + 1;
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setText("");

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<div>
			<h2>useRef</h2>
			<p>Component rendered: {numberRef.current} times</p>
			<p>Counter A: {counter}</p>
			<button onClick={() => setCounter(counter + 1)}>Counter A</button>
			<p>Counter B: {counterB}</p>
			<button onClick={() => setCounterB(counterB + 1)}>Counter B</button>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					ref={inputRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default HookUseRef;
