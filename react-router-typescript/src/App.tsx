// components
import Navbar from "./components/Navbar";

// pages
import About from "./pages/About";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Search from "./pages/Search";
import SearchForm from "./components/SearchForm";

// libraries
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// styles / SCSS
import './App.scss';

function App() {
	return (
		<div>
			<h1>React Router</h1>
			<BrowserRouter>
				<Navbar />
				<SearchForm />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/products">
						<Route path=":id" element={<Product />} />
						<Route path=":id/info" element={<Info />} />
					</Route>
					<Route path="/search" element={<Search />} />
					<Route path="/company" element={<Navigate to="/about" />} />
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;