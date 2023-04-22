import { useState } from "react";

const HookUseState = () => {
	let username = "João";
	const [name, setName] = useState("Luiz");
	const [age, setAge] = useState(19);

	const changeNames = () => {
		username = "João Souza";

		setName("Luiz Medeiros");
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(age);
	};

	return (
		<div>
			<h2>useState</h2>
			<p>Variable: {username}</p>
			<p>useState: {name}</p>

			<button onClick={changeNames}>Change names!</button>

			<h3>How old are you?</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={age}
					onChange={(e) => setAge(+e.target.value)}
				/>

				<input type="submit" value="Submit" />
			</form>

			<p>You are {age} years old!</p>
		</div>
	);
};

export default HookUseState;
