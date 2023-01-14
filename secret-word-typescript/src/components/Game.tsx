// React
import { useState, useRef, FormEvent } from 'react';

// styles / SCSS
import styles from './Game.module.scss';

interface Props {
	verifyLetter(letter: string): void;
	pickedCategory: string;
	letters: string[];
	guessedLetters: string[];
	wrongLetters: string[];
	guesses: number;
	score: number;
}

const Game = ({ verifyLetter, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }: Props) => {
	const [letter, setLetter] = useState<string>("");
	const letterInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		verifyLetter(letter);

		setLetter("");

		letterInputRef.current!.focus();
	}

	return (
		<div className={styles.game}>
			<p className={styles.game__points}>
				<span>Points: {score}</span>
			</p>

			<h1 className={styles.game__title}>Guess the Secret Word</h1>
			<h3 className={styles.game__tip}>
				Tip: <span>{pickedCategory}</span>
			</h3>
			<p>You still have {guesses} tries.</p>

			<div className={styles['game__word-container']}>
				{letters.map((letter, i) => 
					guessedLetters.includes(letter) ? (
						<span key={i} className={styles.game__letter}>{letter}</span>
					) : (
						<span key={i} className={styles['game__blank-square']}></span>
					)
				)}
			</div>

			<div className={styles['game__letter-container']}>
				<p>Try guessing a letter!</p>

				<form onSubmit={handleSubmit}>
					<input type="text" name="letter" maxLength={1} onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} required />
					<button className="btn">Play</button>
				</form>
			</div>

			<div className={styles['game__wrong-letters-container']}>
				<p>Letters already tried:</p>
				{wrongLetters.map((letter, i) => (
					<span key={i}>{letter}, </span>
				))}
			</div>
		</div>
	)
}

export default Game;