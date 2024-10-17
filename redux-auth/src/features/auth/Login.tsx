import { useRef, useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const errRef = useRef<HTMLParagraphElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current!.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const userData = await login({ user, pwd }).unwrap();

			dispatch(setCredentials({ ...userData, user }));

			setUser("");
			setPwd("");

			navigate("/welcome");
		} catch (err) {
			if (!err?.originalStatus) {
				setErrMsg("No Server Response");
			}

			switch (err.originalStatus) {
				case 400:
					setErrMsg("Missing Username or Password");
					break;
				case 401:
					setErrMsg("Unauthorized");
					break;
				default:
					setErrMsg("Login Failed");
			}

			errRef.current!.focus();
		}
	};

	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<section className="login">
			<p
				ref={errRef}
				className={errMsg ? "errmsg" : "offscreen"}
				aria-live="assertive"
			>
				{errMsg}
			</p>

			<h1>Employee Login</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					ref={userRef}
					value={user}
					onChange={(e) => setUser(e.target.value)}
					autoComplete="off"
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<button>Sign In</button>
			</form>
		</section>
	);
};
export default Login;
