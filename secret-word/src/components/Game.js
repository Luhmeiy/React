// React
import { useState, useRef } from 'react';

// styles / SCSS
import game from './Game.module.scss';

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);

        setLetter("");

        letterInputRef.current.focus();
    }

    return (
        <div className={game.game}>
            <p className={game.game__points}>
                <span>Points: {score}</span>
            </p>

            <h1 className={game.game__title}>Guess the Secret Word</h1>
            <h3 className={game.game__tip}>
                Tip: <span>{pickedCategory}</span>
            </h3>
            <p>You still have {guesses} tries.</p>

            <div className={game['game__word-container']}>
                {letters.map((letter, i) => 
                    guessedLetters.includes(letter) ? (
                        <span key={i} className={game.game__letter}>{letter}</span>
                    ) : (
                        <span key={i} className={game['game__blank-square']}></span>
                    )
                )}
            </div>

            <div className={game['game__letter-container']}>
                <p>Try guessing a letter:</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" maxLength="1" onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} required />
                    <button className="btn">Play</button>
                </form>
            </div>

            <div className={game['game__wrong-letters-container']}>
                <p>Letters already tried:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game;