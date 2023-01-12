// components
import Context from './components/Context';
import Destructuring, { Category } from './components/Destructuring';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import State from './components/State';

// React
import React, { createContext } from 'react';

type textOrNull = string | null;
type fixed = "This" | "Or" | "That";

interface IAppContext {
	language: string,
	framework: string,
	projects: number
}

export const AppContext = createContext<IAppContext | null>(null)

function App() {
	const name: string = "Matheus";
	const age: number = 30;
	const isWorking: boolean = true;

	const userGreeting = (name: string): string => {
		return `Hello, ${name}!`
	}

	const myText: textOrNull = "There's some text here!";
	let mySecondText: textOrNull = null;

	const testingFixed: fixed = "This";

	const contextValue: IAppContext = {
		language: "JavaScript",
		framework: "Express",
		projects: 5
	}

	return (
		<AppContext.Provider value={contextValue}>
			<div className="App">
				{/* <h1>React + TypeScript</h1>
				<h2>Name: {name}</h2>
				<p>Age: {age}</p>
				{ isWorking && (
					<p>It's working!</p>
				) }
				<h3>{userGreeting(name)}</h3> */}
				{/* <h3>{userGreeting(age)}</h3> */}
				{/* <FirstComponent />
				<SecondComponent name="Second" /> */}
				{/* <Destructuring title="First Post" content="Contents of first post" commentsQty={1} tags={["JS", "TS"]} category={Category.TS} /> */}
				{/* <State /> */}
				{/* { myText &&
					<p>There's text in the variable.</p>
				}
				{ mySecondText &&
					<p>There's text in the variable.</p>
				} */}
				<Context />
			</div>
		</AppContext.Provider>
	);
}

export default App;
