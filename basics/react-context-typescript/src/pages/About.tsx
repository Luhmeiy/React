// hooks
import { useCounterContext } from "../hooks/useCounterContext";
import { useTitleColorContext } from "../hooks/useTitleColorContext";

const About = () => {
	const { counter } = useCounterContext();

	const { color, dispatch } = useTitleColorContext();

	const setTitleColor = (color: string) => {
		dispatch({ type: color });
	}

	return (
		<div>
			<h1 style={{ color: color }}>Sobre</h1>
			<p>Valor do contador: {counter}</p>

			<div>
				<button onClick={() => setTitleColor("RED")}>Vermelho</button>
				<button onClick={() => setTitleColor("BLUE")}>Azul</button>
			</div>
		</div>
	)
}

export default About;