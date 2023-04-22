// components
import Navbar from './components/Navbar';

// libraries
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages
import About from './pages/About';
import Home from './pages/Home';
import Products from './pages/Products';

// styles
import './App.scss';

function App() {
	return (
		<div className="App">
			<h1>Context</h1>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
