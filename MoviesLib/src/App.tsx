// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import { Home, Movie, Search } from "./pages";

// styles
import "./App.scss";
import { Navbar } from "./components";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movie/:id" element={<Movie />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
