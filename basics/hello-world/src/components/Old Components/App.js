// React
import { useState } from 'react';

// components
import ChangeMessageState from './components/ChangeMessageState';
import ConditionalRender from './components/ConditionalRender';
import Container from './components/Container';
import ListRender from './components/ListRender';
import Message from './components/Message';
import UserDetails from './components/UserDetails';

// styles / SCSS
import './App.scss';

function App() {
	const users = [
		{ id: 1, name: "Markus", age: 31, job: "Developer" },
		{ id: 2, name: "Karine", age: 26, job: "Doctor" },
		{ id: 3, name: "John", age: 16, job: "Student" }
	]

	const [message, setMessage] = useState("");

	const handleMessage = (msg) => {
		setMessage(msg);
	}

	return (
		<div className="App">
			<h1>Advancing in React</h1>

			<ListRender />
			<ConditionalRender />

			<Container myValue="testing">
				<p>And that's its content.</p>
			</Container>

			<Container myValue="testing 2">
				<h5>Testing container</h5>
			</Container>

			<Message msg={message} />
			<ChangeMessageState handleMessage={handleMessage} />

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