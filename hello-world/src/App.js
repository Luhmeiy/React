// components
import UserDetails from './components/UserDetails';

// styles / SCSS
import './App.scss';

function App() {
	const users = [
		{ id: 1, name: "Markus", age: 31, job: "Developer" },
		{ id: 2, name: "Karine", age: 26, job: "Doctor" },
		{ id: 3, name: "John", age: 16, job: "Student" }
	];

	return (
		<div className="App">
			<h1>Users</h1>

			{ users.map(user => (
				<UserDetails
					key={user.id}
					name={user.name}
					age={user.age}
					job={user.job}
				/>
			)) }
		</div>
	);
}

export default App;