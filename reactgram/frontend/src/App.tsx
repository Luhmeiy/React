import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { Home, Login, Register } from "./pages";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />

				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
