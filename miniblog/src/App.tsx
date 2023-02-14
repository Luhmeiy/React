// components / pages
import { Footer, Navbar } from "./components";
import { About, Home, Login, Register } from "./pages";

// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import "./App.scss";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="" element={<Home />} />
						<Route path="/about" element={<About />} />
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
