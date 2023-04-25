import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import { Footer, Navbar } from "./components";
import {
	EditProfile,
	Home,
	Login,
	Photo,
	Profile,
	Register,
	Search,
} from "./pages";

function App() {
	const { auth, loading } = useAuth();

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />

				<div className="container">
					<Routes>
						<Route
							path="/"
							element={auth ? <Home /> : <Navigate to="/login" />}
						/>
						<Route
							path="/profile"
							element={
								auth ? (
									<EditProfile />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/users/:id"
							element={
								auth ? <Profile /> : <Navigate to="/login" />
							}
						/>
						<Route
							path="/login"
							element={!auth ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/register"
							element={!auth ? <Register /> : <Navigate to="/" />}
						/>
						<Route
							path="/search"
							element={
								auth ? <Search /> : <Navigate to="/login" />
							}
						/>
						<Route
							path="/photos/:id"
							element={
								auth ? <Photo /> : <Navigate to="/login" />
							}
						/>
					</Routes>
				</div>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
