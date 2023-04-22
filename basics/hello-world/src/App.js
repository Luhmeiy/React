// components
import MyForm from './components/MyForm';

// styles / SCSS
import './App.scss';

function App() {
	return (
		<div className="App">
			<h1>Forms</h1>

			<MyForm user={{ name: "Josias", email: "Josias@gmail.com", bio: "I love cats!", role: "admin" }} />
		</div>
	);
}

export default App;