import styles from './GameOver.module.scss';

interface Props {
	retry(): void;
	score: number;
}

const GameOver = ({ retry, score }: Props) => {
	return (
		<div className={styles['game-over']}>
			<h1>Game Over!</h1>
			<h2>Points: <span>{score}</span></h2>
			<button className="btn" onClick={retry}>Reset game</button>
		</div>
	)
}

export default GameOver;