import "./Auth.scss";
import { initialStateData } from "../../interfaces/initialStateData";
import { register, reset } from "../../slices/authSlice";
import { Message } from "../../components";

// React
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

type AppDispatch = ThunkDispatch<initialStateData, {}, AnyAction>;

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch: AppDispatch = useDispatch();

	const { loading, error } = useSelector(
		(state: initialStateData) => state.auth
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const user = {
			name,
			email,
			password,
			confirmPassword,
		};

		console.log(user);

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

				{loading && <input type="submit" value="Aguarde..." disabled />}
				{!loading && <input type="submit" value="Cadastrar" />}
				{error && <Message msg={error} type="error" />}
			</form>

			<p>
				Já tem conta? <Link to="/login">Clique aqui.</Link>
			</p>
		</div>
	);
};

export default Register;
