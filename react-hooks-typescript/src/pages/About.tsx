// components
import { SomeContext } from "../components/HookUseContext";

// React
import { useContext } from "react";

const About = () => {
	const { context } = useContext(SomeContext);

	return (
		<div>
			<h2>About</h2>
			<p>Context value: {context}</p>
		</div>
	);
};

export default About;
