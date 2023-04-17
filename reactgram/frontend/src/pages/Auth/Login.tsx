import "./Auth.scss";

// Components
import { Link } from "react-router-dom";
import { Message } from "../../components";

// Hooks
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Interface / Types
import { initialStateData } from "../../interfaces/initialStateData";
import { AppDispatch } from "../../types/AppDispatch";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch: AppDispatch = useDispatch();

	const { loading, error } = useSelector(
		(state: initialStateData) => state.auth
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const user = {
			email,
			password,
		};

		dispatch(login(user));
	};

	// Clean all auth states
	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	return (
		<div className="login">
			<h2>ReactGram</h2>
			<p className="subtitle">Faça o login para ver o que há de novo.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					placeholder="Senha"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>

				{loading && <input type="submit" value="Aguarde..." disabled />}
				{!loading && <input type="submit" value="Entrar" />}
				{error && <Message msg={error} type="error" />}
			</form>

			<p>
				Não tem uma conta? <Link to="/register">Clique aqui!</Link>
			</p>
		</div>
	);
};

export default Login;
