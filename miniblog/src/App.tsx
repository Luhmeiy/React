// components / pages
import { Footer, Navbar } from "./components";
import { About, CreatePost, Dashboard, Home, Login, Register } from "./pages";

// context / hooks
import { AuthProvider } from "./context/AuthContext";
import { useAuthentication } from "./hooks/useAuthentication";

// libraries
import { onAuthStateChanged, User } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// styles
import "./App.scss";

function App() {
	const [user, setUser] = useState<User | undefined>(undefined);
	const { auth } = useAuthentication();

	const loadingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user!);
		});
	}, [auth]);

	if (loadingUser) {
		return <p>Carregando...</p>;
	}

	return (
		<div>
			<AuthProvider value={user}>
				<BrowserRouter>
					<Navbar />
					<div className="container">
						<Routes>
							<Route path="" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route
								path="/login"
								element={
									!user ? <Login /> : <Navigate to="/" />
								}
							/>
							<Route
								path="/register"
								element={
									!user ? <Register /> : <Navigate to="/" />
								}
							/>
							<Route
								path="/posts/create"
								element={
									user ? (
										<CreatePost />
									) : (
										<Navigate to="/login" />
									)
								}
							/>
							<Route
								path="/dashboard"
								element={
									user ? (
										<Dashboard />
									) : (
										<Navigate to="/login" />
									)
								}
							/>
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
