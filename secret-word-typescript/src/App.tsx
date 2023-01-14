// components
import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';

// data
import { wordsList } from './data/words';

// React
import { useCallback, useEffect, useState } from 'react';

// styles / SCSS
import './App.scss';

const stages: { id: number, name: string }[] = [
	{ id: 1, name: "start" },
	{ id: 2, name: "game" },
	{ id: 3, name: "end" }
]

const guessesQty: number = 3;

function App() {
	const [gameStage, setGameStage] = useState<string>(stages[0].name);
	const [words] = useState(wordsList);

	const [pickedCategory, setPickedCategory] = useState<string>("");
	const [letters, setLetters] = useState<string[]>([]);

	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [wrongLetters, setWrongLetters] = useState<string[]>([]);
	const [guesses, setGuesses] = useState<number>(guessesQty);
	const [score, setScore] = useState<number>(0);

	const pickWordAndCategory = useCallback(() => {
		// Pick a random category
		const categories: string[] = Object.keys(words);
		const category: string = categories[Math.floor(Math.random() * Object.keys(categories).length)];

		// Pick a random word
		const word: string = words[category][Math.floor(Math.random() * words[category].length)];

		return { word, category };
	}, [words]);

	// Starts the secret word game
	const startGame = useCallback(() => {
		// Clear all letters
		clearLetterStates();

		// Pick word and pick category
		const { word, category } = pickWordAndCategory();

		// Create an array of letters
		let wordLetters: string[] = word.split("");
		wordLetters = wordLetters.map((l) => l.toLowerCase());

		// Fill states
		setPickedCategory(category);
		setLetters(wordLetters);

		setGameStage(stages[1].name);
	}, [pickWordAndCategory]);

	// Process the letter input
	const verifyLetter = (letter: string) => {
		const normalizedLetter: string = letter.toLowerCase();

		// Check if letter has already been utilized
		if (
			guessedLetters.includes(normalizedLetter) ||
			wrongLetters.includes(normalizedLetter)
		) {
			return;
		}

		// Push guessed letter or remove a guess
		if (letters.includes(normalizedLetter)) {
			setGuessedLetters((actualGuessedLetters) => [
				...actualGuessedLetters,
				normalizedLetter
			]);
		} else {
			setWrongLetters((actualWrongLetters) => [
				...actualWrongLetters,
				normalizedLetter
			]);

			setGuesses((actualGuesses) => actualGuesses - 1);
		}
	}

	const clearLetterStates = () => {
		setGuessedLetters([]);
		setWrongLetters([]);
	}

	// Check if guesses ended
	useEffect(() => {
		if (guesses <= 0) {
			// Reset all states
			clearLetterStates();

			setGameStage(stages[2].name);
		}
	}, [guesses]);
	
	//Check win condition
	useEffect(() => {
		const uniqueLetters: string[] = [...new Set(letters)];

		// Win condition
		if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length !== 0) {
			
			// Add score
			setScore((actualScore) => actualScore += 100);

			setGuesses(guessesQty);

			// Restart game with new word
			startGame();
		}

	}, [letters, guessedLetters, startGame]);

	// Restarts the game
	const retry = () => {
		setScore(0);
		setGuesses(guessesQty);

		setGameStage(stages[0].name);
	}

	return (
		<div className="App">
			{ gameStage === 'start' && <StartScreen startGame={startGame} /> }
			{ gameStage === 'game' && (
				<Game 
					verifyLetter={verifyLetter}
					pickedCategory={pickedCategory}
					letters={letters}
					guessedLetters={guessedLetters}
					wrongLetters={wrongLetters}
					guesses={guesses}
					score={score}
				/> 
			)}
			{ gameStage === 'end' && <GameOver retry={retry} score={score} /> }
		</div>
	);
}

export default App;