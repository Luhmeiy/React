// components
import { HookUseContext } from "./components/HookUseContext";

// libraries
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import About from "./pages/About";
import Home from "./pages/Home";

// styles
import "./App.scss";

function App() {
	return (
		<div className="App">
			<h1>React Hooks</h1>
			<HookUseContext>
				<BrowserRouter>
					<ul className="navbar">
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/about">About</Link>
						</li>
					</ul>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</BrowserRouter>
			</HookUseContext>
		</div>
	);
}

export default App;
