import "./Auth.scss";
import { register, reset } from "../../slices/authSlice";
import { SubmitButton } from "../../components";

// React
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/AppDispatch";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch: AppDispatch = useDispatch();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const user = {
			name,
			email,
			password,
			confirmPassword,
		};

		dispatch(register(user));
	};

	// Clean all auth states
	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	return (
		<div className="register">
			<h2>ReactGram</h2>
			<p className="subtitle">
				Cadastre-se para ver as fotos dos seus amigos.
			</p>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>

				<input
					type="email"
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

				<input
					type="password"
					placeholder="Confirme a senha"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
				/>

				<SubmitButton action="Cadastrar" />
			</form>

			<p>
				Já tem conta? <Link to="/login">Clique aqui!</Link>
			</p>
		</div>
	);
};

export default Register;
