// React
import { useState } from 'react';

// components
import CarDetails from './components/CarDetails';
import ChangeMessageState from './components/ChangeMessageState';
import ConditionalRender from './components/ConditionalRender';
import Container from './components/Container';
import ExecuteFunction from './components/ExecuteFunction';
import Fragment from './components/Fragment';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import Message from './components/Message';
import ShowUserName from './components/ShowUserName';

// images
import City from './assets/city.jpg';

// styles / SCSS
import './App.scss';

function App() {
	const name = "Joaquim";
	const [userName] = useState("Maria");

	const cars = [
		{ id: 1, brand: "Ferrari", color: "Yellow", newCar: true, km: 0 },
		{ id: 2, brand: "KIA", color: "White", newCar: false, km: 34243 },
		{ id: 3, brand: "Renault", color: "Blue", newCar: false, km: 234 },
	];

	function showMessage() {
		console.log("Parent component event!");
	}

	const [message, setMessage] = useState("");

	const handleMessage = (msg) => {
		setMessage(msg);
	}

	return (
		<div className="App">
			<h1>Advancing in React</h1>

			<div>
				<img src="/img1.jpg" alt="Landscape" />
			</div>

			<div>
				<img src={City} alt="City" />
			</div>

			<ManageData />

			<ListRender />
			<ConditionalRender />

			<ShowUserName name={name} />
			<ShowUserName name={userName} />

			<CarDetails brand="VW" km={100000} color="Blue" newCar="false" />
			<CarDetails brand="Ford" km={0} color="Red" newCar="true" />
			<CarDetails brand="Fiat" km={4500} color="White" newCar="false" />

			{ cars.map((car) => (
				<CarDetails 
					key={car.id}
					brand={car.brand}
					color={car.color}
					km={car.km}
					newCar={car.newCar} 
				/>
			)) }

			<Fragment propFragment="Test" />

			<Container myValue="testing">
				<p>And that's its content.</p>
			</Container>

			<Container myValue="testing 2">
				<h5>Testing container</h5>
			</Container>

			<ExecuteFunction myFunction={showMessage} />

			<Message msg={message} />
			<ChangeMessageState handleMessage={handleMessage} />
		</div>
	);
}

export default App;